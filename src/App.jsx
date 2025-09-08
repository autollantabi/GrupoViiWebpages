import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './theme/GlobalStyle';
import theme from './theme';
import ScrollToTop from './components/utils/ScrollToTop';
import DynamicTitle from './components/utils/DynamicTitle';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DynamicTitle />
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marcas" element={<Brands />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/catalogo/:id" element={<ProductDetail />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
