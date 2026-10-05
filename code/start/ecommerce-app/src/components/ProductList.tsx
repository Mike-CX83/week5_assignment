import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products'
import { useCartStore } from '../stores/useCartStore'
import { formatPrice } from '../utils/formatPrice'

type ProductListProps = {
  limit?: number
}

export default function ProductList({ limit }: ProductListProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const { data, isLoading, isError, refetch } = useQuery(['products'], fetchProducts)

  if (isLoading) {
    return <p>Loading products...</p>
  }

  if (isError || !data) {
    return (
      <div className="space-y-3">
        <p>Could not load products.</p>
        <button
          type="button"
          className="rounded bg-secondary px-4 py-2 text-white"
          onClick={() => refetch()}
        >
          Try again
        </button>
      </div>
    )
  }

  const visible = typeof limit === 'number' ? data.slice(0, limit) : data

  if (visible.length === 0) {
    return <p>No products to show.</p>
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {visible.map((product) => (
        <li key={product.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto h-40 w-full object-contain"
          />
          <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
          <p className="mt-1">{formatPrice(product.price)}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to={`/products/${product.id}`} className="text-secondary underline">
              View details
            </Link>
            <button
              type="button"
              className="rounded bg-secondary px-3 py-1 text-white"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
