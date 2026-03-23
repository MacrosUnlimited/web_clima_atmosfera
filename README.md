# 🌤️ Atmosfera — Dashboard de Clima Real-Time

**Atmosfera** es una aplicación web moderna y minimalista diseñada para ofrecer información meteorológica precisa con una experiencia de usuario inmersiva. Utiliza **Glassmorphism** para su interfaz y adapta dinámicamente su identidad visual (colores y fondos) según las condiciones climáticas de la ciudad consultada.

![Tecnologías](https://img.shields.io/badge/Tech-HTML5%20|%20CSS3%20|%20JS%20(ES6+)-blue)
![API](https://img.shields.io/badge/API-OpenWeatherMap-orange)
![UI](https://img.shields.io/badge/UI-Glassmorphism-purple)

---

## ✨ Características Principales

* **Temas Dinámicos:** El fondo y los acentos de color cambian automáticamente (Soleado, Lluvia, Nubes, Nieve, Tormenta, Niebla).
* **Visualización de Datos:** Gráfico interactivo de 24 horas que muestra la variación de temperatura y sensación térmica mediante **Chart.js**.
* **Pronóstico Extendido:** Vista detallada de los próximos 5 días con temperaturas máximas y mínimas.
* **Métricas Detalladas:** Humedad, velocidad del viento, presión atmosférica, visibilidad y nubosidad.
* **Conversión de Unidades:** Cambio instantáneo entre Celsius (°C) y Fahrenheit (°F) sin recargar datos.
* **Diseño Responsive:** Optimizado para dispositivos móviles, tablets y escritorio.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 & CSS3:** Estructura semántica y diseño basado en variables CSS para la tematización dinámica.
* **JavaScript (Vanilla):** Lógica de negocio, manipulación del DOM y consumo de APIs mediante `Fetch` y `Async/Await`.
* **OpenWeatherMap API:** Fuente de datos meteorológicos globales.
* **Chart.js:** Renderizado de gráficos de líneas para tendencias de temperatura.
* **Font Awesome 6:** Iconografía vectorial dinámica.
* **Google Fonts:** Tipografía *Playfair Display* para títulos y *DM Sans* para lectura fluida.

---

## 🚀 Instalación y Configuración

Para poner en marcha este proyecto localmente, sigue estos pasos:

1.  **Obtén una API Key:**
    * Regístrate gratis en [OpenWeatherMap](https://openweathermap.org/).
    * Genera tu `API KEY` desde tu panel de usuario.

2.  **Configura el proyecto:**
    * Abre el archivo `script.js`.
    * Busca la línea `const API_KEY = 'TU_API_KEY';`.
    * Reemplaza `'TU_API_KEY'` por tu clave real.

3.  **Ejecución:**
    * Simplemente abre el archivo `index.html` en tu navegador preferido o utiliza una extensión como *Live Server* en VS Code.

---

## 📂 Estructura del Proyecto

```text
Atmosfera/
├── index.html      # Estructura principal y contenedores de la App.
├── style.css       # Estilos, animaciones de orbes y temas dinámicos.
├── script.js       # Lógica de fetching, renderizado y gestión de gráficos.
└── README.md       # Documentación del proyecto.