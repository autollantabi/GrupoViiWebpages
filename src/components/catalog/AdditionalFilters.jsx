import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";
import Text from "../ui/Text";
import Input from "../ui/Input";
import Button from "../ui/Button";

const FiltersContainer = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    width: 290px;
    flex-shrink: 0;
    background: ${({ theme }) => theme.colors.light};
    padding: ${({ theme }) => theme.spacing.lg};
    overflow-y: auto;
    overflow-x: hidden;
    position: sticky;
    top: 127px;
    z-index: 50;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
    align-self: flex-start;
    max-height: calc(100vh - 140px);
    height: fit-content;
  }
`;

const FilterHeader = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const ClearAllButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
  background: none;
  border: none;
  color: ${({ theme, $hasFilters, disabled }) =>
    disabled
      ? theme.colors.text.secondary
      : $hasFilters
      ? theme.colors.primary
      : theme.colors.text.secondary};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  text-decoration: none;
  white-space: nowrap;

  &:hover:not(:disabled) {
    color: ${({ theme, $hasFilters }) =>
      $hasFilters ? theme.colors.primary : theme.colors.text.primary};
    text-decoration: ${({ $hasFilters }) =>
      $hasFilters ? "underline" : "none"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const FilterOptionLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.text.primary};
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
  flex: 1;
`;

const FilterOptionCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : theme.colors.text.secondary};
  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : theme.colors.lightGray};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
`;

const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

// Componentes para el modal móvil
const MobileFilterContainer = styled.div`
  padding: 10px;
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileFilterButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.light};
  width: 100%;
  max-height: 80vh;
  border-radius: ${({ theme }) => theme.borderRadius.lg}
    ${({ theme }) => theme.borderRadius.lg} 0 0;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ModalFiltersContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

// Componentes para filtros acordeonables
const AccordionFilter = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
  }
