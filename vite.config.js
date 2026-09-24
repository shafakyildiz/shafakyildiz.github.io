import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

function imagesPlugin() {
  const imagesRoot = path.resolve(root, 'images')
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  }

  return {
    name: 'root-images',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split('?')[0] ?? ''
        if (!raw.startsWith('/images/')) return next()
        const file = path.resolve(root, `.${decodeURIComponent(raw)}`)
        const rel = path.relative(imagesRoot, file)
        if (rel.startsWith('..') || path.isAbsolute(rel)) return next()
        if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next()
        res.setHeader(
          'Content-Type',
          types[path.extname(file).toLowerCase()] || 'application/octet-stream',
        )
        fs.createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      fs.cpSync(imagesRoot, path.resolve(root, 'dist/images'), { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [vue(), imagesPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      ignored: ['**/images/**'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
