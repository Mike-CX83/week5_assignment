import { beforeEach, describe, expect, it } from 'vitest'
import { sortOrders, useUserStore } from './useUserStore'

describe('useUserStore', () => {
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
      ],
    })
  })

  it('updates the profile', () => {
    useUserStore.getState().updateProfile({
      name: 'Sam Lee',
      email: 'sam@example.com',
    })

    expect(useUserStore.getState().profile).toEqual({
      name: 'Sam Lee',
      email: 'sam@example.com',
    })
  })

  it('adds an address', () => {
    useUserStore.getState().addAddress({
      line1: '456 Oak Ave',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
    })

    const addresses = useUserStore.getState().addresses
    expect(addresses).toHaveLength(2)
    expect(addresses[1]).toMatchObject({
      line1: '456 Oak Ave',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
    })
  })

  it('sorts orders from oldest to newest', () => {
    const sorted = sortOrders(useUserStore.getState().orders)
    expect(sorted.map((order) => order.id)).toEqual(['ORD-1001', 'ORD-1003'])
  })
})
