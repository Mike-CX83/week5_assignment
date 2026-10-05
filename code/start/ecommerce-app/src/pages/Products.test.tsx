import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../testing/renderWithProviders'
import Products from './Products'

describe('Products', () => {
  it('links back home and lists every product', async () => {
    renderWithProviders(<Products />)

    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
    expect(await screen.findByRole('heading', { name: 'Bluetooth Speaker' })).toBeInTheDocument()
  })
})
