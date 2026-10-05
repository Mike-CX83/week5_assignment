import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-slate-900 px-6 py-10 text-white">
        <h1 className="text-3xl font-bold">Welcome to the shop</h1>
        <p className="mt-3 max-w-xl">
          Browse featured products, add them to your cart, and check your orders.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-block rounded bg-white px-4 py-2 font-medium text-slate-900"
        >
          Browse all products
        </Link>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured products</h2>
        <ProductList limit={2} />
      </section>
    </div>
  )
}
