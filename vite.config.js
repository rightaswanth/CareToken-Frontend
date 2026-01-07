import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://13.232.247.165',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
