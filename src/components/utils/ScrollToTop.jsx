import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Cuando cambia la ruta, desplazar al principio de la página
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null; // Este componente no renderiza nada
}

export default ScrollToTop;