import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Text from "../ui/Text";
import Icon from "../ui/Icon";
import Button from "../ui/Button";
import { emailService, getEmpresaNombre, useProducts } from "../../api";
import SEO from "../seo/SEO";
import { useNotification } from "../../context/NotificationContext";
import CatalogBreadcrumb from "./CatalogBreadcrumb";

/**
 * Genera descripción del producto basada en sus características
 * @param {Object} product - Producto a describir
 * @returns {string} Descripción generada
 */
const generateDescription = (product) => {
  if (!product) return "";

  const parts = [];

  // Agregar marca si existe
  if (product.DMA_MARCA) {
    parts.push(product.DMA_MARCA);
  }

  // Agregar modelo si existe
  if (product.DMA_MODELO) {
    parts.push(product.DMA_MODELO);
  }

  // Agregar especificaciones según el tipo de producto
  if (
    product.DMA_LINEANEGOCIO === "LLANTAS" ||
    product.DMA_LINEANEGOCIO === "LLANTAS MOTO"
  ) {
    if (product.DMA_ANCHO && product.DMA_SERIE && product.DMA_RIN) {
      parts.push(
        `${product.DMA_ANCHO}/${product.DMA_SERIE} R${product.DMA_RIN}`
      );
    }
    if (product.DMA_CATEGORIA) {
      parts.push(product.DMA_CATEGORIA);
    }
    if (product.DMA_APLICACION) {
      parts.push(`para ${product.DMA_APLICACION}`);
    }
  } else if (product.DMA_LINEANEGOCIO === "LUBRICANTES") {
    if (product.DMA_CLASE) {
      parts.push(product.DMA_CLASE);
    }
    if (product.DMA_CLASIFICACION) {
      parts.push(product.DMA_CLASIFICACION);
    }
    if (product.DMA_TIPO) {
      parts.push(product.DMA_TIPO);
    }
  } else if (product.DMA_LINEANEGOCIO === "HERRAMIENTAS") {
    if (product.DMA_GRUPO) {
      parts.push(product.DMA_GRUPO);
    }
    if (product.DMA_SUBGRUPO) {
      parts.push(product.DMA_SUBGRUPO);
    }
    if (product.DMA_TIPO) {
      parts.push(product.DMA_TIPO);
    }
  }

  return parts.join(" ");
};

const ProductDetailContainer = styled.div`
  margin: 0 auto;
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const ProductImages = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MainImage = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.light};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ProductDescription = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`;

const SpecificationsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SpecificationsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::before {
    content: "";
    width: 4px;
    height: 24px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const SpecificationsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SpecificationItem = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  grid-column: ${({ $span }) => ($span ? `span ${$span}` : "span 1")};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const SpecName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SpecValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  line-height: 1.4;
`;

const QuoteForm = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const QuoteFormTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const QuoteFormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const QuoteFormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const RelatedProducts = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xxl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const RelatedProductsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

// Styled components para productos relacionados (más flexible que ProductGridView)
const RelatedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const RelatedProductCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const RelatedProductImageContainer = styled.div`
  width: 100%;
  height: 200px; /* 5% más grande que 160px */
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 200px; /* 5% más grande que 140px */
  }
`;

const RelatedProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const RelatedProductImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  color: #666;
`;

const RelatedProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const RelatedProductBrand = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
`;

const RelatedProductName = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    line-height: 1.3;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

const RelatedProductDescription = styled.div`
  flex: 1;

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const NoRelatedProducts = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

/**
 * Componente de detalle del producto
 * Muestra información completa, especificaciones y productos relacionados
 */
