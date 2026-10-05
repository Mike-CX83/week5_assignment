import { http, HttpResponse } from 'msw'
import { products } from '../data/products'

export const handlers = [
  http.get('*/api/products', () => HttpResponse.json(products)),
]
