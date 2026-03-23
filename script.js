/**
 * ============================================================
 * script.js — Atmosfera Weather Dashboard
 * API: OpenWeatherMap (gratuita, requiere registro en openweathermap.org)
 * ============================================================
 *
 * FLUJO GENERAL:
 *  1. El usuario ingresa una ciudad → searchWeather()
 *  2. Se llama a fetchWeather() y fetchForecast() en paralelo (Promise.all)
 *  3. Los datos se pasan a renderWeather() y renderForecast()
 *  4. Se aplica un tema visual según el ID de condición meteorológica
 *  5. Chart.js recibe los datos horarios y renderiza el gráfico
 * ============================================================
 */

// ─────────────────────────────────────────────────────────────
// ❶ CONFIGURACIÓN — Reemplaza 'TU_API_KEY' con tu clave real
// ─────────────────────────────────────────────────────────────
const API_KEY  = 'TU_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNITS    = 'metric';   // 'metric' = Celsius | 'imperial' = Fahrenheit

// ─────────────────────────────────────────────────────────────
// ❷ REFERENCIAS AL DOM
// ─────────────────────────────────────────────────────────────
const cityInput      = document.getElementById('cityInput');
const searchBtn      = document.getElementById('searchBtn');
const loadingState   = document.getElementById('loadingState');
const errorState     = document.getElementById('errorState');
const errorMessage   = document.getElementById('errorMessage');
const weatherContent = document.getElementById('weatherContent');
const apiKeyBanner   = document.getElementById('apiKeyBanner');
const btnCelsius     = document.getElementById('btnCelsius');
const btnFahrenheit  = document.getElementById('btnFahrenheit');

// ─────────────────────────────────────────────────────────────
// ❸ ESTADO DE LA APP
// ─────────────────────────────────────────────────────────────
/** Almacena los datos crudos del clima actual para conversión de unidades */
let currentWeatherData = null;

/** Instancia activa del gráfico Chart.js — se guarda para poder destruirla */
let tempChartInstance  = null;

/** Unidad activa: 'C' (Celsius) o 'F' (Fahrenheit) */
let activeUnit = 'C';

// ─────────────────────────────────────────────────────────────
// ❹ MAPEO DE CONDICIONES → TEMAS VISUALES + ÍCONOS
// ─────────────────────────────────────────────────────────────
/**
 * OpenWeatherMap usa códigos de condición (IDs) documentados en:
 * https://openweathermap.org/weather-conditions
 *
 * Mapeamos rangos de IDs a:
 *   - Clase CSS del tema (cambia los orbes de fondo)
 *   - Clase de ícono FontAwesome
 */
const WEATHER_THEMES = [
  { range: [200, 232], theme: 'thunderstorm', icon: 'fa-solid fa-bolt-lightning' },
  { range: [300, 321], theme: 'rain',         icon: 'fa-solid fa-cloud-drizzle'  },
  { range: [500, 531], theme: 'rain',         icon: 'fa-solid fa-cloud-showers-heavy' },
  { range: [600, 622], theme: 'snow',         icon: 'fa-solid fa-snowflake'      },
  { range: [701, 781], theme: 'mist',         icon: 'fa-solid fa-smog'           },
  { range: [800, 800], theme: 'sunny',        icon: 'fa-solid fa-sun'            },
  { range: [801, 801], theme: 'clouds',       icon: 'fa-solid fa-cloud-sun'      },
  { range: [802, 804], theme: 'clouds',       icon: 'fa-solid fa-cloud'          },
];

/**
 * Devuelve el objeto de tema correspondiente a un ID de condición.
 * @param {number} id - Código de condición de OpenWeatherMap
 * @returns {{ theme: string, icon: string }}
 */
function getThemeByConditionId(id) {
  const match = WEATHER_THEMES.find(t => id >= t.range[0] && id <= t.range[1]);
  return match ?? { theme: 'sunny', icon: 'fa-solid fa-sun' };
}

// ─────────────────────────────────────────────────────────────
// ❺ FUNCIONES DE INTERFAZ (UI)
// ─────────────────────────────────────────────────────────────

/**
 * Cambia la visibilidad de los paneles de estado.
 * Solo uno de los tres estados puede estar visible a la vez.
 * @param {'loading'|'error'|'content'|'none'} state
 */
