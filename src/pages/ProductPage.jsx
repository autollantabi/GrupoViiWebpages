import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../api/services/productService";
import ProductDetail from "../components/catalog/ProductDetail";
import ProductDetailBreadcrumb from "../components/catalog/ProductDetailBreadcrumb";
import Loader from "../components/ui/Loader";
import SEO from "../components/seo/SEO";
import { useEmpresa } from "../hooks/useEmpresa";
import { getEmpresaNombre } from "../api/config/company";
import { getEmpresaConfig } from "../config/empresas";
import catalogFlowConfig from "../config/catalogFlow.json";

const LINE_DESCRIPTIONS = {
  LLANTAS: "Para vehículos",
  "LLANTAS MOTO": "Para motocicletas",
  LUBRICANTES: "Aceites y fluidos",
  HERRAMIENTAS: "Equipos profesionales",
  ACCESORIOS: "Accesorios",
};
const LINE_ICONS = {
  LLANTAS: "FaCar",
  "LLANTAS MOTO": "FaMotorcycle",
  LUBRICANTES: "FaOilCan",
  HERRAMIENTAS: "FaTools",
  ACCESORIOS: "FaBox",
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { config } = useEmpresa();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const empresaNombre = getEmpresaNombre();
  const empresaConfig = getEmpresaConfig(empresaNombre);
  const lineasNegocio = empresaConfig?.lineasNegocio || [];

  const selectedLinea = product?.DMA_LINEANEGOCIO || null;

  const availableLines = useMemo(() => {
    return lineasNegocio.map((linea) => {
      const flowConfig = catalogFlowConfig[linea] || { name: linea, displayName: linea };
      return {
        key: linea,
        name: flowConfig.displayName || linea,
        description: LINE_DESCRIPTIONS[linea] || "Productos disponibles",
        icon: LINE_ICONS[linea] || "FaBox",
        count: 0,
        config: flowConfig,
      };
    });
  }, [lineasNegocio]);

  const flowConfig = selectedLinea ? catalogFlowConfig[selectedLinea] || null : null;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      navigate("/catalogo", { replace: true });
      return;
    }

    let cancelled = false;
    const decodedId = decodeURIComponent(id);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductByIdOnly(decodedId, empresaNombre);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProduct();
    return () => { cancelled = true; };
  }, [id, empresaNombre, navigate]);

  useEffect(() => {
    if (!loading && !product && id) {
      navigate("/catalogo", { replace: true });
    }
  }, [loading, product, id, navigate]);

  if (loading) {
    return <Loader type="spinner" size="lg" fullPage text="Cargando producto..." />;
  }

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
      navigate("/catalogo");
    } else {
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
          config?.nombre || empresaNombre || "Catálogo"
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

