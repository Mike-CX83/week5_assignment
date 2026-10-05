import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from '../stores/useCartStore'
import { renderWithProviders } from '../testing/renderWithProviders'
import type { Product } from '../types'
import Cart from './Cart'

const headphones: Product = {
  id: '1',
  name: 'Wireless Headphones',
  price: 149.99,
  image: '/images/headphones.svg',
}

describe('Cart', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('shows an empty cart', () => {
    renderWithProviders(<Cart />)

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByText('Total: $0.00')).toBeInTheDocument()
  })

  it('shows the line and removes it', async () => {
    const user = userEvent.setup()
    useCartStore.getState().addToCart(headphones)
    useCartStore.getState().addToCart(headphones)
    renderWithProviders(<Cart />)

    expect(screen.getByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getByText('Price: $149.99')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument()
    expect(screen.getByText('Total: $299.98')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove' }))

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