function setUIState(state) {
  loadingState.classList.add('hidden');
  errorState.classList.add('hidden');
  weatherContent.classList.add('hidden');

  if (state === 'loading') loadingState.classList.remove('hidden');
  if (state === 'error')   errorState.classList.remove('hidden');
  if (state === 'content') weatherContent.classList.remove('hidden');
}

/**
 * Aplica el tema visual (clase CSS y colores de orbes) según condición.
 * Se remueven todas las clases de tema anteriores antes de aplicar la nueva.
 * @param {number} conditionId - ID de condición de la API
 */
function applyTheme(conditionId) {
  const allThemes = ['theme-sunny','theme-rain','theme-clouds','theme-snow','theme-thunderstorm','theme-mist'];
  const { theme } = getThemeByConditionId(conditionId);
  document.body.classList.remove(...allThemes);
  document.body.classList.add(`theme-${theme}`);
}

// ─────────────────────────────────────────────────────────────
// ❻ LLAMADAS A LA API (async/await)
// ─────────────────────────────────────────────────────────────

/**
 * Obtiene el clima actual de una ciudad.
 * Usa async/await sobre fetch; lanza un Error con mensaje legible
 * si la respuesta HTTP no es exitosa (ej. 404 ciudad no encontrada).
 *
 * @param {string} city - Nombre de la ciudad
 * @returns {Promise<Object>} - JSON de la API
 * @throws {Error} - Con mensaje descriptivo
 */
