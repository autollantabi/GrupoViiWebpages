import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from './Input';
import Icon from './Icon';

// Componentes existentes
const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    color: ${({ theme, disabled }) => (disabled ? 'inherit' : theme.colors.primary)};
  }
`;

// Nuevos componentes para chips
const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const FilterChip = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : `${theme.colors.lightGray}4D`}; // El 4D al final es 0.3 de opacidad en hex
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.light : theme.colors.text.primary};
  border: 1px solid ${({ theme, $selected }) => 
    $selected ? theme.colors.primary : `${theme.colors.gray}80`}; // Borde sutil
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  
  &:hover {
    background-color: ${({ theme, $selected, disabled }) => 
      disabled ? (
        $selected ? theme.colors.primary : `${theme.colors.lightGray}4D`
      ) : (
        $selected ? `${theme.colors.primary}E6` : `${theme.colors.gray}4D`
      )};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

const ChipCount = styled.span`
  display: inline-block;
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.light : theme.colors.gray};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text.secondary};
  padding: 0 ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const CountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0 ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-left: auto;
`;

const RangeContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FilterLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

// El componente principal con nueva opción de chips
const FilterControl = ({
  type = 'select',
  label,
  name,
  value,
  onChange,
  options = [],
  min,
  max,
  step,
  showCounts = false,
  multiple = false,
  displayAs = 'default', // Nueva prop: 'default' o 'chip'
}) => {
  // Para manejar valores múltiples (checkbox)
  const [selectedValues, setSelectedValues] = useState(
    multiple && Array.isArray(value) ? value : []
  );

  useEffect(() => {
    if (multiple && Array.isArray(value)) {
      setSelectedValues(value);
    }
  }, [value, multiple]);

  const handleCheckboxChange = (optionValue, checked) => {
    let newValues;
    
    if (checked) {
      newValues = [...selectedValues, optionValue];
    } else {
      newValues = selectedValues.filter(val => val !== optionValue);
    }
    
    setSelectedValues(newValues);
    onChange({ target: { name, value: newValues } });
  };

  const handleRadioChange = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
  };
  
  const handleChipClick = (optionValue) => {
    if (multiple) {
      // Si es selección múltiple, funciona como checkbox
      const isSelected = selectedValues.includes(optionValue);
      handleCheckboxChange(optionValue, !isSelected);
    } else {
      // Si es selección única (radio), permitir deseleccionar si ya estaba seleccionado
      if (value === optionValue) {
        // Deseleccionar (establecer valor vacío)
        onChange({ target: { name, value: "" } });
      } else {
        // Seleccionar el nuevo valor
        handleRadioChange(optionValue);
      }
    }
  };

  const handleRangeChange = (e) => {
    onChange(e);
  };

  // Renderizar chips para checkbox o radio
  if ((type === 'checkbox' || type === 'radio') && displayAs === 'chip') {
    return (
      <div>
        {label && <FilterLabel>{label}</FilterLabel>}
        <ChipsContainer>
          {options.map(option => {
            const isSelected = multiple
              ? selectedValues.includes(option.value)
              : value === option.value;
              
            return (
              <FilterChip
                key={option.value}
                type="button"
                disabled={option.disabled}
                $selected={isSelected}
                onClick={() => handleChipClick(option.value)}
              >
                {option.label}
                {showCounts && option.count !== undefined && (
                  <ChipCount $selected={isSelected}>
                    {option.count}
                  </ChipCount>
                )}
              </FilterChip>
            );
          })}
        </ChipsContainer>
      </div>
    );
  }

  // Los renderizados existentes para otros tipos de controles
  switch (type) {
    case 'checkbox':
      return (
        <div>
          {label && <FilterLabel>{label}</FilterLabel>}
          <OptionGroup>
            {options.map(option => (
              <CheckboxLabel 
                key={option.value} 
                disabled={option.disabled}
              >
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                  disabled={option.disabled}
                />
                {option.label}
                {showCounts && option.count !== undefined && (
                  <CountBadge>{option.count}</CountBadge>
                )}
              </CheckboxLabel>
            ))}
          </OptionGroup>
        </div>
      );
      
    case 'radio':
      return (
        <div>
          {label && <FilterLabel>{label}</FilterLabel>}
          <OptionGroup>
            {options.map(option => (
              <CheckboxLabel 
                key={option.value} 
                disabled={option.disabled}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => handleRadioChange(option.value)}
                  disabled={option.disabled}
                />
                {option.label}
                {showCounts && option.count !== undefined && (
                  <CountBadge>{option.count}</CountBadge>
                )}
              </CheckboxLabel>
            ))}
          </OptionGroup>
        </div>
      );
      
    case 'range':
      return (
        <div>
          {label && <FilterLabel>{label}</FilterLabel>}
          <RangeContainer>
            <input
              type="range"
              name={name}
              min={min}
              max={max}
              step={step}
              value={value || min}
              onChange={handleRangeChange}
              style={{ width: '100%' }}
            />
            <RangeLabels>
              <span>{min}</span>
              <span>{value || min}</span>
              <span>{max}</span>
            </RangeLabels>
          </RangeContainer>
        </div>
      );
      
    case 'select':
    default:
      return (
        <Input
          label={label}
          id={name}
          name={name}
          type="select"
          value={value}
          onChange={onChange}
          options={options}
        />
      );
  }
};

FilterControl.propTypes = {
  type: PropTypes.oneOf(['select', 'checkbox', 'radio', 'range']),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      count: PropTypes.number
    })
  ),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  showCounts: PropTypes.bool,
  multiple: PropTypes.bool,
  displayAs: PropTypes.oneOf(['default', 'chip'])
};

export default FilterControl;