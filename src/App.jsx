import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import GlobalStyle from './theme/GlobalStyle';
import ScrollToTop from './components/utils/ScrollToTop';
import DynamicTitle from './components/utils/DynamicTitle';
import { useEmpresa } from './hooks/useEmpresa';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import ProductPage from './pages/ProductPage';

// Componente interno para detectar cambios de ruta
function RouteHandler() {
  const location = useLocation();
  
  useEffect(() => {
    // Limpiar producto seleccionado cuando se navega fuera de /catalogo y /producto
    // (El estado del catálogo ahora se maneja completamente con URL)
    if (location.pathname !== '/catalogo' && !location.pathname.startsWith('/producto')) {
      localStorage.removeItem('selectedProduct');
    }
  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marcas" element={<Brands />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/producto/:id" element={<ProductPage />} />
      <Route path="/contacto" element={<Contact />} />
    </Routes>
  );
}

function App() {
  const { theme } = useEmpresa();
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DynamicTitle />
      <Router>
        <ScrollToTop />
        <Layout>
          <RouteHandler />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
