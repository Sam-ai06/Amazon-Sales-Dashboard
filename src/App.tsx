import { useState } from 'react';
import NavbarUI from './components/navbarUI';
import KPICardUI from './components/KPICardUI';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const sampleCategories = [
    'electronicos',
    'casa',
    'cocina',
    'computadoras',
  ];

  return (
    <div className="dashboard-app">
      {/* Barra de navegación superior */}
      <NavbarUI
        categories={sampleCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Contenedor principal con panel blanco y bordes redondeados como en el prototipo */}
      <main className="dashboard-main-container">
        <div className="dashboard-panel">
          {/* Encabezado: Overview y subtítulo */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Overview</h1>
            <p className="dashboard-subtitle">Amazon product analytics</p>
          </div>

          {/* Grid de contenido del Dashboard */}
          <div className="dashboard-content-layout">
            {/* Fila superior: KPIs + BarChart (Izquierda) y DonutChart (Derecha) */}
            <div className="dashboard-top-row">
              <div className="dashboard-top-left">
                {/* 3 Tarjetas KPI implementadas según el layout de la imagen */}
                <div className="kpi-cards-row">
                  <KPICardUI title="Total de productos" count={1465} />
                  <KPICardUI title="Rating promedio" count="4.09/5" />
                  <KPICardUI title="Descuento promedio" count={1465} />
                </div>

                {/* Contenedor para el gráfico de barras */}
                <div className="barchart-slot-placeholder" />
              </div>

              {/* Contenedor para el gráfico de dona */}
              <div className="dashboard-top-right">
                <div className="donutchart-slot-placeholder">
                  <h3 className="section-slot-title">Proporción de rating de productos</h3>
                </div>
              </div>
            </div>

            {/* Fila inferior: Best rated products (Izquierda) y Tabla de productos (Derecha) */}
            <div className="dashboard-bottom-row">
              <div className="dashboard-bottom-left">
                <div className="best-rated-slot-placeholder" />
              </div>

              <div className="dashboard-bottom-right">
                <div className="products-table-slot-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
