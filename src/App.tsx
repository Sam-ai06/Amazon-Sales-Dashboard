import Papa from 'papaparse'
import csv from '../data/amazon.csv?raw'
import BestRatedProductsTableUI, {
  type RawProductRow,
} from './components/bestRatedProductsTableUI'
import './App.css'

const rows = Papa.parse<RawProductRow>(csv, {
  header: true,
  skipEmptyLines: true,
}).data

function App() {
  return (
    <div className="App">
      <BestRatedProductsTableUI rows={rows} />
    </div>
  )
}

export default App