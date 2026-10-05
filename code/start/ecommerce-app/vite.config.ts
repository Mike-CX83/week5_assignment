import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import type { Connect, Plugin, PreviewServer, ViteDevServer } from 'vite'
import { products } from './src/data/products'

const productsMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  const requestPath = req.url?.split('?')[0]
  if (req.method === 'GET' && requestPath === '/api/products') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(products))
    return
  }
  next()
}

function productsApi(): Plugin {
  const attach = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use(productsMiddleware)
  }

  return {
    name: 'products-api',
    configureServer: attach,
    configurePreviewServer: attach,
  }
}

export default defineConfig({
  plugins: [react(), productsApi()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
