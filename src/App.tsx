import Papa from 'papaparse'
import csv from '../data/amazon.csv?raw'
import ProductsTableUI, {
  type ProductsTableRow,
} from './components/productsTableUI'
import './App.css'

const rows = Papa.parse<ProductsTableRow>(csv, {
  header: true,
  skipEmptyLines: true,
}).data

function App() {
  return (
    <div className="App">
      <ProductsTableUI rows={rows} />
    </div>
  );
}

export default App