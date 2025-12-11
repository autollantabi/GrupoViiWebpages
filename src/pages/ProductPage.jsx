import React, { useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../api";
import ProductDetail from "../components/catalog/ProductDetail";
import ProductDetailBreadcrumb from "../components/catalog/ProductDetailBreadcrumb";
import useCatalogFlow from "../hooks/useCatalogFlow";
import useCatalogURL from "../hooks/useCatalogURL";
import SEO from "../components/seo/SEO";
import { useEmpresa } from "../hooks/useEmpresa";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { config } = useEmpresa();
  const { products, loading } = useProducts();
  const urlCatalog = useCatalogURL();

  const {
    selectedLinea,
    availableLines,
    flowConfig,
    isAtProductView,
    selectLinea,
  } = useCatalogFlow();

  // Buscar el producto por su ID (descodificar el ID de la URL si es necesario)
  const product = useMemo(() => {
    if (!products || products.length === 0 || !id) return null;
    
    // Decodificar el ID de la URL
    const decodedId = decodeURIComponent(id);
    
    // Buscar el producto por ID
    const foundProduct = products.find(
      (p) => 
        p.DMA_IDENTIFICADORITEM === decodedId || 
        p.DMA_IDENTIFICADORITEM === id ||
        String(p.DMA_IDENTIFICADORITEM) === String(decodedId) ||
        String(p.DMA_IDENTIFICADORITEM) === String(id)
    );
    
    return foundProduct || null;
  }, [products, id]);

  // Función para normalizar nombre de línea desde slug de URL
  const normalizeLineaName = useCallback(
    (slug) => {
      if (!slug) return null;
      const name = slug.replace(/-/g, " ").toUpperCase();
      return (
        availableLines.find(
          (linea) =>
            linea.key.toUpperCase() === name ||
            linea.key.replace(/\s+/g, " ").toUpperCase() === name
        )?.key || null
      );
    },
    [availableLines]
  );

  // Inicializar línea desde URL cuando estén disponibles los datos
  useEffect(() => {
    if (availableLines.length > 0 && flowConfig && !selectedLinea && product) {
      const urlLinea = urlCatalog.catalogState.linea;
      const lineaFromURL = normalizeLineaName(urlLinea);

      // Si hay línea en URL, seleccionarla
      if (lineaFromURL) {
        selectLinea(lineaFromURL);
      } else if (product && product.DMA_LINEANEGOCIO) {
        // Si no hay línea en URL pero tenemos un producto, usar su línea de negocio
        selectLinea(product.DMA_LINEANEGOCIO);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableLines.length, flowConfig, normalizeLineaName, product, selectedLinea]);

  // En la página del producto, NO cargar filtros desde la URL
  // Solo necesitamos la línea para el breadcrumb

  // Si no se encuentra el producto DESPUÉS de que se hayan cargado los productos, redirigir al catálogo
  useEffect(() => {
    // Solo redirigir si:
    // 1. Ya terminó de cargar (loading === false)
    // 2. Hay productos cargados (products existe y tiene elementos o está vacío)
    // 3. Hay un ID en la URL
    // 4. No se encontró el producto
    if (!loading && products !== null && products !== undefined && id && !product) {
      // Si products es un array vacío, también significa que se cargó pero no hay productos
      // Esperar un momento antes de redirigir para dar tiempo a que se actualice el estado
      const timeoutId = setTimeout(() => {
        console.warn(`Producto con ID "${id}" no encontrado después de cargar productos. Redirigiendo al catálogo.`);
        navigate("/catalogo", { replace: true });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [loading, products, product, id, navigate]);

  // Mostrar loading mientras se cargan los productos
  if (loading) {
    return null; // O un componente de loading si lo prefieres
  }

  // Si no hay producto pero aún se están cargando, no renderizar nada
  if (!product) {
    return null;
  }

  const handleBackToCatalog = () => {
    // Recuperar la URL del catálogo guardada antes de navegar al producto
    const previousCatalogUrl = sessionStorage.getItem("previousCatalogUrl");
    
    if (previousCatalogUrl) {
      // Usar la URL guardada para volver exactamente a donde estabas
      navigate(previousCatalogUrl);
    } else {
      // Fallback: si no hay URL guardada, ir al catálogo con solo la línea si existe
      const urlParams = new URLSearchParams();
      if (selectedLinea) {
        urlParams.set("linea", selectedLinea.toLowerCase().replace(/\s+/g, "-"));
      }
      const queryString = urlParams.toString();
      navigate(`/catalogo${queryString ? `?${queryString}` : ""}`);
    }
  };

  const handleBreadcrumbLineaSelect = (linea) => {
    if (linea === null) {
      urlCatalog.setLinea(null);
      navigate("/catalogo");
    } else {
      urlCatalog.setLinea(linea);
      navigate(`/catalogo?linea=${linea.toLowerCase().replace(/\s+/g, "-")}`);
    }
  };

  const handleBreadcrumbProductsSelect = () => {
    // Recuperar la URL del catálogo guardada antes de navegar al producto
    const previousCatalogUrl = sessionStorage.getItem("previousCatalogUrl");
    
    // Verificar si previousCatalogUrl es una URL de catálogo o de producto
    // Si es una URL de producto (/producto/...), ignorarla y ir al catálogo
    const isProductUrl = previousCatalogUrl && previousCatalogUrl.startsWith("/producto/");
    
    if (previousCatalogUrl && !isProductUrl) {
      // Usar la URL guardada solo si es una URL del catálogo
      navigate(previousCatalogUrl);
    } else {
      // Ir al catálogo con la línea si existe
      const urlParams = new URLSearchParams();
      if (selectedLinea) {
        urlParams.set("linea", selectedLinea.toLowerCase().replace(/\s+/g, "-"));
      }
      const queryString = urlParams.toString();
      navigate(`/catalogo${queryString ? `?${queryString}` : ""}`);
    }
  };

  return (
    <>
      <SEO
        title={`${product.DMA_NOMBREITEM || "Producto"} - ${
          config.EMPRESA_NOMBRE || "Catálogo"
        }`}
        description={product.DMA_DESCRIPCION || "Detalle del producto"}
      />
      <ProductDetailBreadcrumb
        selectedLinea={selectedLinea}
        productName={product?.DMA_NOMBREITEM}
        availableLines={availableLines}
        onLineaSelect={handleBreadcrumbLineaSelect}
        onProductsSelect={handleBreadcrumbProductsSelect}
      />
      <ProductDetail
        product={product}
        onBack={handleBackToCatalog}
        catalogState={{
          selectedLinea,
          selectedValues: {}, // No pasar filtros al ProductDetail
          availableLines,
          flowConfig,
        }}
      />
    </>
  );
};

export default ProductPage;

