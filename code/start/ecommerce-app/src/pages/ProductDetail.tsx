import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import { useCartStore } from '../stores/useCartStore'
import { formatPrice } from '../utils/formatPrice'

export default function ProductDetail() {
  const { id } = useParams()
  const addToCart = useCartStore((state) => state.addToCart)
  const [added, setAdded] = useState(false)
  const { data, isLoading, isError } = useQuery(
    ['product', id],
    () => fetchProduct(id ?? ''),
    { enabled: Boolean(id) },
  )

  if (isLoading) {
    return <p>Loading product...</p>
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p>Product not found.</p>
        <Link to="/products" className="text-secondary underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <article className="space-y-4">
      <Link to="/" className="text-secondary underline">
        Back to home
      </Link>
      <img src={data.image} alt={data.name} className="h-56 w-full object-contain" />
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p className="text-xl">{formatPrice(data.price)}</p>
      <p>{data.description}</p>
      <button
        type="button"
        className="rounded bg-secondary px-4 py-2 text-white"
        onClick={() => {
          addToCart(data)
          setAdded(true)
        }}
      >
        Add to cart
      </button>
      {added ? <p>Added to cart.</p> : null}
    </article>
  )
}
