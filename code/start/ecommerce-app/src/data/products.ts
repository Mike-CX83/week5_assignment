import type { Product } from '../types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 149.99,
    image: '/images/headphones.svg',
    description: 'Over-ear headset with a padded band and all-day battery.',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: '/images/watch.svg',
    description: 'Fitness tracking and a heart rate monitor on your wrist.',
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 89.99,
    image: '/images/speaker.svg',
    description: 'Portable waterproof speaker for indoor and outdoor use.',
  },
]
