import type { Product } from '../types'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function fetchProduct(id: string): Promise<Product> {
  const products = await fetchProducts()
  const product = products.find((item) => item.id === id)
  if (!product) {
    throw new Error('Product not found')
  }
  return product
}
