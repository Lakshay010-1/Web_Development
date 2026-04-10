import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": " https://assetsnowv1.onrender.com"
    }
  },
  languageOptions: {
    globals: {
      process: "readonly"
    }
  }
})
