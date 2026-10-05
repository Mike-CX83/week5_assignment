import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Header from '../Header'

vi.mock('../../stores/useCartStore', () => ({
  useCartStore: (selector: (state: { totalItems: () => number }) => unknown) =>
    selector({
      totalItems: () => 3,
    }),
}))

describe('Header', () => {
  it('shows navigation links and the mocked cart count', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: 'Cart (3)' })).toHaveAttribute('href', '/cart')
    expect(screen.getByRole('link', { name: 'My Orders' })).toHaveAttribute('href', '/orders')
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
  })
})
