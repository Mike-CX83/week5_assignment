import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'

const Header = () => {
  const totalItems = useCartStore((state) => state.totalItems())

  return (
    <header className="bg-secondary text-white shadow-md">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          E-Commerce App
        </Link>
        <div className="flex flex-wrap gap-4 text-sm sm:text-base">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart{totalItems > 0 ? ` (${totalItems})` : ''}</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
