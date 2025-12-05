import React from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";

const BreadcrumbContainer = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 80px;
  z-index: 100;
  height: auto;
  min-height: 50px;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 10px 25px;
    min-height: min-content;
    height: auto;
  }
`;

const BreadcrumbContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.sm};
    align-items: center;
  }
`;

const LinesSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.xs};
    width: 33.333%;
    flex: 0 0 33.333%;
  }
`;

const FiltersSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.xs};
    width: 66.666%;
    flex: 1;
    overflow-x: auto;

    /* Ocultar scrollbar pero mantener funcionalidad */
    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.border};
      border-radius: 2px;
    }
  }
`;

const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $isActive, theme }) => {
    return $isActive ? theme.colors.primary : theme.colors.lightGray;
  }};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.light : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  }

  &:hover {
    background: ${({ $isActive, theme }) => {
      return $isActive ? theme.colors.primaryDark : theme.colors.border;
    }};
  }
`;

const BreadcrumbIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 18px;
    height: 18px;
  }
`;

const BreadcrumbText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 150px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: none;
  }
`;

const BreadcrumbSeparator = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0 ${({ theme }) => theme.spacing.xs};
`;

const CatalogBreadcrumb = ({
  selectedLinea,
  selectedValues,
  availableLines,
  onLineaSelect,
  onFilterSelect,
  onProductsSelect,
  currentStep,
  isAtProductView,
}) => {
  const getStepDisplayName = (stepId) => {
    const names = {
      categoria: "Categoría",
      aplicacion: "Aplicación",
      clase: "Clase",
      clasificacion: "Clasificación",
      grupo: "Grupo",
      subgrupo: "Subgrupo",
    };
    return names[stepId] || stepId;
  };

  const getFilterDisplayName = (filterField) => {
    const names = {
      DMA_EJE: "Eje",
      DMA_MARCA: "Marca",
      DMA_CARGA: "Carga",
      DMA_VELOCIDAD: "Velocidad",
      DMA_TIPO: "Tipo",
      DMA_MODELO: "Modelo",
      DMA_RIN: "Rin",
      DMA_ANCHO: "Ancho",
      DMA_SERIE: "Alto/Serie",
      DMA_SAE: "Viscosidad",
      DMA_GRUPO: "Grupo",
      DMA_SUBGRUPO: "Subgrupo",
      DMA_SUBGRUPO2: "Subgrupo 2",
      DMA_APLICACION: "Aplicación",
    };
    return names[filterField] || filterField;
  };

  const handleLineaClick = (lineaKey) => {
    if (lineaKey === selectedLinea) {
      onLineaSelect(null); // Volver a bienvenidos solo si es la misma línea
    } else {
      onLineaSelect(lineaKey); // Cambiar a otra línea
    }
  };

  const handleFilterClick = (filterId) => {
    onFilterSelect(filterId); // Ir al paso específico del filtro
  };

  const handleProductsClick = () => {
    onProductsSelect(); // Regresar al ProductGrid
  };

  return (
    <BreadcrumbContainer>
      <BreadcrumbContent>
        {/* Sección de Líneas - Siempre visible */}
        <LinesSection>
          {availableLines.map((linea) => (
            <BreadcrumbItem
              key={linea.key}
              $isActive={selectedLinea === linea.key}
              $isLine={true}
              onClick={() => handleLineaClick(linea.key)}
            >
              <BreadcrumbIcon>
                <Icon name={linea.icon || "FaBox"} size="sm" />
              </BreadcrumbIcon>
              <BreadcrumbText>{linea.name}</BreadcrumbText>
            </BreadcrumbItem>
          ))}
        </LinesSection>

        {/* Sección de Filtros - Solo si hay línea seleccionada */}
        {selectedLinea && (
          <FiltersSection>
            {Object.entries(selectedValues).map(([filterId, value]) => (
              <React.Fragment key={filterId}>
                <BreadcrumbSeparator>
                  <Icon name="FaChevronRight" size="xs" />
                </BreadcrumbSeparator>
                <BreadcrumbItem
                  $isActive={currentStep?.id === filterId && !isAtProductView}
                  $isLine={false}
                  onClick={() => handleFilterClick(filterId)}
                >
                  <BreadcrumbIcon>
                    <Icon name="FaTag" size="sm" />
                  </BreadcrumbIcon>
                  <BreadcrumbText>
                    {filterId.startsWith("DMA_")
                      ? getFilterDisplayName(filterId)
                      : getStepDisplayName(filterId)}
                    : {value}
                  </BreadcrumbText>
                </BreadcrumbItem>
              </React.Fragment>
            ))}

            {/* Paso actual si no está completo */}
            {currentStep && !selectedValues[currentStep.id] && (
              <>
                <BreadcrumbSeparator>
                  <Icon name="FaChevronRight" size="xs" />
                </BreadcrumbSeparator>
                <BreadcrumbItem $isActive={!isAtProductView} $isLine={false}>
                  <BreadcrumbIcon>
                    <Icon name="FaCog" size="sm" />
                  </BreadcrumbIcon>
                  <BreadcrumbText>
                    Selecciona {getStepDisplayName(currentStep.id)}
                  </BreadcrumbText>
                </BreadcrumbItem>
              </>
            )}

            {/* Elemento "Productos" cuando estamos en la vista de productos */}
            {isAtProductView && (
              <>
                <BreadcrumbSeparator>
                  <Icon name="FaChevronRight" size="xs" />
                </BreadcrumbSeparator>
                <BreadcrumbItem
                  $isActive={true}
                  $isLine={false}
                  onClick={handleProductsClick}
                >
                  <BreadcrumbIcon>
                    <Icon name="FaBox" size="sm" />
                  </BreadcrumbIcon>
                  <BreadcrumbText>Productos</BreadcrumbText>
                </BreadcrumbItem>
              </>
            )}
          </FiltersSection>
        )}
      </BreadcrumbContent>
    </BreadcrumbContainer>
  );
};

export default CatalogBreadcrumb;
