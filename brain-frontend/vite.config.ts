import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve : {
    alias : {
      '@' : path.resolve(__dirname, './src'),
    },
  },
  server :{
    allowedHosts : ["3e3b-2409-40c4-287-4c7d-8093-479-aca7-e48d.ngrok-free.app"]
  }
})