const ProductDetail = ({
  product: selectedProduct,
  onBack,
  catalogState,
  onLineaSelect,
  onFilterSelect,
  onProductsSelect,
  isAtProductView,
}) => {
  const { products } = useProducts();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    ciudad: "",
    provincia: "",
  });
  const { showSuccess, showError } = useNotification();

  // Usar el estado del catálogo pasado como prop
  const selectedLinea = catalogState?.selectedLinea;
  const selectedValues = catalogState?.selectedValues;
  const availableLines = catalogState?.availableLines;
  const flowConfig = catalogState?.flowConfig;

  // Funciones para manejar el breadcrumb del catálogo
  const handleBreadcrumbLineaSelect = (linea) => {
    if (onLineaSelect) {
      onLineaSelect(linea);
    } else {
      onBack();
    }
  };

  const handleBreadcrumbFilterSelect = (filterId) => {
    if (onFilterSelect) {
      onFilterSelect(filterId);
    } else {
      onBack();
    }
  };

  const handleBreadcrumbProductsSelect = () => {
    if (onProductsSelect) {
      onProductsSelect();
    } else {
      onBack();
    }
  };

  // Cargar productos relacionados basados en el producto seleccionado
  useEffect(() => {
    if (selectedProduct && products && products.length > 0) {
      let related = [];

      // Filtrar productos de la misma línea de negocio (excluyendo el actual)
      const sameLineProducts = products.filter(
        (p) =>
          p.DMA_IDENTIFICADORITEM !== selectedProduct.DMA_IDENTIFICADORITEM &&
          p.DMA_LINEANEGOCIO === selectedProduct.DMA_LINEANEGOCIO
      );

      // Lógica específica por tipo de producto con búsqueda en cascada
      if (selectedProduct.DMA_LINEANEGOCIO === "LLANTAS") {
        // Criterio 1: Mismo rin y marca
        if (selectedProduct.DMA_RIN && selectedProduct.DMA_MARCA) {
          related = sameLineProducts.filter(
            (p) =>
              p.DMA_RIN === selectedProduct.DMA_RIN &&
              p.DMA_MARCA === selectedProduct.DMA_MARCA
          );
        }

        // Criterio 2: Si no hay suficientes, agregar mismo rin (diferente marca)
        if (related.length < 4 && selectedProduct.DMA_RIN) {
          const sameRinDifferentBrand = sameLineProducts.filter(
            (p) =>
              p.DMA_RIN === selectedProduct.DMA_RIN &&
              p.DMA_MARCA !== selectedProduct.DMA_MARCA &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameRinDifferentBrand];
        }

        // Criterio 3: Si aún no hay suficientes, agregar misma marca (diferente rin)
        if (related.length < 4 && selectedProduct.DMA_MARCA) {
          const sameBrandDifferentRin = sameLineProducts.filter(
            (p) =>
              p.DMA_MARCA === selectedProduct.DMA_MARCA &&
              p.DMA_RIN !== selectedProduct.DMA_RIN &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameBrandDifferentRin];
        }

        // Criterio 4: Si aún no hay suficientes, agregar misma categoría
        if (related.length < 4 && selectedProduct.DMA_CATEGORIA) {
          const sameCategory = sameLineProducts.filter(
            (p) =>
              p.DMA_CATEGORIA === selectedProduct.DMA_CATEGORIA &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameCategory];
        }
      } else if (selectedProduct.DMA_LINEANEGOCIO === "LLANTAS MOTO") {
        // Criterio 1: Mismo rin y marca
        if (selectedProduct.DMA_RIN && selectedProduct.DMA_MARCA) {
          related = sameLineProducts.filter(
            (p) =>
              p.DMA_RIN === selectedProduct.DMA_RIN &&
              p.DMA_MARCA === selectedProduct.DMA_MARCA
          );
        }

        // Criterio 2: Si no hay suficientes, agregar mismo rin (diferente marca)
        if (related.length < 4 && selectedProduct.DMA_RIN) {
          const sameRinDifferentBrand = sameLineProducts.filter(
            (p) =>
              p.DMA_RIN === selectedProduct.DMA_RIN &&
              p.DMA_MARCA !== selectedProduct.DMA_MARCA &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameRinDifferentBrand];
        }

        // Criterio 3: Si aún no hay suficientes, agregar misma marca (diferente rin)
        if (related.length < 4 && selectedProduct.DMA_MARCA) {
          const sameBrandDifferentRin = sameLineProducts.filter(
            (p) =>
              p.DMA_MARCA === selectedProduct.DMA_MARCA &&
              p.DMA_RIN !== selectedProduct.DMA_RIN &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameBrandDifferentRin];
        }
      } else if (selectedProduct.DMA_LINEANEGOCIO === "LUBRICANTES") {
        // Criterio 1: Misma clase y marca
        if (selectedProduct.DMA_CLASE && selectedProduct.DMA_MARCA) {
          related = sameLineProducts.filter(
            (p) =>
              p.DMA_CLASE === selectedProduct.DMA_CLASE &&
              p.DMA_MARCA === selectedProduct.DMA_MARCA
          );
        }

        // Criterio 2: Si no hay suficientes, agregar misma clase (diferente marca)
        if (related.length < 4 && selectedProduct.DMA_CLASE) {
          const sameClassDifferentBrand = sameLineProducts.filter(
            (p) =>
              p.DMA_CLASE === selectedProduct.DMA_CLASE &&
              p.DMA_MARCA !== selectedProduct.DMA_MARCA &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameClassDifferentBrand];
        }

        // Criterio 3: Si aún no hay suficientes, agregar misma marca (diferente clase)
        if (related.length < 4 && selectedProduct.DMA_MARCA) {
          const sameBrandDifferentClass = sameLineProducts.filter(
            (p) =>
              p.DMA_MARCA === selectedProduct.DMA_MARCA &&
              p.DMA_CLASE !== selectedProduct.DMA_CLASE &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameBrandDifferentClass];
        }

        // Criterio 4: Si aún no hay suficientes, agregar misma clasificación
        if (related.length < 4 && selectedProduct.DMA_CLASIFICACION) {
          const sameClassification = sameLineProducts.filter(
            (p) =>
              p.DMA_CLASIFICACION === selectedProduct.DMA_CLASIFICACION &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameClassification];
        }
      } else if (selectedProduct.DMA_LINEANEGOCIO === "HERRAMIENTAS") {
        // Criterio 1: Mismo grupo y marca
        if (selectedProduct.DMA_GRUPO && selectedProduct.DMA_MARCA) {
          related = sameLineProducts.filter(
            (p) =>
              p.DMA_GRUPO === selectedProduct.DMA_GRUPO &&
              p.DMA_MARCA === selectedProduct.DMA_MARCA
          );
        }

        // Criterio 2: Si no hay suficientes, agregar mismo grupo (diferente marca)
        if (related.length < 4 && selectedProduct.DMA_GRUPO) {
          const sameGroupDifferentBrand = sameLineProducts.filter(
            (p) =>
              p.DMA_GRUPO === selectedProduct.DMA_GRUPO &&
              p.DMA_MARCA !== selectedProduct.DMA_MARCA &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameGroupDifferentBrand];
        }

        // Criterio 3: Si aún no hay suficientes, agregar misma marca (diferente grupo)
        if (related.length < 4 && selectedProduct.DMA_MARCA) {
          const sameBrandDifferentGroup = sameLineProducts.filter(
            (p) =>
              p.DMA_MARCA === selectedProduct.DMA_MARCA &&
              p.DMA_GRUPO !== selectedProduct.DMA_GRUPO &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameBrandDifferentGroup];
        }

        // Criterio 4: Si aún no hay suficientes, agregar mismo subgrupo
        if (related.length < 4 && selectedProduct.DMA_SUBGRUPO) {
          const sameSubgroup = sameLineProducts.filter(
            (p) =>
              p.DMA_SUBGRUPO === selectedProduct.DMA_SUBGRUPO &&
              !related.some(
                (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
              )
          );
          related = [...related, ...sameSubgroup];
        }
      }

      // Si aún no hay suficientes productos, completar con cualquier producto de la misma línea
      if (related.length < 4) {
        const remainingProducts = sameLineProducts.filter(
          (p) =>
            !related.some(
              (r) => r.DMA_IDENTIFICADORITEM === p.DMA_IDENTIFICADORITEM
            )
        );
        related = [...related, ...remainingProducts];
      }

      // Limitar a 4 productos máximo
      setRelatedProducts(related.slice(0, 4));
    } else {
      setRelatedProducts([]);
    }
  }, [selectedProduct, products]);

  // Función para generar descripción del producto (igual que ProductGridView)
  const generateProductDescription = (product) => {
    if (!product) return "";

    // Para lubricantes
    if (product.DMA_LINEANEGOCIO === "LUBRICANTES") {
      const parts = [];
      if (product.DMA_CLASE) parts.push(product.DMA_CLASE);
      if (product.DMA_CLASIFICACION) parts.push(product.DMA_CLASIFICACION);
      if (product.DMA_TIPO) parts.push(product.DMA_TIPO);
      if (product.DMA_MODELO) parts.push(product.DMA_MODELO);

      if (parts.length > 0) {
        return parts.join(" • ");
      }
    }

    // Para llantas
    if (product.DMA_RIN || product.DMA_SERIE || product.DMA_ANCHO) {
      const parts = [];
      if (product.DMA_RIN) parts.push(`Rin ${product.DMA_RIN}`);
      if (product.DMA_ANCHO) parts.push(`Ancho ${product.DMA_ANCHO}`);
      if (product.DMA_SERIE) parts.push(`Alto/Serie ${product.DMA_SERIE}`);

      if (parts.length > 0) {
        return parts.join(" • ");
      }
    }

    // Fallback: usar marca y modelo
    if (product.DMA_MARCA && product.DMA_MODELO) {
      return `${product.DMA_MARCA} ${product.DMA_MODELO}`;
    }

    // Último fallback: usar marca
    if (product.DMA_MARCA) {
      return product.DMA_MARCA;
    }

    return "";
  };

  // Función para manejar imagen del producto (igual que ProductGridView)
  const getProductImage = (product) => {
    if (!product) return null;

    if (product.DMA_RUTAIMAGEN && typeof product.DMA_RUTAIMAGEN === "string") {
      const baseUrl = import.meta.env.VITE_API_IMAGES_URL || "";
      return baseUrl + product.DMA_RUTAIMAGEN;
    }

    return null;
  };

  // Función para verificar si un producto tiene imagen (igual que ProductGridView)
  const hasProductImage = (product) => {
    return (
      product &&
      product.DMA_RUTAIMAGEN &&
      typeof product.DMA_RUTAIMAGEN === "string" &&
      product.DMA_RUTAIMAGEN.trim() !== ""
    );
  };

  const renderSpecifications = () => {
    if (!selectedProduct) return null;

    // Función auxiliar para renderizar un campo de especificación
    const renderSpecField = (name, value, span = 1) => {
      if (!value || value === "" || value === null || value === undefined)
        return null;

      return (
        <SpecificationItem key={name} $span={span}>
          <SpecName>{name}</SpecName>
          <SpecValue>{value}</SpecValue>
        </SpecificationItem>
      );
    };

    // Función auxiliar para renderizar un campo multilinea
    const renderSpecFieldMultiline = (name, value, span = 1) => {
      if (!value || value === "" || value === null || value === undefined)
        return null;

      // Función para renderizar texto con saltos de línea
      const renderTextWithLineBreaks = (text) => {
        return text.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index > 0 && <br />}
          </React.Fragment>
        ));
      };

      return (
        <SpecificationItem key={name} $span={span}>
          {name && <SpecName>{name}</SpecName>}
          <SpecValue>{renderTextWithLineBreaks(value)}</SpecValue>
        </SpecificationItem>
      );
    };

    // Obtener todas las especificaciones disponibles
    const specifications = [];

    if (selectedProduct.DMA_LINEANEGOCIO === "LLANTAS") {
      specifications.push(
        renderSpecField("Ancho", selectedProduct.DMA_ANCHO),
        renderSpecField("Alto/Serie", selectedProduct.DMA_SERIE),
        renderSpecField("Rin", selectedProduct.DMA_RIN),
        renderSpecField("Categoría", selectedProduct.DMA_CATEGORIA),
        renderSpecField("Aplicación", selectedProduct.DMA_APLICACION),
        renderSpecField("Eje", selectedProduct.DMA_EJE),
        renderSpecField("Marca", selectedProduct.DMA_MARCA),
        renderSpecField("Modelo", selectedProduct.DMA_MODELO)
      );
    } else if (selectedProduct.DMA_LINEANEGOCIO === "LLANTAS MOTO") {
      specifications.push(
        renderSpecField("Ancho", selectedProduct.DMA_ANCHO),
        renderSpecField("Alto/Serie", selectedProduct.DMA_SERIE),
        renderSpecField("Rin", selectedProduct.DMA_RIN),
        renderSpecField("Categoría", selectedProduct.DMA_CATEGORIA),
        renderSpecField("Aplicación", selectedProduct.DMA_APLICACION),
        renderSpecField("Eje", selectedProduct.DMA_EJE),
        renderSpecField("Marca", selectedProduct.DMA_MARCA),
        renderSpecField("Modelo", selectedProduct.DMA_MODELO)
      );
    } else if (selectedProduct.DMA_LINEANEGOCIO === "LUBRICANTES") {
      specifications.push(
        renderSpecField("Clase", selectedProduct.DMA_CLASE),
        renderSpecField("Clasificación", selectedProduct.DMA_CLASIFICACION),
        renderSpecField("Tipo", selectedProduct.DMA_TIPO),
        renderSpecField("Modelo", selectedProduct.DMA_MODELO),
        renderSpecField("Marca", selectedProduct.DMA_MARCA),
        renderSpecField("Grupo", selectedProduct.DMA_GRUPO),
        renderSpecField("Subgrupo", selectedProduct.DMA_SUBGRUPO)
      );
    } else if (selectedProduct.DMA_LINEANEGOCIO === "HERRAMIENTAS") {
      specifications.push(
        renderSpecField("Grupo", selectedProduct.DMA_GRUPO),
        renderSpecField("Subgrupo", selectedProduct.DMA_SUBGRUPO),
        renderSpecField("Marca", selectedProduct.DMA_MARCA),
        renderSpecField("Modelo", selectedProduct.DMA_MODELO),
        renderSpecField("Tipo", selectedProduct.DMA_TIPO),
        renderSpecFieldMultiline(
          "Otros",
          selectedProduct.DMA_CARACTERISTICASESP,
          3
        )
      );
    }

    // Filtrar especificaciones nulas
    const validSpecifications = specifications.filter(Boolean);

    // Si no hay especificaciones, no mostrar la sección
    if (validSpecifications.length === 0) {
      return null;
    }

    return (
      <>
        <SpecificationsTitle>Especificaciones Técnicas</SpecificationsTitle>
        <SpecificationsList>{validSpecifications}</SpecificationsList>
      </>
    );
  };

  if (!selectedProduct) {
    return (
      <ProductDetailContainer>
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <Text variant="h2">Producto no encontrado</Text>
          <Text variant="p" color="gray" style={{ marginTop: "16px" }}>
            El producto que buscas no existe o ha sido removido.
          </Text>
          <Button
            variant="primary"
            onClick={onBack}
            style={{ marginTop: "24px", display: "inline-block" }}
          >
            Volver al catálogo
          </Button>
        </div>
      </ProductDetailContainer>
    );
  }

  const URL_MAYORISTA = import.meta.env.VITE_MAYORISTA_URL;

  // Funciones para manejar el formulario de cotización
  const handleQuoteFormChange = (e) => {
    const { name, value } = e.target;
    setQuoteFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingQuote(true);

    try {
      const cotizacionData = {
        nombre: quoteFormData.nombre,
        correo: quoteFormData.correo,
        telefono: quoteFormData.telefono,
        ciudad: quoteFormData.ciudad,
        provincia: quoteFormData.provincia,
        codigoProducto:
          selectedProduct.DMA_IDENTIFICADORITEM ||
          selectedProduct.DMA_NOMBREITEM ||
          "Sin código",
        empresa: getEmpresaNombre(),
      };

      // Enviar cotización usando el servicio de email
      await emailService.enviarCotizacion(cotizacionData);

      showSuccess("¡Cotización enviada exitosamente!");
      setShowQuoteForm(false);
      setQuoteFormData({
        nombre: "",
        correo: "",
        telefono: "",
        ciudad: "",
        provincia: "",
      });
    } catch (error) {
      console.error("Error al enviar cotización:", error);
      showError(
        "Error al enviar la cotización. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const handleCancelQuote = () => {
    setShowQuoteForm(false);
    setQuoteFormData({
      nombre: "",
      correo: "",
      telefono: "",
      ciudad: "",
      provincia: "",
    });
  };

  return (
    <ProductDetailContainer>
      <SEO
        title={selectedProduct?.DMA_NOMBREITEM || "Producto"}
        description={
          selectedProduct
            ? generateDescription(selectedProduct)
            : "Detalles del producto"
        }
        keywords={
          selectedProduct
            ? `${selectedProduct.DMA_MARCA}, ${selectedProduct.DMA_LINEANEGOCIO}, ${selectedProduct.DMA_NOMBREITEM}`
            : "producto, detalles"
        }
        image={selectedProduct ? getProductImage(selectedProduct) : null}
      />
      {/* Breadcrumb del catálogo */}
      <CatalogBreadcrumb
        selectedLinea={selectedLinea}
        selectedValues={selectedValues}
        availableLines={availableLines}
        onLineaSelect={handleBreadcrumbLineaSelect}
        onFilterSelect={handleBreadcrumbFilterSelect}
        onProductsSelect={handleBreadcrumbProductsSelect}
        currentStep={null}
        flowConfig={flowConfig}
        isAtProductView={isAtProductView}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px" }}>
        <ProductContent>
          <ProductImages>
            <MainImage>
              {hasProductImage(selectedProduct) ? (
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.DMA_NOMBREITEM || "Producto"}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                style={{
                  display: hasProductImage(selectedProduct) ? "none" : "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                  background: "#f5f5f5",
                  borderRadius: "8px",
                }}
              >
                Imagen no disponible
              </div>
            </MainImage>
          </ProductImages>

          <ProductInfo>
            <div>
              <Text variant="span" size="sm" color="gray">
                {selectedLinea && flowConfig?.displayName}
                {selectedValues &&
                  Object.keys(selectedValues).length > 0 &&
                  ` > ${Object.entries(selectedValues)
                    .map(([, value]) => `${value}`)
                    .join(" > ")}`}
              </Text>
              <Text
                variant="h2"
                noMargin
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  lineHeight: "1.3",
                }}
              >
                {selectedProduct.DMA_NOMBREITEM || "Sin nombre"}
              </Text>

              <ButtonContainer>
                <Button
                  as="a"
                  href={URL_MAYORISTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  style={{ flex: 2 }}
                >
                  Da click aquí para adquirir este producto
                  <Icon name="FaShoppingCart" />
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowQuoteForm(true)}
                  style={{ flex: 1 }}
                >
                  Cotizar
                  <Icon name="FaEnvelope" />
                </Button>
              </ButtonContainer>
            </div>

            {/* Formulario de cotización */}
            {showQuoteForm && (
              <QuoteForm>
                <QuoteFormTitle>
                  <Icon name="FaEnvelope" size="sm" />
                  Solicitar Cotización
                </QuoteFormTitle>
                <form onSubmit={handleQuoteSubmit}>
                  <QuoteFormGrid>
                    <div>
                      <Text
                        variant="label"
                        style={{ marginBottom: "8px", display: "block" }}
                      >
                        Nombre Completo *
                      </Text>
                      <input
                        type="text"
                        name="nombre"
                        value={quoteFormData.nombre}
                        onChange={handleQuoteFormChange}
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                    <div>
                      <Text
                        variant="label"
                        style={{ marginBottom: "8px", display: "block" }}
                      >
                        Correo Electrónico *
                      </Text>
                      <input
                        type="email"
                        name="correo"
                        value={quoteFormData.correo}
                        onChange={handleQuoteFormChange}
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                    <div>
                      <Text
                        variant="label"
                        style={{ marginBottom: "8px", display: "block" }}
                      >
                        Teléfono *
                      </Text>
                      <input
                        type="tel"
                        name="telefono"
                        value={quoteFormData.telefono}
                        onChange={handleQuoteFormChange}
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                    <div>
                      <Text
                        variant="label"
                        style={{ marginBottom: "8px", display: "block" }}
                      >
                        Ciudad *
                      </Text>
                      <input
                        type="text"
                        name="ciudad"
                        value={quoteFormData.ciudad}
                        onChange={handleQuoteFormChange}
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                    <div>
                      <Text
                        variant="label"
                        style={{ marginBottom: "8px", display: "block" }}
                      >
                        Provincia *
                      </Text>
                      <input
                        type="text"
                        name="provincia"
                        value={quoteFormData.provincia}
                        onChange={handleQuoteFormChange}
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          fontSize: "16px",
                        }}
                      />
                    </div>
                  </QuoteFormGrid>
                  <QuoteFormActions>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancelQuote}
                      disabled={isSubmittingQuote}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmittingQuote}
                    >
                      {isSubmittingQuote ? (
                        <>
                          <Icon name="FaSpinner" spin />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Icon name="FaPaperPlane" />
                          Enviar Cotización
                        </>
                      )}
                    </Button>
                  </QuoteFormActions>
                </form>
              </QuoteForm>
            )}

            {/* Especificaciones técnicas */}
            <SpecificationsContainer>
              {renderSpecifications()}
            </SpecificationsContainer>
          </ProductInfo>
        </ProductContent>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <RelatedProducts>
            <RelatedProductsTitle>
              <Icon name="FaBox" size="sm" />
              Productos Relacionados
            </RelatedProductsTitle>

            <RelatedProductsGrid>
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard
                  key={relatedProduct.DMA_IDENTIFICADORITEM}
                  onClick={() => onBack()}
                >
                  <RelatedProductImageContainer>
                    {hasProductImage(relatedProduct) ? (
                      <RelatedProductImage
                        src={getProductImage(relatedProduct)}
                        alt={
                          relatedProduct.DMA_NOMBREITEM ||
                          "Producto relacionado"
                        }
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <RelatedProductImagePlaceholder
                      style={{
                        display: hasProductImage(relatedProduct)
                          ? "none"
                          : "flex",
                      }}
                    >
                      <Text
                        variant="p"
                        color="gray"
                        size="sm"
                        style={{ marginLeft: "8px" }}
                      >
                        Imagen no disponible
                      </Text>
                    </RelatedProductImagePlaceholder>
                  </RelatedProductImageContainer>

                  <RelatedProductContent>
                    <RelatedProductBrand>
                      {relatedProduct.DMA_MARCA
                        ? relatedProduct.DMA_MARCA.charAt(0).toUpperCase() +
                          relatedProduct.DMA_MARCA.slice(1)
                        : "Sin marca"}
                    </RelatedProductBrand>

                    <RelatedProductName>
                      <Text variant="h3" size="lg" noMargin>
                        {relatedProduct.DMA_NOMBREITEM || "Sin nombre"}
                      </Text>
                    </RelatedProductName>

                    <RelatedProductDescription>
                      <Text variant="p" color="gray">
                        {generateProductDescription(relatedProduct) ||
                          "Sin descripción disponible"}
                      </Text>
                    </RelatedProductDescription>
                  </RelatedProductContent>
                </RelatedProductCard>
              ))}
            </RelatedProductsGrid>
          </RelatedProducts>
        )}

        {relatedProducts.length === 0 && (
          <RelatedProducts>
            <NoRelatedProducts>
              <Icon name="FaBox" size="xl" />
              <Text variant="p" color="gray" style={{ marginTop: "16px" }}>
                No hay productos relacionados disponibles en este momento.
              </Text>
            </NoRelatedProducts>
          </RelatedProducts>
        )}
      </div>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