`;

const AccordionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const AccordionIcon = styled.div`
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const AccordionContent = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? "700px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FilterSearchContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
`;

const FilterClearButton = styled(ClearButton)`
  margin-top: 0;
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const FilterOptionsContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  border: 1px solid
    ${({ $isSelected, theme }) =>
      $isSelected ? theme.colors.primary : "transparent"};
  background: ${({ $isSelected, $disabled, theme }) =>
    $disabled
      ? theme.colors.lightGray
      : $isSelected
      ? theme.colors.primaryLight
      : "transparent"};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  &:hover {
    background: ${({ $isSelected, $disabled, theme }) =>
      $disabled
        ? theme.colors.lightGray
        : $isSelected
        ? theme.colors.primaryLight
        : theme.colors.lightGray};
    border-color: ${({ $isSelected, $disabled, theme }) =>
      $disabled
        ? "transparent"
        : $isSelected
        ? theme.colors.primary
        : theme.colors.border};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const AdditionalFilters = ({
  filters = [],
  selectedValues = {},
  onFilterSelect,
  onClearFilter,
  onClearAll,
  searchQuery = "",
  onSearchChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [filterSearches, setFilterSearches] = useState({});
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const searchTimeoutRef = useRef(null);

  // Efecto para abrir ciertos filtros por defecto cuando cambien los filtros disponibles
  useEffect(() => {
    // Filtros que deben empezar abiertos por defecto
    const defaultOpenFilters = ["DMA_MARCA", "DMA_SUBGRUPO"];

    setOpenAccordions((prevOpen) => {
      const newOpen = { ...prevOpen };

      // Abrir los filtros que están en la lista de defaultOpenFilters
      filters.forEach((filter) => {
        if (defaultOpenFilters.includes(filter.id) && !(filter.id in newOpen)) {
          newOpen[filter.id] = true;
        }
      });

      return newOpen;
    });
  }, [filters]);

  // Sincronizar localSearchQuery cuando searchQuery cambie externamente
  useEffect(() => {
    setLocalSearchQuery(searchQuery || "");
  }, [searchQuery]);

  // Debounce para la búsqueda principal
  useEffect(() => {
    // Limpiar el timeout anterior si existe
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Crear un nuevo timeout
    searchTimeoutRef.current = setTimeout(() => {
      if (onSearchChange) {
        // Crear un evento sintético para mantener compatibilidad
        const syntheticEvent = {
          target: { value: localSearchQuery },
          preventDefault: () => {},
        };
        onSearchChange(syntheticEvent);
      }
    }, 500);

    // Cleanup function para limpiar el timeout si el componente se desmonta o cambia el valor
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [localSearchQuery, onSearchChange]);

  const handleSearchChange = (e) => {
    // Extraer el valor del evento de forma segura
    let value = "";
    if (e && typeof e === "object" && e.target && "value" in e.target) {
      value = e.target.value || "";
    } else if (typeof e === "string") {
      value = e;
    }
    setLocalSearchQuery(value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterSelect = (filterId, value) => {
    onFilterSelect(filterId, value);
    // Cerrar modal después de seleccionar un filtro
    closeModal();
  };

  const toggleAccordion = (filterId) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleFilterSearch = (filterId, value) => {
    setFilterSearches((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  // Función auxiliar para comparar valores de filtro (normaliza tipos)
  const compareFilterValue = (productValue, filterValue) => {
    // Si ambos son null/undefined, coinciden
    if (!productValue && !filterValue) return true;
    // Si uno es null/undefined y el otro no, no coinciden
    if (!productValue || !filterValue) return false;

    // Convertir ambos a string para comparar
    const productStr = String(productValue).trim();
    const filterStr = String(filterValue).trim();

    // Comparación case-insensitive para strings
    return productStr.toLowerCase() === filterStr.toLowerCase();
  };

  const getFilteredOptions = (options, filterId) => {
    const searchTerm = filterSearches[filterId] || "";
    if (!searchTerm) return options;

    return options.filter((option) =>
      String(option.label || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };

  // Calcular si hay filtros adicionales seleccionados y su conteo
  const { hasAdditionalFilters, additionalFiltersCount } = useMemo(() => {
    if (!selectedValues || typeof selectedValues !== "object") {
      return { hasAdditionalFilters: false, additionalFiltersCount: 0 };
    }

    const validFilters = Object.entries(selectedValues).filter(
      ([key, value]) => {
        // Verificar que la clave empiece con DMA_
        if (!key.startsWith("DMA_")) return false;

        // Verificar que el valor sea válido (no null, undefined, o string vacío)
        if (value === null || value === undefined || value === "") return false;

        // Si es string, verificar que no esté vacío después de trim
        if (typeof value === "string" && value.trim() === "") return false;

        return true;
      }
    );

    return {
      hasAdditionalFilters: validFilters.length > 0,
      additionalFiltersCount: validFilters.length,
    };
  }, [selectedValues]);

  if (filters.length === 0) {
    return (
      <>
        <MobileFilterContainer>
          {/* Botón para abrir modal en móvil */}
          <MobileFilterButton
            variant="secondary"
            onClick={openModal}
            icon="FaFilter"
          >
            Filtros y Búsqueda
          </MobileFilterButton>
        </MobileFilterContainer>

        {/* Modal para móvil */}
        {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>
                  <Icon name="FaFilter" size="sm" />
                  Filtros y Búsqueda
                </ModalTitle>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {onClearAll && (
                    <ClearAllButton
                      $hasFilters={hasAdditionalFilters}
                      onClick={onClearAll}
                      disabled={!hasAdditionalFilters}
                    >
                      <Icon name="FaTrashAlt" size="xs" />
                      Limpiar todo
                    </ClearAllButton>
                  )}
                  <CloseButton onClick={closeModal}>
                    <Icon name="FaTimes" size="md" />
                  </CloseButton>
                </div>
              </ModalHeader>

              <SearchContainer>
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={localSearchQuery}
                  onChange={handleSearchChange}
                  icon="FaSearch"
                />
              </SearchContainer>

              <Text variant="p" color="gray" size="sm">
                No hay filtros adicionales disponibles para esta selección.
              </Text>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Sidebar para desktop */}
        <FiltersContainer>
          <FilterHeader>
            <FilterTitle>
              <Icon name="FaFilter" size="sm" />
              Filtros
            </FilterTitle>
          </FilterHeader>

          <SearchContainer>
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              icon="FaSearch"
            />
          </SearchContainer>

          <Text variant="p" color="gray" size="sm">
            No hay filtros adicionales disponibles para esta selección.
          </Text>
        </FiltersContainer>
      </>
    );
  }

  return (
    <>
      <MobileFilterContainer>
        {/* Botón para abrir modal en móvil */}
        <MobileFilterButton
          variant="secondary"
          onClick={openModal}
          icon="FaFilter"
        >
          Filtros y Búsqueda (
          {additionalFiltersCount > 0 ? `(${additionalFiltersCount})` : ""})
        </MobileFilterButton>
      </MobileFilterContainer>

      {/* Modal para móvil */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                <Icon name="FaFilter" size="sm" />
                Filtros y Búsqueda
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <Icon name="FaTimes" size="md" />
              </CloseButton>
            </ModalHeader>

            <SearchContainer>
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                icon="FaSearch"
              />
            </SearchContainer>

            <ModalFiltersContainer>
              {filters.map((filter) => {
                const isOpen = openAccordions[filter.id] || false;
                const filteredOptions = getFilteredOptions(
                  filter.options,
                  filter.id
                );

                return (
                  <AccordionFilter key={filter.id}>
                    <AccordionHeader onClick={() => toggleAccordion(filter.id)}>
                      <AccordionTitle>
                        <Icon name="FaTag" size="sm" />
                        {filter.name}
                        {selectedValues[filter.id] && (
                          <span
                            style={{
                              color: "var(--primary-color)",
                              fontSize: "0.8em",
                            }}
                          >
                            (Seleccionado)
                          </span>
                        )}
                      </AccordionTitle>
                      <AccordionIcon $isOpen={isOpen}>
                        <Icon name="FaChevronDown" size="sm" />
                      </AccordionIcon>
                    </AccordionHeader>

                    <AccordionContent $isOpen={isOpen}>
                      <FilterSearchContainer>
                        <Input
                          type="text"
                          placeholder={`Buscar...`}
                          value={filterSearches[filter.id] || ""}
                          onChange={(e) =>
                            handleFilterSearch(filter.id, e.target.value)
                          }
                          noMargin={true}
                        />
                        {selectedValues[filter.id] && (
                          <FilterClearButton
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onClearFilter) {
                                onClearFilter(filter.id);
                              }
                            }}
                          >
                            <Icon name="FaTimes" size="xs" />
                            Limpiar
                          </FilterClearButton>
                        )}
                      </FilterSearchContainer>

                      <FilterOptionsContainer>
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((option) => {
                            const isSelected = compareFilterValue(
                              selectedValues[filter.id],
                              option.value
                            );
                            return (
                              <FilterOption
                                key={option.value}
                                $isSelected={isSelected}
                                $disabled={option.disabled}
                                onClick={() => {
                                  if (!option.disabled) {
                                    handleFilterSelect(filter.id, option.value);
                                  }
                                }}
                              >
                                <FilterOptionLabel $isSelected={isSelected}>
                                  {option.label}
                                </FilterOptionLabel>
                                <FilterOptionCount $isSelected={isSelected}>
                                  {option.count}
                                </FilterOptionCount>
                              </FilterOption>
                            );
                          })
                        ) : (
                          <Text
                            variant="p"
                            color="gray"
                            size="sm"
                            style={{ padding: "8px" }}
                          >
                            No se encontraron opciones
                          </Text>
                        )}
                      </FilterOptionsContainer>
                    </AccordionContent>
                  </AccordionFilter>
                );
              })}
            </ModalFiltersContainer>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Sidebar para desktop */}
      <FiltersContainer>
        <FilterHeader>
          <FilterTitle>
            <Icon name="FaFilter" size="sm" />
            Filtros
          </FilterTitle>
          {onClearAll && (
            <ClearAllButton
              $hasFilters={hasAdditionalFilters}
              onClick={onClearAll}
              disabled={!hasAdditionalFilters}
            >
              <Icon name="FaTrashAlt" size="xs" />
              Limpiar todo
            </ClearAllButton>
          )}
        </FilterHeader>

        <SearchContainer>
          <Input
            type="text"
            placeholder="Buscar productos..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            icon="FaSearch"
          />
        </SearchContainer>

        {filters.map((filter) => {
          const isOpen = openAccordions[filter.id] || false;
          const filteredOptions = getFilteredOptions(filter.options, filter.id);

          return (
            <AccordionFilter key={filter.id}>
              <AccordionHeader onClick={() => toggleAccordion(filter.id)}>
                <AccordionTitle>
                  {filter.name}
                  {selectedValues[filter.id] && (
                    <span
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "0.8em",
                      }}
                    >
                      (Seleccionado)
                    </span>
                  )}
                </AccordionTitle>
                <AccordionIcon $isOpen={isOpen}>
                  <Icon name="FaChevronDown" size="sm" />
                </AccordionIcon>
              </AccordionHeader>

              <AccordionContent $isOpen={isOpen}>
                <FilterSearchContainer>
                  <Input
                    type="text"
                    placeholder={`Buscar ...`}
                    value={filterSearches[filter.id] || ""}
                    onChange={(e) =>
                      handleFilterSearch(filter.id, e.target.value)
                    }
                    noMargin={true}
                  />
                  {selectedValues[filter.id] && (
                    <FilterClearButton
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onClearFilter) {
                          onClearFilter(filter.id);
                        }
                      }}
                    >
                      <Icon name="FaTimes" size="xs" />
                      Limpiar
                    </FilterClearButton>
                  )}
                </FilterSearchContainer>

                <FilterOptionsContainer>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                      const isSelected = compareFilterValue(
                        selectedValues[filter.id],
                        option.value
                      );
                      return (
                        <FilterOption
                          key={option.value}
                          $isSelected={isSelected}
                          $disabled={option.disabled}
                          onClick={() => {
                            if (!option.disabled) {
                              onFilterSelect(filter.id, option.value);
                            }
                          }}
                        >
                          <FilterOptionLabel $isSelected={isSelected}>
                            {option.label}
                          </FilterOptionLabel>
                          <FilterOptionCount $isSelected={isSelected}>
                            {option.count}
                          </FilterOptionCount>
                        </FilterOption>
                      );
                    })
                  ) : (
                    <Text
                      variant="p"
                      color="gray"
                      size="sm"
                      style={{ padding: "8px" }}
                    >
                      No se encontraron opciones
                    </Text>
                  )}
                </FilterOptionsContainer>
              </AccordionContent>
            </AccordionFilter>
          );
        })}
      </FiltersContainer>
    </>
  );
};

export default AdditionalFilters;
