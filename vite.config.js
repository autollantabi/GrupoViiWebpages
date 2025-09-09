import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: "/",
    build: {
      outDir: "dist",
      assetsDir: "static",
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      host: "0.0.0.0", // Escuchar en todas las interfaces de red
      port: 3100, // Puerto por defecto de Vite
      strictPort: false, // Permitir que Vite busque otro puerto si 5173 está ocupado
      open: false, // No abrir automáticamente el navegador
    },
  };
});
