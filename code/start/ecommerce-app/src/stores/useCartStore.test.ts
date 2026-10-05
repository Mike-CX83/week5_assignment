import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './useCartStore'
import type { Product } from '../types'

const headphones: Product = {
  id: '1',
  name: 'Wireless Headphones',
  price: 149.99,
  image: '/images/headphones.svg',
}

const speaker: Product = {
  id: '3',
  name: 'Bluetooth Speaker',
  price: 89.99,
  image: '/images/speaker.svg',
}

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('adds a product and counts quantity toward the total', () => {
    useCartStore.getState().addToCart(headphones)
    useCartStore.getState().addToCart(headphones)

    const { items, totalItems, totalPrice } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0]?.quantity).toBe(2)
    expect(totalItems()).toBe(2)
    expect(totalPrice()).toBeCloseTo(299.98)
  })

  it('keeps separate lines and removes one product', () => {
    useCartStore.getState().addToCart(headphones)
    useCartStore.getState().addToCart(speaker)
    useCartStore.getState().removeFromCart(headphones.id)

    const { items, totalPrice } = useCartStore.getState()
    expect(items.map((item) => item.product.id)).toEqual(['3'])
    expect(totalPrice()).toBeCloseTo(89.99)
  })
})
