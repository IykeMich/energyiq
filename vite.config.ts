import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
     react(),
     tailwindcss(),
     svgr({
      include: '**/*.svg',
      svgrOptions: {
        ref: true,
        svgoConfig: {
          plugins: ['prefixIds']
        }
      }
    })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "style": path.resolve(__dirname, "./src/assets/style"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@views": path.resolve(__dirname, "./src/views"),
    },
  },
  // server: {
  //   port: 5174,
  // },
})
