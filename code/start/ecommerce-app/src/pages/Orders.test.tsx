import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../testing/renderWithProviders'
import Orders from './Orders'

describe('Orders', () => {
  it('shows order id, date, total, and status from oldest to newest', () => {
    renderWithProviders(<Orders />)

    expect(screen.getByRole('heading', { name: 'My Orders' })).toBeInTheDocument()
    const history = screen.getByRole('list', { name: 'Order history' })
    const items = within(history).getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('ORD-1001')
    expect(items[0]).toHaveTextContent('2026-08-02')
    expect(items[0]).toHaveTextContent('$149.99')
    expect(items[0]).toHaveTextContent('Delivered')
    expect(items[2]).toHaveTextContent('ORD-1003')
  })
})
