import { useEffect } from 'react';
import { useEmpresa } from '../../hooks/useEmpresa';

/**
 * Componente que actualiza dinámicamente el título de la página
 * basado en la configuración de la empresa
 * Ahora solo actúa como fallback si no hay SEO configurado
 */
const DynamicTitle = () => {
  const { config } = useEmpresa();

  useEffect(() => {
    // Solo actualizar si no hay un título específico ya configurado
    const currentTitle = document.title;
    const hasSpecificTitle = currentTitle && !currentTitle.includes(config.textos.hero.titulo);
    
    if (!hasSpecificTitle) {
      // Actualizar el título del documento solo si no hay uno específico
      document.title = config.textos.hero.titulo;
    }
  }, [config.textos.hero.titulo]);

  return null; // Este componente no renderiza nada
};

export default DynamicTitle;
