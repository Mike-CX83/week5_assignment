import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import { renderWithProviders } from '../testing/renderWithProviders'
import ProductDetail from './ProductDetail'

describe('ProductDetail', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('shows the product and adds it to the cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>,
      '/products/1',
    )

    expect(await screen.findByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getByText(/Over-ear headset/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')

    await user.click(screen.getByRole('button', { name: 'Add to cart' }))

    expect(screen.getByText('Added to cart.')).toBeInTheDocument()
    expect(useCartStore.getState().totalItems()).toBe(1)
  })
})
