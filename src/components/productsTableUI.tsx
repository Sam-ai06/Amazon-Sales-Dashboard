import { useMemo } from 'react'
import './productsTableUI.css'

/** Columnas de data/amazon.csv que usa esta tabla (todo llega como texto). */
export interface ProductsTableRow {
  product_id: string
  product_name: string
  category: string
  actual_price: string
  discount_percentage: string
  discounted_price: string
  rating: string
}

interface Props {
  /** Filas del CSV sin procesar. */
  rows: ProductsTableRow[]
  /** Cuántos productos mostrar. */
  limit?: number
}

/** "₹1,099" -> 1099, "64%" -> 64, "4.2" -> 4.2. Devuelve NaN si no es un número. */
const toNumber = (value: string): number => Number(value.replace(/[₹%,\s]/g, ''))

/** "Computers&Accessories|...|Cables|USBCables" -> "USBCables" */
const leafCategory = (path: string): string => path.split('|').at(-1) ?? path

const formatMoney = (n: number) => (Number.isFinite(n) ? `₹${n.toLocaleString('en-US')}` : '—')
const formatPercent = (n: number) => (Number.isFinite(n) ? `${n}%` : '—')
const formatRating = (n: number) => (Number.isFinite(n) ? n.toFixed(1) : '—')

function shortProductName(name: string): string {
  const shortened = name.split(/[,|(|)]/, 1)[0].trim()
  return shortened.length > 60 ? `${shortened.slice(0, 59).trimEnd()}…` : shortened
}

interface ProductRow {
  id: string
  name: string
  category: string
  originalPrice: number
  discount: number
  finalPrice: number
  rating: number
}

function selectProducts(rows: ProductsTableRow[], limit: number): ProductRow[] {
  const seen = new Set<string>()
  const products: ProductRow[] = []

  for (const row of rows) {
    if (products.length >= limit) break
    if (seen.has(row.product_id)) continue // el CSV repite product_id
    seen.add(row.product_id)
    products.push({
      id: row.product_id,
      name: row.product_name,
      category: leafCategory(row.category),
      originalPrice: toNumber(row.actual_price),
      discount: toNumber(row.discount_percentage),
      finalPrice: toNumber(row.discounted_price),
      rating: toNumber(row.rating), // una fila trae "|" -> se muestra "—"
    })
  }
  return products
}

export default function ProductsTableUI({ rows, limit = 10 }: Props) {
  const products = useMemo(() => selectProducts(rows, limit), [rows, limit])

  return (
    <section className="products-table" aria-label="Productos">
      <table className="products-table__table">
        <colgroup>
          <col className="products-table__col-id" />
          <col />
          <col className="products-table__col-category" />
          <col className="products-table__col-money" />
          <col className="products-table__col-discount" />
          <col className="products-table__col-money" />
          <col className="products-table__col-rating" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre del producto</th>
            <th scope="col">Categoría</th>
            <th scope="col" className="products-table__num">Precio original</th>
            <th scope="col" className="products-table__num">Porcentaje de descuento</th>
            <th scope="col" className="products-table__num">Precio luego del descuento</th>
            <th scope="col" className="products-table__num">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="products-table__empty">Sin datos</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td className="products-table__id">{p.id}</td>
                <td>
                  <div className="products-table__ellipsis" title={p.name}>{shortProductName(p.name)}</div>
                </td>
                <td>
                  <div className="products-table__ellipsis" title={p.category}>{p.category}</div>
                </td>
                <td className="products-table__num">{formatMoney(p.originalPrice)}</td>
                <td className="products-table__num">{formatPercent(p.discount)}</td>
                <td className="products-table__num products-table__strong">{formatMoney(p.finalPrice)}</td>
                <td className="products-table__num">{formatRating(p.rating)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}
