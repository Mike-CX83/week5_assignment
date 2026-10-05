import { create } from 'zustand'
import type { Address, Order, UserProfile } from '../types'

interface UserState {
  profile: UserProfile
  addresses: Address[]
  orders: Order[]
  updateProfile: (profile: UserProfile) => void
  addAddress: (address: Omit<Address, 'id'>) => void
}

export function sortOrders(orders: Order[]): Order[] {
  return [...orders].sort((a, b) => a.date.localeCompare(b.date))
}

export const useUserStore = create<UserState>((set) => ({
  profile: {
    name: 'Alex Rivera',
    email: 'alex@example.com',
  },
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
  updateProfile: (profile) => set({ profile }),
  addAddress: (address) =>
    set((state) => ({
      addresses: [...state.addresses, { ...address, id: crypto.randomUUID() }],
    })),
}))
