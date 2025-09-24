import React, { useState, useEffect } from "react";
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
    background: ${({ theme }) => theme.colors.light};
    padding: ${({ theme }) => theme.spacing.lg};
    overflow-y: auto;
    height: calc(100vh - 200px);
    position: sticky;
    top: 200px;
    z-index: 50;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.06);
  }
`;

const FilterHeader = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const FilterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
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
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme }) => theme.colors.lightGray};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text.primary};
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
`;

const FilterSearchInput = styled(Input)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
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
  searchQuery = "",
  onSearchChange,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [filterSearches, setFilterSearches] = useState({});

  // Efecto para abrir ciertos filtros por defecto cuando cambien los filtros disponibles
  useEffect(() => {
    // Filtros que deben empezar abiertos por defecto
    const defaultOpenFilters = ['DMA_MARCA', 'DMA_SUBGRUPO'];
    
    setOpenAccordions(prevOpen => {
      const newOpen = { ...prevOpen };
      
      // Abrir los filtros que están en la lista de defaultOpenFilters
      filters.forEach(filter => {
        if (defaultOpenFilters.includes(filter.id) && !(filter.id in newOpen)) {
          newOpen[filter.id] = true;
        }
      });
      
      return newOpen;
    });
  }, [filters]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterSelect = (filterId, value) => {
    onFilterSelect(filterId, value);
    // Cerrar modal después de seleccionar un filtro
    closeModal();
  };

  const toggleAccordion = (filterId) => {
    setOpenAccordions(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const handleFilterSearch = (filterId, value) => {
    setFilterSearches(prev => ({
      ...prev,
      [filterId]: value
    }));
  };

  const getFilteredOptions = (options, filterId) => {
    const searchTerm = filterSearches[filterId] || '';
    if (!searchTerm) return options;
    
    return options.filter(option =>
      String(option.label || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
              Filtros Adicionales
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
            {
              Object.keys(selectedValues).filter((key) => key.startsWith("DMA_"))
                .length
            }
            )
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
                const filteredOptions = getFilteredOptions(filter.options, filter.id);
                
                return (
                  <AccordionFilter key={filter.id}>
                    <AccordionHeader onClick={() => toggleAccordion(filter.id)}>
                      <AccordionTitle>
                        <Icon name="FaTag" size="sm" />
                        {filter.name}
                        {selectedValues[filter.id] && (
                          <span style={{ color: 'var(--primary-color)', fontSize: '0.8em' }}>
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
                        <FilterSearchInput
                          type="text"
                          placeholder={`Buscar en ${filter.name.toLowerCase()}...`}
                          value={filterSearches[filter.id] || ''}
                          onChange={(e) => handleFilterSearch(filter.id, e.target.value)}
                          icon="FaSearch"
                        />
                      </FilterSearchContainer>
                      
                      <FilterOptionsContainer>
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((option) => (
                            <FilterOption
                              key={option.value}
                              $isSelected={selectedValues[filter.id] === option.value}
                              $disabled={option.disabled}
                              onClick={() => {
                                if (!option.disabled) {
                                  handleFilterSelect(filter.id, option.value);
                                }
                              }}
                            >
                              <FilterOptionLabel
                                $isSelected={selectedValues[filter.id] === option.value}
                              >
                                {option.label}
                              </FilterOptionLabel>
                              <FilterOptionCount
                                $isSelected={selectedValues[filter.id] === option.value}
                              >
                                {option.count}
                              </FilterOptionCount>
                            </FilterOption>
                          ))
                        ) : (
                          <Text variant="p" color="gray" size="sm" style={{ padding: '8px' }}>
                            No se encontraron opciones
                          </Text>
                        )}
                      </FilterOptionsContainer>
                      
                      {selectedValues[filter.id] && (
                        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border-color)' }}>
                          <ClearButton onClick={() => onClearFilter(filter.id)}>
                            <Icon name="FaTimes" size="xs" />
                            Limpiar
                          </ClearButton>
                        </div>
                      )}
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
            Filtros Adicionales
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

        {filters.map((filter) => {
          const isOpen = openAccordions[filter.id] || false;
          const filteredOptions = getFilteredOptions(filter.options, filter.id);
          
          return (
            <AccordionFilter key={filter.id}>
              <AccordionHeader onClick={() => toggleAccordion(filter.id)}>
                <AccordionTitle>
                  {filter.name}
                  {selectedValues[filter.id] && (
                    <span style={{ color: 'var(--primary-color)', fontSize: '0.8em' }}>
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
                  <FilterSearchInput
                    type="text"
                    placeholder={`Buscar en ${filter.name.toLowerCase()}...`}
                    value={filterSearches[filter.id] || ''}
                    onChange={(e) => handleFilterSearch(filter.id, e.target.value)}
                    icon="FaSearch"
                  />
                </FilterSearchContainer>
                
                <FilterOptionsContainer>
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <FilterOption
                        key={option.value}
                        $isSelected={selectedValues[filter.id] === option.value}
                        $disabled={option.disabled}
                        onClick={() => {
                          if (!option.disabled) {
                            onFilterSelect(filter.id, option.value);
                          }
                        }}
                      >
                        <FilterOptionLabel
                          $isSelected={selectedValues[filter.id] === option.value}
                        >
                          {option.label}
                        </FilterOptionLabel>
                        <FilterOptionCount
                          $isSelected={selectedValues[filter.id] === option.value}
                        >
                          {option.count}
                        </FilterOptionCount>
                      </FilterOption>
                    ))
                  ) : (
                    <Text variant="p" color="gray" size="sm" style={{ padding: '8px' }}>
                      No se encontraron opciones
                    </Text>
                  )}
                </FilterOptionsContainer>
                
                {selectedValues[filter.id] && (
                  <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border-color)' }}>
                    <ClearButton onClick={() => onClearFilter(filter.id)}>
                      <Icon name="FaTimes" size="xs" />
                      Limpiar
                    </ClearButton>
                  </div>
                )}
              </AccordionContent>
            </AccordionFilter>
          );
        })}
      </FiltersContainer>
    </>
  );
};

export default AdditionalFilters;
