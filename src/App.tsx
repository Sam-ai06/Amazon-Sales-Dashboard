import { useState, useEffect } from 'react';
import NavbarUI from './components/navbarUI';
import KPICardUI from './components/KPICardUI';
import DonutChartUI from './components/donutChartUI';
import BarChartUI from './components/barChartUI';
import { fetchDashboardData, type DashboardData } from './types/dashboardData';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const sampleCategories = ['electronicos', 'casa', 'cocina', 'computadoras'];

  useEffect(() => {
    let isMounted = true;
    fetchDashboardData()
      .then((data) => {
        if (!isMounted) return;
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error(error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
                  <KPICardUI
                    data={dashboardData?.kpis.totalProducts ?? null}
                    kpiKey="totalProducts"
                    isLoading={isLoading}
                  />
                  <KPICardUI
                    data={dashboardData?.kpis.averageRating ?? null}
                    kpiKey="averageRating"
                    isLoading={isLoading}
                  />
                  <KPICardUI
                    data={dashboardData?.kpis.averageDiscount ?? null}
                    kpiKey="averageDiscount"
                    isLoading={isLoading}
                  />
                </div>
                <div className="barchart-slot-placeholder">
                  <BarChartUI data={dashboardData?.barChart ?? null} />
                </div>
              </div>
              <div className="dashboard-top-right">
                <div className="donutchart-slot-placeholder">
                  <h3 className="donutChartTitle">Proporción de rating de productos</h3>
                  <DonutChartUI data={dashboardData?.donutChart ?? null} />
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
