# E-Commerce App

A small React shop for the Week 5 capstone. It uses the starter Vite app and adds the pages, stores, and tests the brief asks for.

## Setup

From this folder:

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually http://localhost:5173.

## Scripts

- `npm run dev` starts the app.
- `npm test` runs Vitest once.
- `npm run test:watch` reruns tests while you edit.
- `npm run build` typechecks and builds the production bundle.
- `npm run preview` serves that build. The product API is available in dev and preview.

## What it does

- **Home** (`/`): hero, two featured products, and a link to the full catalog.
- **Products** (`/products`): every product with its name, price, image, and a details link, plus a link back home.
- **Product details** (`/products/:id`): description and add to cart.
- **Cart** (`/cart`): name, price, quantity, line total, cart total, and remove.
- **Profile** (`/profile`): edit name and email, add an address, and read order history from oldest to newest.
- **My Orders** (`/orders`): order id, date, total, and status.

Product data is the three starter products, served at `/api/products` by the Vite dev server. React Query loads and caches that response. Zustand stores the cart and the user profile. There is no login, checkout, or payment flow.

Adding the same product again increases its quantity. Remove deletes that cart line.

## Tests

Vitest and Testing Library cover:

- Cart and user store updates.
- The header, with the cart store mocked so the test only checks navigation and the cart count.
- Product list success, the featured limit, add to cart, and a failed API response.
- Cart remove, profile edits, and order history order.

Mock Service Worker intercepts `/api/products` during tests. The dev server serves the same data from `src/data/products.ts`.

## Screenshots

- `screenshots/01-home.png`
- `screenshots/02-products.png`
- `screenshots/03-product-detail.png`
- `screenshots/04-cart.png`
- `screenshots/05-profile.png`
- `screenshots/06-orders.png`
- `screenshots/07-mobile-home.png`
- `screenshots/08-tests.png`
