import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const existing = get().items.find((item) => item.product.id === product.id)
    if (existing) {
      set({
        items: get().items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      })
      return
    }

    set({ items: [...get().items, { product, quantity: 1 }] })
  },

  removeFromCart: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) })
  },

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}))
