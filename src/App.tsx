import { useState } from 'react';
import NavbarUI from './components/navbarUI';
import KPICardUI from './components/KPICardUI';
import DonutChartUI from './components/donutChartUI';
import BarChartUI from './components/barChartUI';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const sampleCategories = ['electronicos', 'casa', 'cocina', 'computadoras'];

  return (
    <div className="dashboard-app">
      <NavbarUI categories={sampleCategories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <main className="dashboard-main-container">
        <div className="dashboard-panel">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Overview</h1>
            <p className="dashboard-subtitle">Amazon product analytics</p>
          </div>
          <div className="dashboard-content-layout">
            <div className="dashboard-top-row">
              <div className="dashboard-top-left">
                <div className="kpi-cards-row">
                  <KPICardUI url="/data_extracted/total_products.json" />
                  <KPICardUI url="/data_extracted/average_rating.json" />
                  <KPICardUI url="/data_extracted/average_discount.json" />
                </div>
                <div className="barchart-slot-placeholder">
                  <BarChartUI />
                </div>
              </div>
              <div className="dashboard-top-right">
                <div className="donutchart-slot-placeholder">
                  <h3 className="donutChartTitle">Proporción de rating de productos</h3>
                  <DonutChartUI />
                </div>
              </div>
            </div>
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
