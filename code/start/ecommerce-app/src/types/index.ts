export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface UserProfile {
  name: string
  email: string
}

export interface Address {
  id: string
  line1: string
  city: string
  state: string
  zip: string
}

export interface Order {
  id: string
  date: string
  total: number
  status: string
}
