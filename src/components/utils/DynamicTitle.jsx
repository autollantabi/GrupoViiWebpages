import { useEffect } from "react";
import { getEmpresaConfig } from "../../config/empresas";

/**
 * Componente que actualiza dinámicamente el título de la página
 * basado en la variable de entorno VITE_EMPRESA_NOMBRE
 * Solo actúa como fallback si no hay SEO configurado
 */
const DynamicTitle = () => {
  useEffect(() => {
    // Obtener la empresa directamente de la variable de entorno
    const nombreEmpresa = import.meta.env.VITE_EMPRESA_NOMBRE || "ikonix";
    const config = getEmpresaConfig(nombreEmpresa);

    // Solo establecer el título por defecto si no hay uno específico
    // Esperar un poco para que el SEO se ejecute primero
    const timer = setTimeout(() => {
      const currentTitle = document.title;

      // Solo actualizar si el título es muy genérico
      const isGenericTitle =
        !currentTitle ||
        currentTitle === "Cargando..." ||
        currentTitle === "Ikonix" ||
        currentTitle === "React App" ||
        currentTitle.includes("Vite");

      if (isGenericTitle) {
        document.title = config.textos.hero.titulo;
      }
    }, 200); // Esperar un poco más para que el SEO se ejecute

    return () => clearTimeout(timer);
  }, []); // Solo ejecutar una vez al montar

  return null; // Este componente no renderiza nada
};

export default DynamicTitle;
