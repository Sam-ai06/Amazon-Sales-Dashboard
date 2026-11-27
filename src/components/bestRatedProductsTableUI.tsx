import { useMemo, useState } from 'react'
import './bestRatedProductsTableUI.css'

export interface RawProductRow {
  product_id: string
  product_name: string
  category: string
  rating: string
  rating_count: string
  img_link: string
}

interface Props {
  /** filas del csv sin procesar */
  rows: RawProductRow[]
  /** cuantos productos mostrar */
  limit?: number
  minReviews?: number
}

interface BestRatedProduct {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  imageUrl?: string
}

const toNumber = (value: string): number => Number(value.replace(/,/g, '').trim())

const leafCategory = (path: string): string => path.split('|').at(-1) ?? path

const formatReviews = (n: number) => n.toLocaleString('en-US')

function shortProductName(name: string): string {
  const shortened = name.split(/[,|(|)]/, 1)[0].trim()
  return shortened.length > 60 ? `${shortened.slice(0, 59).trimEnd()}…` : shortened
}

function selectBestRated(rows: RawProductRow[], limit: number, minReviews: number): BestRatedProduct[] {
  const seen = new Set<string>()
  const products: BestRatedProduct[] = []

  for (const row of rows) {
    if (seen.has(row.product_id)) continue //el CSV repite product_id
    const rating = toNumber(row.rating) //hay una fila con rating "|" -> NaN
    const reviews = toNumber(row.rating_count) //y 2 filas sin rating_count -> NaN
    if (!Number.isFinite(rating) || !Number.isFinite(reviews)) continue
    if (reviews < minReviews) continue

    seen.add(row.product_id)
    products.push({
      id: row.product_id,
      name: row.product_name,
      category: leafCategory(row.category),
      rating,
      reviews,
      imageUrl: row.img_link || undefined,
    })
  }

  //mayor rating primero; si empatan, el que tiene más valoraciones
  return products
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, limit)
}

function Thumbnail({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <span className="best-rated__thumb" aria-hidden="true" />
  }
  return (
    <img
      className="best-rated__thumb"
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

export default function BestRatedProductsTableUI({ rows, limit = 10, minReviews = 1000 }: Props) {
  const products = useMemo(() => selectBestRated(rows, limit, minReviews), [rows, limit, minReviews])

  return (
    <section className="best-rated" aria-label="Productos mejor valorados">
      <table className="best-rated__table">
        <colgroup>
          <col className="best-rated__col-image" />
          <col />
          <col className="best-rated__col-rating" />
          <col className="best-rated__col-reviews" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Productos mejor valorados</th>
            <th scope="col" className="best-rated__num">Rating</th>
            <th scope="col" className="best-rated__num">Valoraciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={4} className="best-rated__empty">Sin datos</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  <Thumbnail src={p.imageUrl} alt={p.name} />
                </td>
                <td>
                  <div className="best-rated__name" title={p.name}>{shortProductName(p.name)}</div>
                  <div className="best-rated__category">{p.category}</div>
                </td>
                <td className="best-rated__num best-rated__value">{p.rating.toFixed(1)}</td>
                <td className="best-rated__num best-rated__value">{formatReviews(p.reviews)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  )
}
