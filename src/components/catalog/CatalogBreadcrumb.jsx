import React from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";
import Text from "../ui/Text";

const BreadcrumbContainer = styled.div`
  background: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  position: sticky;
  top: 80px;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: auto;
  min-height: 80px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    height: 120px;
  }
`;

const BreadcrumbContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const LinesSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.spacing.xs};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FiltersSection = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.xs};
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.sm};
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
    font-size: ${({ theme }) => theme.fontSizes.sm};
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
  width: 20px;
  height: 20px;
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

const BreadcrumbTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
        <div>
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
        </div>

        {/* Sección de Filtros - Solo si hay línea seleccionada */}
        {selectedLinea && (
          <div style={{ width: "100%", borderTop: "1px solid #e0e0e0" }}>
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
          </div>
        )}
      </BreadcrumbContent>
    </BreadcrumbContainer>
  );
};

export default CatalogBreadcrumb;
