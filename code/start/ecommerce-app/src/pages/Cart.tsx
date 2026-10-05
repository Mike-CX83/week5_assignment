import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import { formatPrice } from '../utils/formatPrice'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const total = useCartStore((state) => state.totalPrice())

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cart</h1>
      {items.length === 0 ? (
        <div className="space-y-3">
          <p>Your cart is empty.</p>
          <Link to="/products" className="text-secondary underline">
            Browse products
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.product.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p>Price: {formatPrice(item.product.price)}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Line total: {formatPrice(item.product.price * item.quantity)}</p>
              <button
                type="button"
                className="mt-3 rounded border border-slate-300 px-3 py-1"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xl font-semibold">Total: {formatPrice(total)}</p>
    </div>
  )
}
