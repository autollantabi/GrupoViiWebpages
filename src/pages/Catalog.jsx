import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import SEO from "../components/seo/SEO";
import FilterCards from "../components/catalog/FilterCards";
import ProductGridView from "../components/catalog/ProductGridView";
import AdditionalFilters from "../components/catalog/AdditionalFilters";
import CatalogBreadcrumb from "../components/catalog/CatalogBreadcrumb";
import useCatalogFlow from "../hooks/useCatalogFlow";
import useCatalogURL from "../hooks/useCatalogURL";
import { useEmpresa } from "../hooks/useEmpresa";
import { useProducts } from "../api";
import Icon from "../components/ui/Icon";
import Text from "../components/ui/Text";

const CatalogContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
`;

const MainContent = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  position: relative;
`;

const ContentWithFilters = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
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
  const navigate = useNavigate();
  const location = useLocation();

  // Hook para manejar URL
  const urlCatalog = useCatalogURL();

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
    selectFilterValue,
    isAtProductView,
    flowConfig,
    handleSearchChange,
    goToFilterStep,
    setSelectedValues,
  } = useCatalogFlow();

  // Obtener productos directamente del hook useProducts para verificar si están cargados
  const { products } = useProducts();

  // Obtener el ID del producto para hacer scroll (si existe)
  // Se lee de sessionStorage cuando se renderiza el componente
  const scrollToProductId = sessionStorage.getItem("selectedProductId");

  // Ref para rastrear si el usuario está escribiendo activamente
  const isUserTypingRef = useRef(false);

  // Ya no necesitamos sincronizar selectedLinea porque se lee directamente de la URL
  // selectedLinea ahora se obtiene automáticamente desde searchParams en useCatalogFlow

  // Cargar filtros y búsqueda desde URL después de que se seleccione la línea
  useEffect(() => {
    if (selectedLinea && flowConfig && products && products.length > 0) {
      // Cargar filtros del flujo desde URL
      const flowFilters = urlCatalog.getFlowFiltersFromURL(flowConfig);

      // Verificar si necesitamos sincronizar los filtros
      const flowFilterKeys = Object.keys(flowFilters);
      const localFilterKeys = Object.keys(selectedValues);

      // SIEMPRE sincronizar si hay filtros en URL (especialmente importante cuando regresas del producto)
      // o si hay diferencias entre URL y estado local
      const needsSync =
        flowFilterKeys.length !== localFilterKeys.length ||
        flowFilterKeys.some(
          (key) => flowFilters[key] !== selectedValues[key]
        ) ||
        localFilterKeys.some((key) => !flowFilters[key]);

      // Sincronizar filtros si es necesario O si hay filtros en URL pero selectedValues está vacío
      if (
        needsSync ||
        (flowFilterKeys.length > 0 && localFilterKeys.length === 0)
      ) {
        if (flowFilterKeys.length > 0) {
          // Aplicar filtros del flujo directamente desde la URL
          // Usar setSelectedValues para evitar múltiples renders de selectFilterValue
          const newSelectedValues = {};
          flowConfig.steps.forEach((step) => {
            const filterValue = flowFilters[step.id];
            if (filterValue) {
              newSelectedValues[step.id] = filterValue;
            }
          });
          // Actualizar SIEMPRE si hay filtros en URL, incluso si selectedValues está vacío
          // Esto es crucial cuando regresas del producto y selectLinea reseteó selectedValues
          setSelectedValues(newSelectedValues);
        } else {
          // Si no hay filtros en URL pero hay en estado local, limpiarlos
          if (localFilterKeys.length > 0) {
            setSelectedValues({});
          }
        }
      }

      // Cargar búsqueda desde URL, pero no si el usuario está escribiendo activamente
      if (isUserTypingRef.current) {
        return; // No sincronizar mientras el usuario está escribiendo
      }

      const urlSearch = urlCatalog.catalogState.search || "";
      // Convertir a string para comparación consistente
      const currentQuery = typeof searchQuery === "string" ? searchQuery : "";

      if (urlSearch !== currentQuery) {
        handleSearchChange({ target: { value: urlSearch } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLinea, flowConfig, products, location.search]);

  const handleLineaSelect = (linea) => {
    // Actualizar solo la URL, selectedLinea se leerá automáticamente desde searchParams
    urlCatalog.setLinea(linea);
  };

  const handleFilterSelect = (value) => {
    selectFilterValue(value);
    // La URL se actualizará cuando cambien los selectedValues
  };

  const handleBreadcrumbLineaSelect = (linea) => {
    // Actualizar solo la URL, selectedLinea se leerá automáticamente desde searchParams
    urlCatalog.setLinea(linea);
  };

  const handleBreadcrumbFilterSelect = (filterId) => {
    // Si es un filtro adicional (DMA_*), solo limpiar desde URL
    // Si es un filtro del flujo principal, usar goToFilterStep
    if (filterId.startsWith("DMA_")) {
      urlCatalog.clearAdditionalFilter(filterId);
      // No usar goToAdditionalFilter - los filtros adicionales solo están en URL
    } else {
      goToFilterStep(filterId);
    }
  };

  const handleBreadcrumbProductsSelect = () => {
    // Ya no es necesario limpiar selectedProduct, solo navegamos
  };

  const handleProductSelect = (product) => {
    if (product && product.DMA_IDENTIFICADORITEM) {
      // Guardar la URL actual del catálogo antes de navegar al producto
      const currentCatalogUrl =
        window.location.pathname + window.location.search;
      sessionStorage.setItem("previousCatalogUrl", currentCatalogUrl);

      // Guardar el ID del producto seleccionado para hacer scroll cuando regreses
      sessionStorage.setItem(
        "selectedProductId",
        product.DMA_IDENTIFICADORITEM
      );

      // Codificar el ID para que funcione correctamente en la URL
      const encodedId = encodeURIComponent(product.DMA_IDENTIFICADORITEM);

      // Navegar al producto SIN parámetros en la URL
      navigate(`/producto/${encodedId}`);
    }
  };

  const handleAdditionalFilterSelect = (filterId, value) => {
    urlCatalog.setAdditionalFilter(filterId, value);
    // No usar applyAdditionalFilter - los filtros adicionales solo están en URL
  };

  const handleAdditionalFilterClear = (filterId) => {
    urlCatalog.clearAdditionalFilter(filterId);
    // No usar clearAdditionalFilter - los filtros adicionales solo están en URL
  };

  const handleClearAllAdditionalFilters = () => {
    urlCatalog.clearAllAdditionalFilters();
  };

  const handleSearchChangeWithURL = (e) => {
    const value = e.target.value || "";
    // Marcar que el usuario está escribiendo
    isUserTypingRef.current = true;
    // Primero actualizar el estado local inmediatamente para que el input responda
    handleSearchChange(e);

    // Si el valor está vacío, actualizar la URL inmediatamente para eliminar el parámetro
    // Si tiene valor, usar un pequeño delay para evitar actualizaciones excesivas mientras escribe
    if (!value || value.trim() === "") {
      // Valor vacío: actualizar inmediatamente para eliminar el parámetro de la URL
      urlCatalog.setSearch("");
      setTimeout(() => {
        isUserTypingRef.current = false;
      }, 50);
    } else {
      // Valor con contenido: usar delay para evitar actualizaciones excesivas
      setTimeout(() => {
        urlCatalog.setSearch(value);
        // Resetear el flag después de actualizar la URL
        setTimeout(() => {
          isUserTypingRef.current = false;
        }, 50);
      }, 150);
    }
  };

  // Combinar selectedValues con filtros adicionales de la URL
  // Usar location.search para asegurar que se actualice cuando cambie la URL
  const combinedSelectedValues = useMemo(() => {
    // Solo filtros del flujo principal (sin DMA_*)
    const flowFilters = Object.fromEntries(
      Object.entries(selectedValues).filter(([key]) => !key.startsWith("DMA_"))
    );

    // Los filtros adicionales SOLO vienen de la URL
    const additionalFiltersFromURL = urlCatalog.getAdditionalFiltersFromURL();

    return {
      ...flowFilters,
      ...additionalFiltersFromURL,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedValues,
    location.search, // Usar location.search directamente para detectar cambios en la URL
  ]);

  // Sincronizar filtros del flujo con URL cuando cambien
  useEffect(() => {
    if (selectedLinea && flowConfig && Object.keys(selectedValues).length > 0) {
      urlCatalog.setFlowFilters(selectedValues, flowConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues, selectedLinea, flowConfig]);

  // Establecer valores por defecto en URL cuando se está en vista de productos
  useEffect(() => {
    if (isAtProductView && selectedLinea) {
      const urlState = urlCatalog.catalogState;

      // Establecer valores por defecto si no existen en URL
      if (!urlState.page || urlState.page < 1) {
        urlCatalog.setPage(1);
      }
      if (!urlState.sort) {
        urlCatalog.setSort("destacados");
      }
      if (!urlState.perPage || urlState.perPage < 192) {
        urlCatalog.setPerPage(192);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtProductView, selectedLinea]);

  // Verificar si la URL está vacía (sin parámetros)
  const hasNoURLParams =
    location.pathname === "/catalogo" && location.search === "";

  // Pantalla de bienvenida solo cuando no hay línea seleccionada Y no hay parámetros en la URL
  if (!selectedLinea && hasNoURLParams) {
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

  // Ya no mostramos ProductDetail aquí, se navega a /producto/:id

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
          selectedValues={{
            ...selectedValues,
            ...urlCatalog.getAdditionalFiltersFromURL(),
          }}
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
              selectedValues={combinedSelectedValues}
              searchQuery={
                isUserTypingRef.current
                  ? searchQuery
                  : urlCatalog.catalogState.search || searchQuery || ""
              }
              onFilterSelect={handleAdditionalFilterSelect}
              onClearFilter={handleAdditionalFilterClear}
              onClearAll={handleClearAllAdditionalFilters}
              onSearchChange={handleSearchChangeWithURL}
            />
            <ProductGridView
              products={filteredProducts}
              catalogState={{
                selectedLinea,
                selectedValues,
                availableLines,
                flowConfig,
              }}
              urlState={urlCatalog.catalogState}
              onProductSelect={handleProductSelect}
              onPageChange={urlCatalog.setPage}
              onSortChange={urlCatalog.setSort}
              onPerPageChange={urlCatalog.setPerPage}
              loading={loading}
              scrollToProductId={scrollToProductId}
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
        selectedValues={combinedSelectedValues}
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
