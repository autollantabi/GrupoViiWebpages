import { useEffect } from 'react';
import { useEmpresa } from '../../hooks/useEmpresa';

/**
 * Componente que actualiza dinámicamente el título de la página
 * basado en la configuración de la empresa
 */
const DynamicTitle = () => {
  const { config } = useEmpresa();

  useEffect(() => {
    // Actualizar el título del documento
    document.title = config.textos.hero.titulo;
    
    // Actualizar el meta description si existe
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.textos.hero.titulo);
    } else {
      // Crear meta description si no existe
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = config.textos.hero.titulo;
      document.head.appendChild(meta);
    }
  }, [config.textos.hero.titulo]);

  return null; // Este componente no renderiza nada
};

export default DynamicTitle;