async function fetchWeather(city) {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${UNITS}&lang=es&appid=${API_KEY}`;

  // El await pausa la ejecución hasta que fetch resuelva
  const response = await fetch(url);

  // fetch() NO lanza error en 4xx/5xx — debemos verificarlo manualmente
  if (!response.ok) {
    if (response.status === 404) throw new Error('Ciudad no encontrada. Intenta con otro nombre.');
    if (response.status === 401) throw new Error('API Key inválida. Verifica tu clave de OpenWeatherMap.');
    throw new Error(`Error del servidor (${response.status}). Intenta más tarde.`);
  }

  return response.json();
}

/**
 * Obtiene el pronóstico de 5 días / 3 horas para una ciudad.
 * Si falla devuelve null (no es crítico para el flujo principal).
 *
 * @param {string} city - Nombre de la ciudad
 * @returns {Promise<Object|null>}
 */
async function fetchForecast(city) {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${UNITS}&lang=es&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) return null;
  return response.json();
}

// ─────────────────────────────────────────────────────────────
// ❼ RENDERIZADO DEL CLIMA ACTUAL
// ─────────────────────────────────────────────────────────────

/**
 * Pobla la tarjeta principal con los datos del clima actual.
 * @param {Object} data - Respuesta JSON de /weather
 */
function renderWeather(data) {
  const conditionId = data.weather[0].id;

  // Ícono dinámico según condición
  const { icon } = getThemeByConditionId(conditionId);
  document.getElementById('weatherIcon').className = `weather-icon ${icon}`;

  document.getElementById('cityName').textContent    = data.name;
  document.getElementById('countryName').textContent = data.sys.country;

  const now = new Date();
  document.getElementById('currentDate').textContent = now.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  const tempC = Math.round(data.main.temp);
  document.getElementById('tempValue').textContent = activeUnit === 'C'
    ? `${tempC}°`
    : `${celsiusToFahrenheit(tempC)}°`;

  document.getElementById('weatherDesc').textContent = data.weather[0].description;

  document.getElementById('humidity').textContent   = `${data.main.humidity}%`;
  document.getElementById('windSpeed').textContent  = `${Math.round(data.wind.speed * 3.6)} km/h`;
  document.getElementById('pressure').textContent   = `${data.main.pressure} hPa`;
  document.getElementById('visibility').textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : 'N/D';
  document.getElementById('feelsLike').textContent  = activeUnit === 'C'
    ? `${Math.round(data.main.feels_like)}°C`
    : `${celsiusToFahrenheit(Math.round(data.main.feels_like))}°F`;
  document.getElementById('cloudiness').textContent = `${data.clouds.all}%`;

  applyTheme(conditionId);
}

// ─────────────────────────────────────────────────────────────
// ❽ RENDERIZADO DEL PRONÓSTICO 5 DÍAS
// ─────────────────────────────────────────────────────────────

/**
 * Renderiza las tarjetas de pronóstico diario y alimenta Chart.js.
 *
 * La API /forecast devuelve un punto cada 3 horas (40 puntos en 5 días).
 * Para el pronóstico diario agrupamos por fecha y tomamos el punto del mediodía.
 * Para el gráfico tomamos los primeros 8 puntos (aprox. 24 horas).
 *
 * @param {Object} forecastData - Respuesta JSON de /forecast
 */
function renderForecast(forecastData) {
  if (!forecastData) return;

  const list = forecastData.list;

  // Agrupar por fecha (YYYY-MM-DD)
  const byDay = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!byDay[date]) byDay[date] = [];
    byDay[date].push(item);
  });

  const days = Object.entries(byDay).slice(0, 5);
  const strip = document.getElementById('forecastStrip');
  strip.innerHTML = '';

  days.forEach(([dateStr, items]) => {
    const midday   = items.find(i => i.dt_txt.includes('12:00:00')) ?? items[0];
    const condId   = midday.weather[0].id;
    const { icon } = getThemeByConditionId(condId);
    const maxTemp  = Math.round(Math.max(...items.map(i => i.main.temp_max)));
    const minTemp  = Math.round(Math.min(...items.map(i => i.main.temp_min)));
    const dayName  = new Date(dateStr + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short' });

    const card = document.createElement('div');
    card.className = 'forecast-day';
    card.innerHTML = `
      <span class="forecast-day-name">${dayName}</span>
      <i class="${icon} forecast-icon"></i>
      <div class="forecast-temps">
        <span class="forecast-max">${activeUnit === 'C' ? maxTemp : celsiusToFahrenheit(maxTemp)}°</span>
        <span class="forecast-min">${activeUnit === 'C' ? minTemp : celsiusToFahrenheit(minTemp)}°</span>
      </div>
    `;
    strip.appendChild(card);
  });

  // Datos para el gráfico: primeros 8 puntos (aprox. 24 h)
  const next24    = list.slice(0, 8);
  const labels    = next24.map(item => {
    const time = new Date(item.dt * 1000);
    return time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  });
  const temps     = next24.map(item =>
    activeUnit === 'C' ? Math.round(item.main.temp) : celsiusToFahrenheit(Math.round(item.main.temp))
  );
  const feelsLike = next24.map(item =>
    activeUnit === 'C' ? Math.round(item.main.feels_like) : celsiusToFahrenheit(Math.round(item.main.feels_like))
  );

  renderChart(labels, temps, feelsLike);
}

// ─────────────────────────────────────────────────────────────
// ❾ CHART.JS — Creación y destrucción segura del gráfico
// ─────────────────────────────────────────────────────────────

/**
 * Crea (o recrea) el gráfico de temperatura en Chart.js.
 *
 * IMPORTANTE: Chart.js requiere que destruyamos la instancia anterior
 * antes de crear una nueva sobre el mismo <canvas>.
 * Si no lo hacemos, Chart.js lanza "Canvas is already in use".
 * Guardamos la instancia en `tempChartInstance` para poder destruirla.
 *
 * @param {string[]} labels     - Etiquetas horarias (ej. "14:00")
 * @param {number[]} temps      - Temperaturas reales
 * @param {number[]} feelsLike  - Sensación térmica
 */
function renderChart(labels, temps, feelsLike) {
  const canvas = document.getElementById('tempChart');
  const ctx    = canvas.getContext('2d');

  // ── PASO CRÍTICO: destruir instancia previa ─────────────────
  if (tempChartInstance) {
    tempChartInstance.destroy();
    tempChartInstance = null;
  }

  // Gradiente para el área rellena bajo la línea
  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, 'rgba(79, 172, 254, 0.35)');
  gradient.addColorStop(1, 'rgba(79, 172, 254, 0)');

  // Guardamos la nueva instancia para destruirla en la próxima llamada
  tempChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: `Temperatura (°${activeUnit})`,
          data: temps,
          borderColor: '#4facfe',
          backgroundColor: gradient,
          borderWidth: 2.5,
          pointBackgroundColor: '#4facfe',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          fill: true,
        },
        {
          label: `Sensación (°${activeUnit})`,
          data: feelsLike,
          borderColor: 'rgba(255, 210, 0, 0.7)',
          backgroundColor: 'transparent',
          borderWidth: 1.8,
          borderDash: [5, 4],
          pointBackgroundColor: '#ffd200',
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255,255,255,0.65)',
            font: { family: "'DM Sans', sans-serif", size: 12 },
            boxWidth: 16,
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(13, 27, 42, 0.9)',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          titleColor: '#fff',
          bodyColor: 'rgba(255,255,255,0.7)',
          padding: 12,
          titleFont: { family: "'DM Sans', sans-serif", weight: '600' },
          bodyFont:  { family: "'DM Sans', sans-serif" },
        },
      },
      scales: {
        x: {
          grid:  { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.45)',
            font:  { family: "'DM Sans', sans-serif", size: 11 },
            maxRotation: 0,
          },
        },
        y: {
          grid:  { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: 'rgba(255,255,255,0.45)',
            font:  { family: "'DM Sans', sans-serif", size: 11 },
            callback: val => `${val}°`,
          },
        },
      },
    },
  });
}

// ─────────────────────────────────────────────────────────────
// ❿ FUNCIÓN PRINCIPAL DE BÚSQUEDA
// ─────────────────────────────────────────────────────────────

/**
 * Orquesta la búsqueda completa de clima para una ciudad.
 *
 * Uso de Promise.all:
 *   Lanzamos AMBAS peticiones (weather + forecast) en paralelo.
 *   Esto es más eficiente que esperar una por una (reduce tiempo de carga).
 *   Si fetchWeather() falla, el error se propaga al catch.
 *
 * @param {string} city - Ciudad a buscar
 */
async function searchWeather(city) {
  const trimmedCity = city.trim();

  if (!trimmedCity) {
    cityInput.focus();
    return;
  }

  if (API_KEY === 'TU_API_KEY') {
    apiKeyBanner.classList.remove('hidden');
    setUIState('none');
    return;
  }

  apiKeyBanner.classList.add('hidden');
  setUIState('loading');

  try {
    // Ambas peticiones se lanzan simultáneamente
    const [weatherData, forecastData] = await Promise.all([
      fetchWeather(trimmedCity),
      fetchForecast(trimmedCity),
    ]);

    // Guardamos datos crudos para conversión de unidades posterior
    currentWeatherData = { weather: weatherData, forecast: forecastData };

    renderWeather(weatherData);
    renderForecast(forecastData);

    setUIState('content');

  } catch (error) {
    // Cualquier error (red, 404, 401, etc.) aterriza aquí
    console.error('Error al obtener el clima:', error);
    errorMessage.textContent = error.message;
    setUIState('error');
  }
}

// ─────────────────────────────────────────────────────────────
// ⓫ CONVERSIÓN DE UNIDADES
// ─────────────────────────────────────────────────────────────

/** Convierte Celsius a Fahrenheit. @param {number} celsius @returns {number} */
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Actualiza la UI completa con la nueva unidad.
 * No realiza nueva petición a la API; usa los datos en memoria.
 */
function switchUnit(unit) {
  if (unit === activeUnit || !currentWeatherData) return;
  activeUnit = unit;

  btnCelsius.classList.toggle('active',    unit === 'C');
  btnFahrenheit.classList.toggle('active', unit === 'F');

  renderWeather(currentWeatherData.weather);
  renderForecast(currentWeatherData.forecast);
}

// ─────────────────────────────────────────────────────────────
// ⓬ EVENT LISTENERS
// ─────────────────────────────────────────────────────────────

searchBtn.addEventListener('click', () => searchWeather(cityInput.value));

cityInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') searchWeather(cityInput.value);
});

document.querySelectorAll('.city-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const city = chip.dataset.city;
    cityInput.value = city;
    searchWeather(city);
  });
});

btnCelsius.addEventListener('click',    () => switchUnit('C'));
btnFahrenheit.addEventListener('click', () => switchUnit('F'));

// ─────────────────────────────────────────────────────────────
// ⓭ INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────

/**
 * Al cargar la página:
 *  - Si no hay API key → muestra banner de advertencia
 *  - Si hay API key → carga Madrid como ciudad por defecto
 */
function init() {
  if (API_KEY === 'TU_API_KEY') {
    apiKeyBanner.classList.remove('hidden');
  } else {
    searchWeather('Madrid');
  }
}

document.addEventListener('DOMContentLoaded', init);
