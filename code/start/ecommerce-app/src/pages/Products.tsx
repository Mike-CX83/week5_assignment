import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'

export default function Products() {
  return (
    <div className="space-y-6">
      <Link to="/" className="text-secondary underline">
        Back to home
      </Link>
      <h1 className="text-3xl font-bold">All products</h1>
      <ProductList />
    </div>
  )
}
