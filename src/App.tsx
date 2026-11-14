import './App.css'
import DonutChart from './components/donutChartUI'
function App() {
 return (
    <main>
      <div className='donutChart-card'>
        <h2 className='cardTitle'>distribución de productos por rating</h2>
        <div className='chart-Container'>
          <DonutChart/>
        </div>
      </div>
    </main>

  )
}

export default App
