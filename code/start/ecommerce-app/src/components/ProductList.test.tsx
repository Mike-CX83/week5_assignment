import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'
import { server } from '../mocks/server'
import { useCartStore } from '../stores/useCartStore'
import { renderWithProviders } from '../testing/renderWithProviders'
import ProductList from './ProductList'

describe('ProductList', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('renders products from the API', async () => {
    renderWithProviders(<ProductList />)

    expect(await screen.findByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'View details' })[0]).toHaveAttribute(
      'href',
      '/products/1',
    )
  })

  it('limits the featured list', async () => {
    renderWithProviders(<ProductList limit={2} />)

    expect(await screen.findByRole('heading', { name: 'Smart Watch' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Bluetooth Speaker' })).not.toBeInTheDocument()
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ProductList />)

    await user.click(
      await screen.findByRole('button', { name: 'Add Wireless Headphones to cart' }),
    )

    expect(useCartStore.getState().totalItems()).toBe(1)
  })

  it('shows an error when the API fails', async () => {
    server.use(http.get('*/api/products', () => new HttpResponse(null, { status: 500 })))
    renderWithProviders(<ProductList />)

    expect(await screen.findByText('Could not load products.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
