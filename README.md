# 🌤️ Atmosfera — Dashboard de Clima Real-Time

**Atmosfera** es una aplicación web moderna y minimalista diseñada para ofrecer información meteorológica precisa con una experiencia de usuario inmersiva. Utiliza **Glassmorphism** para su interfaz y adapta dinámicamente su identidad visual (colores y fondos) según las condiciones climáticas de la ciudad consultada.

<img width="1280" height="901" alt="image" src="https://github.com/user-attachments/assets/88ea6c5c-e879-49fa-84d3-ffddf6d000ad" />


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
```

## Flujo de Obtención de Datos API

<img width="6211" height="1260" alt="Flujo de Obtención de Datos API" src="https://github.com/user-attachments/assets/054ef510-192e-482a-88f7-c4e8b9e0e83e" />

## Flujo de Renderizado de Pronóstico

<img width="2253" height="5482" alt="Flujo de Renderizado de Pronóstico" src="https://github.com/user-attachments/assets/d0a1f0a1-3ebf-4529-afd6-d25bb84d6a3f" />

## Flujo de Gestión de Temas Visuales

<img width="4390" height="7557" alt="Flujo de Gestión de Temas Visuales" src="https://github.com/user-attachments/assets/29845965-ffa8-4616-b83f-7c8ea6a3f4bf" />

## Flujo de Conversión de Unidades

<img width="1959" height="6787" alt="Flujo de Conversión de Unidades" src="https://github.com/user-attachments/assets/6b1fe8b9-5cc2-4c08-a07c-adf3fa34fd0e" />

## Ciclo de Vida del Gráfico

<img width="1187" height="4611" alt="Ciclo de Vida del Gráfico" src="https://github.com/user-attachments/assets/34456c9c-ef42-40e2-9027-0addeec2d84b" />

## Resumen de Estados de UI

<img width="2216" height="2800" alt="Resumen de Estados de UI" src="https://github.com/user-attachments/assets/753bd81f-b92f-462b-92cd-19755b030f8b" />

## Diagrama de Componentes

<img width="7393" height="1673" alt="Diagrama de Componentes" src="https://github.com/user-attachments/assets/8aae3248-7a4d-4719-90c1-cf0272a33419" />

## Flujo de Manejo de Errores

<img width="2990" height="3715" alt="Flujo de Manejo de Errores" src="https://github.com/user-attachments/assets/588e3aff-b8c5-4b94-a4ae-8e567966b503" />

## Eventos de Usuario y Respuestas

<img width="4090" height="4514" alt="Eventos de Usuario y Respuestas" src="https://github.com/user-attachments/assets/f37a145f-7f79-420d-a901-87691a54ff74" />
