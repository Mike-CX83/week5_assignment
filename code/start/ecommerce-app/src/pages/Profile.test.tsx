import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useUserStore } from '../stores/useUserStore'
import { renderWithProviders } from '../testing/renderWithProviders'
import Profile from './Profile'

describe('Profile', () => {
  beforeEach(() => {
    useUserStore.setState({
      profile: { name: 'Alex Rivera', email: 'alex@example.com' },
      addresses: [
        {
          id: 'addr-1',
          line1: '123 Main St',
          city: 'Austin',
          state: 'TX',
          zip: '78701',
        },
      ],
      orders: [
        { id: 'ORD-1003', date: '2026-09-28', total: 199.99, status: 'Processing' },
        { id: 'ORD-1001', date: '2026-08-02', total: 149.99, status: 'Delivered' },
        { id: 'ORD-1002', date: '2026-09-14', total: 89.99, status: 'Shipped' },
      ],
    })
  })

  it('updates the profile, adds an address, and lists orders chronologically', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Profile />)

    const name = screen.getByLabelText('Name')
    await user.clear(name)
    await user.type(name, 'Sam Lee')
    await user.click(screen.getByRole('button', { name: 'Save profile' }))

    expect(screen.getByText('Profile saved.')).toBeInTheDocument()
    expect(useUserStore.getState().profile.name).toBe('Sam Lee')

    await user.type(screen.getByLabelText('Street'), '456 Oak Ave')
    await user.type(screen.getByLabelText('City'), 'Dallas')
    await user.type(screen.getByLabelText('State'), 'TX')
    await user.type(screen.getByLabelText('ZIP'), '75201')
    await user.click(screen.getByRole('button', { name: 'Add address' }))

    expect(screen.getByText('456 Oak Ave, Dallas, TX 75201')).toBeInTheDocument()

    const history = screen.getByRole('list', { name: 'Order history' })
    const items = within(history).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual([
      expect.stringContaining('ORD-1001'),
      expect.stringContaining('ORD-1002'),
      expect.stringContaining('ORD-1003'),
    ])
  })
})
