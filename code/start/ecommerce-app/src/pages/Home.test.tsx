import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../testing/renderWithProviders'
import Home from './Home'

describe('Home', () => {
  it('shows the hero, a link to all products, and featured products', async () => {
    renderWithProviders(<Home />)

    expect(screen.getByRole('heading', { name: 'Welcome to the shop' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Browse all products' })).toHaveAttribute(
      'href',
      '/products',
    )
    expect(await screen.findByRole('heading', { name: 'Wireless Headphones' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Bluetooth Speaker' })).not.toBeInTheDocument()
  })
})
