import { useState } from 'react'
import Papa from 'papaparse'
import csv from '../data/amazon.csv?raw'
import NavbarUI from './components/navbarUI'
import KPICardUI from './components/KPICardUI'
import DonutChartUI from './components/donutChartUI'
import BarChartUI from './components/barChartUI'
import BestRatedProductsTableUI, {
  type RawProductRow,
} from './components/bestRatedProductsTableUI'
import ProductsTableUI, {
  type ProductsTableRow,
} from './components/productsTableUI'
import useFetchData from './hooks/useFetchData'
import './App.css'

const FIREBASE_DASHBOARD_PATH = '/'

const rows = Papa.parse<RawProductRow & ProductsTableRow>(csv, {
  header: true,
  skipEmptyLines: true,
}).data

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')
  const { data: dashboardData, isLoading } = useFetchData(FIREBASE_DASHBOARD_PATH)
  const sampleCategories = ['electronicos', 'casa', 'cocina', 'computadoras']

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
                  <KPICardUI data={dashboardData?.kpis.totalProducts ?? null} kpiKey="totalProducts" isLoading={isLoading} />
                  <KPICardUI data={dashboardData?.kpis.averageRating ?? null} kpiKey="averageRating" isLoading={isLoading} />
                  <KPICardUI data={dashboardData?.kpis.averageDiscount ?? null} kpiKey="averageDiscount" isLoading={isLoading} />
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
            <div className="tables-row">
              <div className="dashboard-bottom-left">
                <BestRatedProductsTableUI rows={rows} />
              </div>
              <div className="dashboard-bottom-right">
                <ProductsTableUI rows={rows} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
