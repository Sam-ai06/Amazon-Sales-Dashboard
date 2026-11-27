# Amazon Sales Dashboard

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI%20%26%20X%20Charts-9-007FFF?logo=mui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20DB-FFCA28?logo=firebase&logoColor=black)
![Python](https://img.shields.io/badge/Python-Pandas%20%26%20Jupyter-3776AB?logo=python&logoColor=white)
![Deploy](https://img.shields.io/badge/GitHub%20Pages-Automated-222222?logo=githubpages&logoColor=white)

Dashboard web analítico para explorar el catálogo, descuentos y valoraciones de productos de Amazon. El proyecto combina un pipeline centralizado de extracción y transformación de datos en **Python / Jupyter** con una aplicación frontend construida en **React, TypeScript, MUI y Firebase Realtime Database**, desplegada automáticamente en **GitHub Pages**.

> **Despliegue en producción:** [https://sam-ai06.github.io/Amazon-Sales-Dashboard/](https://sam-ai06.github.io/Amazon-Sales-Dashboard/)

---

## Estado actual del proyecto

La rama `main` cuenta con la aplicación principal integrada, conectada a **Firebase Realtime Database** y configurada con despliegue continuo:

- **Integrado en `main`:**
  - Barra de navegación (`NavbarUI`) con logotipo, selector de categoría (actualmente con categorías de ejemplo y estado local en `App.tsx`) y perfil de usuario.
  - Tres tarjetas de indicadores KPI (`KPICardUI`): **Total de productos**, **Rating promedio** y **Descuento promedio**.
  - Gráfico de barras (`BarChartUI`) con las **6 categorías** con mayor número de productos.
  - Gráfico de dona (`DonutChartUI`) con la proporción de productos por rango de calificación.
  - Hook `useFetchData` y servicio `dashboardDataService` para lectura en paralelo de los nodos `kpis`, `barChart` y `donutChart` desde Firebase Realtime Database.
  - Pipeline unificado en `script/main.ipynb` que procesa `data/amazon.csv` y exporta los CSV intermedios y el archivo consolidado `public/data_extracted/dashboard_data.json`.
  - Flujo de CI/CD con GitHub Actions hacia GitHub Pages.
- **Pendiente de integración en `main`:**
  - Las tablas de la fila inferior (`bestRatedProductsTableUI.tsx` y `productsTableUI.tsx`) cuentan actualmente con contenedores reservados en `src/App.tsx` mientras se finaliza su integración desde las ramas [`bestRatedProductsTableUI`](../../tree/bestRatedProductsTableUI) y [`productsTableUI`](../../tree/productsTableUI).
  - Vinculación del filtro de categorías del `NavbarUI` con los datos reales de Firebase/gráficos.

---

## Datos y pipeline de procesamiento

### Dataset fuente (`data/amazon.csv`)

El archivo `data/amazon.csv` contiene **1.465 filas y 16 columnas** con información sobre `product_id`, `product_name`, `category`, `discounted_price`, `actual_price`, `discount_percentage`, `rating`, `rating_count`, reseñas y enlaces de producto.

> **Nota sobre el alcance del dataset:** el conjunto de datos no incluye cantidades vendidas ni ingresos por transacción. Por ello, las métricas y visualizaciones se centran en el análisis del catálogo, los porcentajes de descuento y las calificaciones de los usuarios.

### Cuaderno centralizado (`script/main.ipynb`)

El notebook unifica el procesamiento de datos con `pandas` y `numpy`:

1. Calcula los tres KPIs principales y exporta `total_products.csv`, `average_rating.csv` y `average_discount.csv`.
2. Separa las categorías jerárquicas delimitadas por `|` mediante `explode()` y contabiliza los productos por categoría (317 categorías en `products_per_category_barChart.csv`).
3. Agrupa las calificaciones en los intervalos `2 - 2.99`, `3 - 3.99`, `4 - 4.99` y `5` (`rango_ratings.csv`).
4. Consolida todos los CSV generados en `public/data_extracted/dashboard_data.json`, estructurado en las claves `kpis`, `barChart` y `donutChart`.

### Consumo en el frontend

En `src/App.tsx`, el dashboard utiliza `useFetchData('/')` (`src/hooks/useFetchData.ts` y `src/services/dashboardDataService.ts`) para obtener desde **Firebase Realtime Database** (`src/firebase/firebase.ts`) los nodos `kpis`, `barChart` y `donutChart` en paralelo. De forma complementaria, los componentes individuales mantienen soporte para carga desde `public/data_extracted/dashboard_data.json` cuando se utilizan de forma independiente sin recibir datos por `props`.

---

## Tecnologías utilizadas

- **Frontend:** React 19, TypeScript 6, Vite 8, HTML5 y CSS3.
- **Interfaz y visualización:** Material UI (`@mui/material` v9), MUI X Charts (`@mui/x-charts` v9) y Emotion.
- **Base de datos en la nube:** Firebase v13 (Firebase Realtime Database).
- **Análisis y ETL:** Python 3, pandas, numpy y Jupyter Notebook (`papaparse` disponible en dependencias).
- **Calidad de código:** ESLint 10 y `typescript-eslint`.
- **Despliegue:** GitHub Actions y GitHub Pages.

---

## Estructura del proyecto

```text
Amazon-Sales-Dashboard/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Workflow de build y despliegue en GitHub Pages
├── data/
│   └── amazon.csv                  # Dataset original (1.465 productos)
├── public/
│   ├── amazon-analytics-logo.svg   # Logotipo del navbar
│   └── data_extracted/             # CSVs intermedios y JSON consolidado
│       ├── average_discount.csv
│       ├── average_rating.csv
│       ├── dashboard_data.json
│       ├── products_per_category_barChart.csv
│       ├── rango_ratings.csv
│       └── total_products.csv
├── script/
│   └── main.ipynb                  # Pipeline centralizado de extracción y conversión (CSV -> JSON)
├── src/
│   ├── components/
│   │   ├── KPICardUI.tsx           # Tarjetas de métricas KPI con formateo automático
│   │   ├── barChartUI.tsx          # Gráfico de barras (Top 6 categorías)
│   │   ├── bestRatedProductsTableUI.tsx  # Pendiente de integración desde rama homónima
│   │   ├── donutChartUI.tsx        # Gráfico de dona (rangos de calificación)
│   │   ├── navbarUI.tsx            # Barra superior con logo, selector y usuario
│   │   └── productsTableUI.tsx     # Pendiente de integración desde rama homónima
│   ├── firebase/
│   │   └── firebase.ts             # Configuración e inicialización de Firebase Realtime DB
│   ├── hooks/
│   │   └── useFetchData.ts         # Hook de carga de datos del dashboard
│   ├── services/
│   │   └── dashboardDataService.ts # Consulta en paralelo a Firebase Realtime Database
│   ├── types/
│   │   └── dashboardData.ts        # Tipos TypeScript y helper de lectura JSON local
│   ├── App.css
│   ├── App.tsx                     # Composición principal del dashboard
│   └── main.tsx
├── index.html
├── package.json
└── vite.config.ts                  # Base URL '/Amazon-Sales-Dashboard/' para GitHub Pages
```

---

## Uso y ejecución local

### Requisitos previos

- **Node.js** (v24 recomendada, utilizada en el entorno de despliegue) y **npm**.
- *(Opcional)* **Python 3** con `pandas`, `numpy` y **Jupyter** si deseas volver a ejecutar el pipeline de datos en `script/main.ipynb`.

### Instalación y desarrollo

```bash
# 1. Clonar el repositorio
git clone https://github.com/Sam-ai06/Amazon-Sales-Dashboard.git
cd Amazon-Sales-Dashboard

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre la URL local indicada por Vite en la terminal (por ejemplo, `http://localhost:5173/Amazon-Sales-Dashboard/`).

### Scripts disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Levanta el servidor de desarrollo local con Vite. |
| `npm run build` | Verifica tipos con `tsc -b` y genera el bundle de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación generada en `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto. |

### Re-ejecutar el pipeline de datos (opcional)

1. Abre `script/main.ipynb` en Jupyter Notebook o VS Code.
2. Ejecuta todas las celdas en orden para regenerar los archivos CSV y `public/data_extracted/dashboard_data.json` a partir de `data/amazon.csv`.
3. Si deseas actualizar la base en la nube, importa el JSON generado en los nodos correspondientes de Firebase Realtime Database (`kpis`, `barChart`, `donutChart`).

---

## Despliegue

El proyecto está configurado para desplegarse automáticamente en **GitHub Pages**:

1. `vite.config.ts` define `base: '/Amazon-Sales-Dashboard/'` para resolver correctamente los assets y rutas en GitHub Pages.
2. El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente en cada `push` a la rama `main` (o de forma manual mediante `workflow_dispatch`):
   - Configura Node.js 24 e instala dependencias con `npm ci`.
   - Compila el proyecto ejecutando `npm run build`.
   - Sube la carpeta `./dist` como artefacto y la publica mediante `actions/deploy-pages@v4`.

---

## Autoría

Proyecto académico de análisis de datos y desarrollo frontend realizado por:

- **Samuel Villagómez** — [@Sam-ai06](https://github.com/Sam-ai06)
- **Mairrch** — [@Mairrch](https://github.com/Mairrch)
