# Amazon Sales Dashboard

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white) ![Python](https://img.shields.io/badge/Python-Data%20Analysis-3776AB?logo=python&logoColor=white) ![Status](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)

Dashboard web en desarrollo para explorar información de productos de Amazon mediante indicadores, tablas y visualizaciones. El proyecto combina el análisis y la transformación de datos con **Python** y la construcción de una interfaz con **React y TypeScript**.

> **Estado actual:** la rama `main` contiene la base del proyecto y un cuaderno de exploración de datos. La pantalla principal todavía muestra un ejemplo de React; las visualizaciones se están trabajando en ramas separadas. Por tanto, el dashboard aún no está integrado.

## Datos

El archivo `data/amazon.csv` reúne información de productos, categorías, precios originales y con descuento, porcentajes de descuento, calificaciones, cantidad de valoraciones y reseñas. El análisis inicial del notebook registra **1.465 filas y 16 columnas**.

**Importante:** este dataset no incluye cantidades vendidas ni ingresos por transacción. En consecuencia, el dashboard permite estudiar el catálogo y sus valoraciones, pero no calcular ventas reales ni identificar productos más vendidos.

## Funcionalidades en desarrollo

- **Indicadores KPI:** componentes previstos para resumir métricas del conjunto de datos.
- **Gráfico de barras:** conteo de productos por categorías; desarrollo en la rama [`barchartUI`](../../tree/barchartUI).
- **Gráfico de dona:** distribución de productos por rangos de calificación; desarrollo en [`DonutChartUI`](../../tree/DonutChartUI).
- **Tablas de productos y mejor valorados:** estructura de componentes en preparación.
- **Barra de navegación:** trabajo separado en [`navbarUI`](../../tree/navbarUI).

Las ramas de barras y dona contienen notebooks que transforman los datos de CSV a JSON para las visualizaciones. **Esas exportaciones aún no forman parte de `main`.**

## Tecnologías

- **Frontend:** React, TypeScript, Vite, HTML y CSS.
- **Análisis de datos:** Python, pandas y Jupyter Notebook.
- **Visualización:** componentes con MUI X Charts en ramas de desarrollo (pendientes de integración y dependencias en `main`).
- **Herramientas:** ESLint, npm y Git/GitHub.

## Estructura principal

```text
Amazon-Sales-Dashboard/
├── data/
│   └── amazon.csv
├── public/
│   └── data_extracted/
├── script/
│   └── main.ipynb
├── src/
│   ├── components/
│   │   ├── KPICardUI.tsx
│   │   ├── barChartUI.tsx
│   │   ├── bestRatedProductsTableUI.tsx
│   │   ├── donutChartUI.tsx
│   │   ├── navbarUI.tsx
│   │   └── productsTableUI.tsx
│   └── App.tsx
└── package.json
```

## Ejecutar localmente

Requiere Node.js y npm compatibles con la versión de Vite instalada.

```bash
git clone https://github.com/Sam-ai06/Amazon-Sales-Dashboard.git
cd Amazon-Sales-Dashboard
npm install
npm run dev
```

Abre la dirección local que muestre Vite. En `main` verás la pantalla inicial, **no todavía el dashboard completo**.

Para explorar el análisis de datos, abre `script/main.ipynb` en Jupyter con las librerías de Python necesarias.

## Próximos pasos

1. Integrar los componentes y sus archivos JSON en `main`.
2. Incorporar y configurar las dependencias de gráficos necesarias.
3. Conectar los indicadores y las tablas a datos procesados.
4. Mejorar la experiencia visual y documentar el resultado con capturas.

---

Proyecto académico de análisis de datos y desarrollo frontend de [Sam-ai06](https://github.com/Sam-ai06) y [Mairrch](https://github.com/Mairrch)
