import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import SEO from "../components/seo/SEO";
import FilterCards from "../components/catalog/FilterCards";
import ProductGridView from "../components/catalog/ProductGridView";
import AdditionalFilters from "../components/catalog/AdditionalFilters";
import CatalogBreadcrumb from "../components/catalog/CatalogBreadcrumb";
import useCatalogFlow from "../hooks/useCatalogFlow";
import { useEmpresa } from "../hooks/useEmpresa";
import Icon from "../components/ui/Icon";
import Text from "../components/ui/Text";
import ProductDetail from "../components/catalog/ProductDetail";

const CatalogContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const MainContent = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const ContentWithFilters = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

const WelcomeScreen = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }
`;

const WelcomeHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
`;

const WelcomeDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const LinesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-top: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`;

const LineCard = styled.div`
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`;

const LineIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 80px;
    height: 80px;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
  }
`;

const LineTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-weight: 700;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const LineDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  line-height: 1.5;
`;

const LineCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: inline-block;
  font-weight: 600;
`;

const Catalog = () => {
  const { config } = useEmpresa();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Funciones para manejar localStorage del producto seleccionado
  const saveSelectedProduct = useCallback((product) => {
    try {
      if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
      } else {
        localStorage.removeItem("selectedProduct");
      }
    } catch (error) {
      console.warn("Error saving selected product to localStorage:", error);
    }
  }, []);

  const loadSelectedProduct = useCallback(() => {
    try {
      const saved = localStorage.getItem("selectedProduct");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn("Error loading selected product from localStorage:", error);
      return null;
    }
  }, []);

  const {
    selectedLinea,
    currentStep,
    selectedValues,
    filteredProducts,
    currentStepOptions,
    loading,
    availableLines,
    additionalFilters,
    searchQuery,
    selectLinea,
    selectFilterValue,
    isAtProductView,
    flowConfig,
    applyAdditionalFilter,
    clearAdditionalFilter,
    goToAdditionalFilter,
    handleSearchChange,
    goToFilterStep,
  } = useCatalogFlow();

  const handleLineaSelect = (linea) => {
    selectLinea(linea);
  };

  const handleFilterSelect = (value) => {
    selectFilterValue(value);
  };

  const handleBreadcrumbLineaSelect = (linea) => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
    if (linea === null) {
      selectLinea(null); // Volver a bienvenidos solo si se pasa null
    } else {
      selectLinea(linea); // Cambiar a otra línea
    }
  };

  const handleBreadcrumbFilterSelect = (filterId) => {
    setSelectedProduct(null); // Limpiar el producto seleccionado

    // Si es un filtro adicional (DMA_*), usar goToAdditionalFilter
    // Si es un filtro del flujo principal, usar goToFilterStep
    if (filterId.startsWith("DMA_")) {
      goToAdditionalFilter(filterId);
    } else {
      goToFilterStep(filterId);
    }
  };

  const handleBreadcrumbProductsSelect = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado para regresar al ProductGrid
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
  };

  const handleAdditionalFilterSelect = (filterId, value) => {
    applyAdditionalFilter(filterId, value);
  };

  const handleAdditionalFilterClear = (filterId) => {
    clearAdditionalFilter(filterId);
  };

  // Cargar producto seleccionado desde localStorage al inicializar
  useEffect(() => {
    const savedProduct = loadSelectedProduct();
    if (savedProduct) {
      setSelectedProduct(savedProduct);
    }
  }, [loadSelectedProduct]);

  // Guardar producto seleccionado cuando cambie
  useEffect(() => {
    saveSelectedProduct(selectedProduct);
  }, [selectedProduct, saveSelectedProduct]);

  // Pantalla de bienvenida cuando no hay línea seleccionada
  if (!selectedLinea) {
    return (
      <CatalogContainer>
        <SEO
          title={`${
            config.EMPRESA_NOMBRE || "Catálogo"
          } - Catálogo de Productos`}
          description={config.textos.catalogo.subtitulo}
        />

        <MainContent>
          <WelcomeScreen>
            <WelcomeHeader>
              <WelcomeTitle>Bienvenido al Catálogo</WelcomeTitle>
              <WelcomeDescription>
                Explora nuestra amplia gama de productos de alta calidad.
                Selecciona una línea de negocio para comenzar a filtrar
                productos.
              </WelcomeDescription>
            </WelcomeHeader>

            {loading ? (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <Text variant="p" color="gray">
                  Cargando líneas de negocio disponibles...
                </Text>
              </div>
            ) : availableLines.length > 0 ? (
              <LinesGrid>
                {availableLines.map((linea) => (
                  <LineCard
                    key={linea.key}
                    onClick={() => handleLineaSelect(linea.key)}
                  >
                    <LineIcon>
                      <Icon name={linea.icon} size={70} />
                    </LineIcon>
                    <LineTitle>{linea.name}</LineTitle>
                    <LineDescription>{linea.description}</LineDescription>
                    <LineCount>{linea.count} productos</LineCount>
                  </LineCard>
                ))}
              </LinesGrid>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <Text variant="p" color="gray">
                  No hay líneas de negocio disponibles en este momento.
                </Text>
              </div>
            )}
          </WelcomeScreen>
        </MainContent>
      </CatalogContainer>
    );
  }

  // Si hay un producto seleccionado, mostrar el detalle
  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToCatalog}
        onLineaSelect={handleBreadcrumbLineaSelect}
        onFilterSelect={handleBreadcrumbFilterSelect}
        onProductsSelect={handleBreadcrumbProductsSelect}
        catalogState={{
          selectedLinea,
          selectedValues,
          availableLines,
          flowConfig,
        }}
        isAtProductView={isAtProductView}
      />
    );
  }

  // Pantalla de productos cuando se han completado todos los filtros
  if (isAtProductView) {
    return (
      <CatalogContainer>
        <SEO
          title={`${config.EMPRESA_NOMBRE || "Catálogo"} - ${
            flowConfig?.displayName || "Productos"
          }`}
          description={`Catálogo de ${flowConfig?.displayName || "productos"}`}
        />

        <CatalogBreadcrumb
          selectedLinea={selectedLinea}
          selectedValues={selectedValues}
          availableLines={availableLines}
          onLineaSelect={handleBreadcrumbLineaSelect}
          onFilterSelect={handleBreadcrumbFilterSelect}
          onProductsSelect={handleBreadcrumbProductsSelect}
          currentStep={currentStep}
          flowConfig={flowConfig}
          isAtProductView={isAtProductView}
        />

        <MainContent>
          <ContentWithFilters>
            <AdditionalFilters
              filters={additionalFilters}
              selectedValues={selectedValues}
              searchQuery={searchQuery}
              onFilterSelect={handleAdditionalFilterSelect}
              onClearFilter={handleAdditionalFilterClear}
              onSearchChange={handleSearchChange}
            />
            <ProductGridView
              products={filteredProducts}
              catalogState={{
                selectedLinea,
                selectedValues,
                availableLines,
                flowConfig,
              }}
              onProductSelect={handleProductSelect}
            />
          </ContentWithFilters>
        </MainContent>
      </CatalogContainer>
    );
  }

  // Pantalla de filtros en cascada
  return (
    <CatalogContainer>
      <SEO
        title={`${config.EMPRESA_NOMBRE || "Catálogo"} - ${
          flowConfig?.displayName || "Catálogo"
        }`}
        description={`Filtra productos de ${
          flowConfig?.displayName || "nuestro catálogo"
        }`}
      />

      <CatalogBreadcrumb
        selectedLinea={selectedLinea}
        selectedValues={selectedValues}
        availableLines={availableLines}
        onLineaSelect={handleBreadcrumbLineaSelect}
        onFilterSelect={handleBreadcrumbFilterSelect}
        onProductsSelect={handleBreadcrumbProductsSelect}
        currentStep={currentStep}
        flowConfig={flowConfig}
        isAtProductView={isAtProductView}
      />

      <MainContent>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <Text variant="p" color="gray">
              Cargando productos...
            </Text>
          </div>
        ) : (
          <FilterCards
            step={currentStep}
            options={currentStepOptions}
            selectedValue={selectedValues[currentStep?.id]}
            onSelect={handleFilterSelect}
          />
        )}
      </MainContent>
    </CatalogContainer>
  );
};

export default Catalog;
