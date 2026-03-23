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

## Flujo de Obtención de Datos API

<img width="6211" height="1260" alt="deepseek_mermaid_20260323_f42540" src="https://github.com/user-attachments/assets/9c1930bd-9ad2-454a-8388-01f2abe7c206" />

## Flujo de Renderizado de Pronóstico

<img width="2253" height="5482" alt="deepseek_mermaid_20260323_109a97" src="https://github.com/user-attachments/assets/1971f3f2-b5c1-4678-97af-5648fb8f9787" />

## Flujo de Gestión de Temas Visuales

<img width="4390" height="7557" alt="deepseek_mermaid_20260323_45df4a" src="https://github.com/user-attachments/assets/23790f19-1a49-41d0-800a-680a3289a8be" />

## Flujo de Conversión de Unidades

<img width="1959" height="6787" alt="deepseek_mermaid_20260323_6a741b" src="https://github.com/user-attachments/assets/95e50a58-1b1e-44c6-96bd-a230d78f1af0" />

## Ciclo de Vida del Gráfico

<img width="1187" height="4611" alt="deepseek_mermaid_20260323_c3f248" src="https://github.com/user-attachments/assets/2b305c8a-b276-446c-aeab-ed113bd63877" />

## Resumen de Estados de UI

<img width="2216" height="2800" alt="deepseek_mermaid_20260323_8eadfe" src="https://github.com/user-attachments/assets/6483713b-75fb-4ea0-a4a7-ba0dc3f446a9" />

## Diagrama de Componentes

<img width="7393" height="1673" alt="deepseek_mermaid_20260323_6bc517" src="https://github.com/user-attachments/assets/768f49e8-7c08-42cd-90b6-df0ae3cab6e6" />

## Flujo de Manejo de Errores

<img width="2990" height="3715" alt="deepseek_mermaid_20260323_9d3407" src="https://github.com/user-attachments/assets/f41bb4f4-8f9a-4060-94ba-8a779183f07d" />

## Eventos de Usuario y Respuestas

<img width="4090" height="4514" alt="deepseek_mermaid_20260323_b7e857" src="https://github.com/user-attachments/assets/c473f0e5-2652-4ade-b1c2-f0dfc0f49e3c" />
