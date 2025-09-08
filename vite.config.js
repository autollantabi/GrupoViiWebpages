import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0', // Escuchar en todas las interfaces de red
      port: 3100, // Puerto por defecto de Vite
      strictPort: false, // Permitir que Vite busque otro puerto si 5173 está ocupado
      open: false, // No abrir automáticamente el navegador
    },
    define: {
      __EMPRESA_NOMBRE__: JSON.stringify(env.VITE_EMPRESA_NOMBRE || 'Ikonix'),
    },
  }
})
