import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";
import Text from "../ui/Text";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";

const ProductGridContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: none;
  margin: 0;
  flex: 1;
  min-width: 0;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100% - 290px);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ProductGridHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
`;

const ProductGridTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
`;

const ProductControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    width: auto;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    width: auto;
  }
`;

const ControlLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  min-width: 150px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: auto;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing.xl};
    padding-top: ${({ theme }) => theme.spacing.lg};
  }
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.light};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.light : theme.colors.text.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primaryDark : theme.colors.gray};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInput = styled(Input)`
  width: 80px;
  text-align: center;
  margin: 0 ${({ theme }) => theme.spacing.sm};
`;

const PaginationPagesContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 4px;
  padding: 0 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  /* Ocultar scrollbar en webkit */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  justify-content: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }

  @media (min-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  }
`;

const ProductCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 10px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 180px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 200px;
  }
`;

const ProductImage = styled.img.attrs({
  loading: "lazy",
})`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const ProductImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  color: #666;
`;

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ProductBrand = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 10px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  align-self: flex-start;
  line-height: 1.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 10px;
    padding: 2px 6px;
    margin-bottom: 4px;
  }
`;

const ProductName = styled.div`
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

const ProductDescription = styled.div`
  flex: 1;

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.3;
    margin: 0;
    font-size: 11px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductGridView = ({
  products,
  onProductSelect,
  urlState = {},
  onPageChange,
  onSortChange,
  onPerPageChange,
  loading = false,
  scrollToProductId = null,
}) => {
  // Valores por defecto
  const defaults = {
    page: 1,
    sort: "destacados",
    perPage: 192,
  };

  // Usar valores directamente de la URL (única fuente de verdad)
  const currentPage = urlState?.page || defaults.page;
  const sortBy = urlState?.sort || defaults.sort;
  const itemsPerPage = urlState?.perPage || defaults.perPage;

  // Solo mantener estado local para el input de página (controlado)
  const [pageInput, setPageInput] = useState(currentPage.toString());

  // Sincronizar pageInput cuando cambie la página desde URL
  React.useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  // Referencia para el contenedor de paginación
  const paginationContainerRef = React.useRef(null);

  // Función para generar descripción del producto
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
      if (product.DMA_ANCHO) parts.push(`Ancho ${product.DMA_ANCHO}`);
      if (product.DMA_SERIE) parts.push(`Alto/Serie ${product.DMA_SERIE}`);
      if (product.DMA_RIN) parts.push(`Rin ${product.DMA_RIN}`);

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

  // Función para manejar imagen del producto
  const getProductImage = (product) => {
    if (!product) return null;

    if (product.DMA_RUTAIMAGEN && typeof product.DMA_RUTAIMAGEN === "string") {
      const baseUrl = import.meta.env.VITE_API_IMAGES_URL || "";
      return baseUrl + product.DMA_RUTAIMAGEN;
    }

    return null;
  };

  // Función para verificar si un producto tiene imagen
  const hasProductImage = (product) => {
    return (
      product &&
      product.DMA_RUTAIMAGEN &&
      typeof product.DMA_RUTAIMAGEN === "string" &&
      product.DMA_RUTAIMAGEN.trim() !== ""
    );
  };

  // Opciones de ordenamiento
  const sortOptions = [
    { value: "destacados", label: "Destacados" },
    { value: "alfabetico", label: "Alfabético A-Z" },
    { value: "alfabetico-desc", label: "Alfabético Z-A" },
  ];

  // Opciones de elementos por página
  const itemsPerPageOptions = [
    { value: "192", label: "192 por página" },
    { value: "384", label: "384 por página" },
    { value: "576", label: "576 por página" },
  ];

  // Productos ordenados y paginados
  const { totalPages, paginatedProducts } = useMemo(() => {
    if (!products || products.length === 0) {
      return { totalPages: 0, paginatedProducts: [] };
    }

    // Ordenar productos
    let sorted = [...products];
    switch (sortBy) {
      case "alfabetico":
        sorted.sort((a, b) =>
          (a.DMA_NOMBREITEM || "").localeCompare(b.DMA_NOMBREITEM || "")
        );
        break;
      case "alfabetico-desc":
        sorted.sort((a, b) =>
          (b.DMA_NOMBREITEM || "").localeCompare(a.DMA_NOMBREITEM || "")
        );
        break;
      case "destacados":
      default:
        // Ordenar por DMA_INDICE_CLASIFICACION (A, B, C)
        sorted.sort((a, b) => {
          const getClassificationOrder = (classification) => {
            switch (classification) {
              case "A":
                return 1;
              case "B":
                return 2;
              case "C":
                return 3;
              default:
                return 4; // Para valores no definidos, van al final
            }
          };

          const orderA = getClassificationOrder(a.DMA_INDICE_CLASIFICACION);
          const orderB = getClassificationOrder(b.DMA_INDICE_CLASIFICACION);

          return orderA - orderB;
        });
        break;
    }

    // Calcular paginación
    const total = sorted.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = sorted.slice(startIndex, endIndex);

    return {
      totalPages,
      paginatedProducts: paginated,
    };
  }, [products, sortBy, itemsPerPage, currentPage]);

  // Función para cambiar página (solo actualiza URL)
  const handlePageChange = React.useCallback(
    (newPage) => {
      setPageInput(newPage.toString());
      if (onPageChange) {
        onPageChange(newPage);
      }
    },
    [onPageChange]
  );

  // Calcular total de páginas para validación
  const totalPagesCalc = React.useMemo(() => {
    if (!products || products.length === 0) return 1;
    return Math.ceil(products.length / itemsPerPage);
  }, [products, itemsPerPage]);

  // Resetear a página 1 cuando cambien los productos (nuevos filtros aplicados)
  React.useEffect(() => {
    if (products && products.length > 0 && currentPage !== 1) {
      // Solo resetear si la página actual es mayor que el total de páginas disponibles
      if (currentPage > totalPagesCalc) {
        handlePageChange(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products.length]);

  // Ajustar página si queda fuera del rango (solo cuando cambian los elementos por página)
  React.useEffect(() => {
    if (products && products.length > 0 && totalPagesCalc > 0) {
      if (currentPage > totalPagesCalc) {
        handlePageChange(totalPagesCalc);
      } else if (currentPage < 1) {
        handlePageChange(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage, totalPagesCalc]);

  // Efecto para hacer scroll al inicio cuando cambia la página
  React.useEffect(() => {
    if (currentPage > 0) {
      // Hacer scroll suave al inicio de la página
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  // Efecto para hacer scroll automático a la página actual en la paginación
  React.useEffect(() => {
    if (paginationContainerRef.current && currentPage > 0) {
      const container = paginationContainerRef.current;
      const activeButton = container.querySelector(
        `[data-page="${currentPage}"]`
      );

      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        // Calcular si el botón está visible
        const isVisible =
          buttonRect.left >= containerRect.left &&
          buttonRect.right <= containerRect.right;

        if (!isVisible) {
          // Hacer scroll para centrar el botón activo
          const scrollLeft =
            activeButton.offsetLeft -
            container.offsetWidth / 2 +
            activeButton.offsetWidth / 2;

          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: "smooth",
          });
        }
      }
    }
  }, [currentPage]);

  // Efecto para hacer scroll al producto seleccionado cuando regreses del detalle
  React.useEffect(() => {
    if (scrollToProductId && products && products.length > 0 && !loading) {
      // Esperar un momento para que el DOM se actualice completamente
      const timeoutId = setTimeout(() => {
        const productCard = document.querySelector(
          `[data-product-id="${scrollToProductId}"]`
        );

        if (productCard) {
          // Calcular posición para hacer scroll con offset para el header y breadcrumb
          const headerOffset = 160; // Altura aproximada del header + breadcrumb
          const elementPosition = productCard.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Resaltar el producto temporalmente (opcional)
          productCard.style.transition = "box-shadow 0.3s ease";
          productCard.style.boxShadow =
            "0 8px 25px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(0, 123, 255, 0.3)";
          setTimeout(() => {
            productCard.style.boxShadow = "";
          }, 2000);

          // Limpiar el ID guardado después de hacer scroll
          sessionStorage.removeItem("selectedProductId");
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [scrollToProductId, products, loading]);

  // Manejar cambio de página por input
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInput);

    // Si está vacío o no es un número válido, volver a la página actual
    if (isNaN(pageNum) || pageInput.trim() === "") {
      setPageInput(currentPage.toString());
      return;
    }

    // Calcular total de páginas para validación
    const maxPages = totalPagesCalc || 1;

    // Validar y ajustar página
    if (pageNum < 1) {
      handlePageChange(1);
    } else if (pageNum > maxPages) {
      handlePageChange(maxPages);
    } else {
      handlePageChange(pageNum);
    }
  };

  // Mostrar estado de carga mientras se cargan los productos
  if (loading) {
    return (
      <ProductGridContainer>
        <EmptyState>
          <EmptyStateIcon>
            <Icon name="FaSpinner" size="lg" spin />
          </EmptyStateIcon>
          <Text variant="h3" size="lg" color="gray">
            Cargando productos...
          </Text>
          <Text variant="p" color="gray" style={{ marginTop: "16px" }}>
            Por favor espera mientras cargamos los productos.
          </Text>
        </EmptyState>
      </ProductGridContainer>
    );
  }

  // Mostrar mensaje de "no encontrados" solo cuando NO está cargando Y no hay productos
  if (!products || products.length === 0) {
    return (
      <ProductGridContainer>
        <EmptyState>
          <EmptyStateIcon>
            <Icon name="FaBox" size="lg" />
          </EmptyStateIcon>
          <Text variant="h3" size="lg" color="gray">
            No se encontraron productos
          </Text>
          <Text variant="p" color="gray" style={{ marginTop: "16px" }}>
            No hay productos disponibles con los filtros seleccionados.
          </Text>
        </EmptyState>
      </ProductGridContainer>
    );
  }

  return (
    <ProductGridContainer>
      <ProductGridHeader>
        <ProductGridTitle>
          {products.length} productos encontrados
        </ProductGridTitle>
        <ProductControls>
          <ControlGroup>
            <ControlLabel>Ordenar:</ControlLabel>
            <StyledDropdown
              options={sortOptions}
              value={sortBy}
              onChange={(e) => {
                const newSort = e.target.value;
                if (onSortChange) {
                  onSortChange(newSort);
                }
              }}
              placeholder="Seleccionar orden"
              name="sortBy"
            />
          </ControlGroup>
          <ControlGroup>
            <ControlLabel>Mostrar:</ControlLabel>
            <StyledDropdown
              options={itemsPerPageOptions}
              value={itemsPerPage.toString()}
              onChange={(e) => {
                const newItemsPerPage = Math.max(
                  192,
                  parseInt(e.target.value) || 192
                );
                if (onPerPageChange) {
                  onPerPageChange(newItemsPerPage);
                }
                // Recalcular página actual para evitar estar fuera de rango
                const maxPages = Math.ceil(products.length / newItemsPerPage);
                if (currentPage > maxPages) {
                  handlePageChange(maxPages);
                }
              }}
              placeholder="Elementos por página"
              name="itemsPerPage"
            />
          </ControlGroup>
        </ProductControls>
      </ProductGridHeader>

      <ProductsGrid>
        {paginatedProducts.map((product, index) => (
          <ProductCard
            key={`${
              product.DMA_IDENTIFICADORITEM || product.id || "product"
            }-${index}`}
            data-product-id={product.DMA_IDENTIFICADORITEM}
            onClick={() => {
              onProductSelect(product);
            }}
          >
            <ProductImageContainer>
              {hasProductImage(product) ? (
                <ProductImage
                  src={getProductImage(product)}
                  alt={product.DMA_NOMBREITEM || "Producto"}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <ProductImagePlaceholder
                style={{
                  display: hasProductImage(product) ? "none" : "flex",
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
              </ProductImagePlaceholder>
            </ProductImageContainer>

            <ProductContent>
              <ProductBrand>
                {product.DMA_MARCA
                  ? product.DMA_MARCA.charAt(0).toUpperCase() +
                    product.DMA_MARCA.slice(1)
                  : "Sin marca"}
              </ProductBrand>

              <ProductName>
                <Text
                  variant="h3"
                  size="lg"
                  noMargin
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    hyphens: "auto",
                    lineHeight: "1.3",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.DMA_NOMBREITEM || "Sin nombre"}
                </Text>
              </ProductName>

              <ProductDescription>
                <Text
                  variant="p"
                  color="gray"
                  size="sm"
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.3",
                  }}
                >
                  {generateProductDescription(product) ||
                    "Sin descripción disponible"}
                </Text>
              </ProductDescription>
            </ProductContent>
          </ProductCard>
        ))}
      </ProductsGrid>

      {/* Paginación */}
      {totalPages > 1 && (
        <PaginationContainer>
          {/* Botones de páginas con scroll horizontal */}
          <PaginationPagesContainer ref={paginationContainerRef}>
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationButton
                  key={pageNum}
                  data-page={pageNum}
                  $isActive={currentPage === pageNum}
                  onClick={() => {
                    handlePageChange(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationButton>
              );
            })}
          </PaginationPagesContainer>

          {/* Input para saltar a página específica - centrado abajo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              marginTop: "16px",
            }}
          >
            <Text variant="span" size="sm" color="gray">
              Ir a:
            </Text>
            <PaginationInput
              type="number"
              min="1"
              max={totalPages}
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handlePageInputBlur();
                }
              }}
              placeholder={`1-${totalPages}`}
            />
          </div>
        </PaginationContainer>
      )}
    </ProductGridContainer>
  );
};

export default ProductGridView;
