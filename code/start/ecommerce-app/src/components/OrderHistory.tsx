import { useUserStore, sortOrders } from '../stores/useUserStore'
import { formatPrice } from '../utils/formatPrice'

export default function OrderHistory() {
  const orders = useUserStore((state) => state.orders)
  const sorted = sortOrders(orders)

  if (sorted.length === 0) {
    return <p>No orders yet.</p>
  }

  return (
    <ol aria-label="Order history" className="space-y-3">
      {sorted.map((order) => (
        <li key={order.id} className="rounded-lg border border-slate-200 bg-white p-4">
          <p>Order ID: {order.id}</p>
          <p>Date: {order.date}</p>
          <p>Total: {formatPrice(order.total)}</p>
          <p>Status: {order.status}</p>
        </li>
      ))}
    </ol>
  )
}
