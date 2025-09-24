import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from './Icon';

const DropdownContainer = styled.div`
  position: relative;
  width: ${({ width }) => width || 'auto'};
  font-family: ${({ theme }) => theme.fonts.body};
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme, $isOpen }) => 
    $isOpen ? theme.colors.primary : theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  min-height: 42px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownSelectedValue = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
  color: ${({ $placeholder, theme }) => 
    $placeholder ? theme.colors.text.disabled : theme.colors.text.primary};
`;

const ValueChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 2px ${({ theme }) => theme.spacing.sm};
  margin-right: 4px;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const RemoveChip = styled.span`
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const DropdownIcon = styled.div`
  margin-left: ${({ theme }) => theme.spacing.sm};
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: all 0.2s ease;
`;

const DropdownItem = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  
  background-color: ${({ theme, $selected }) => 
    $selected ? `${theme.colors.primary}10` : 'transparent'};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.gray}30`};
  }
`;

const Label = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CheckIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const Dropdown = ({
  options = [],
  value = '',
  onChange,
  multiple = false,
  placeholder = 'Seleccionar...',
  label,
  name,
  width,
  maxDisplayItems = 3
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOptions = multiple 
    ? options.filter(option => 
        Array.isArray(value) && value.includes(option.value)
      )
    : options.filter(option => option.value === value);
  
  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleOptionClick = (option) => {
    // Lógica para selección múltiple
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      
      if (newValue.includes(option.value)) {
        // Si ya está seleccionado, lo quitamos
        const index = newValue.indexOf(option.value);
        newValue.splice(index, 1);
      } else {
        // Si no está seleccionado, lo añadimos
        newValue.push(option.value);
      }
      
      onChange({ target: { name, value: newValue } });
    } 
    // Lógica para selección única
    else {
      onChange({ target: { name, value: option.value } });
      setIsOpen(false);
    }
  };
  
  const removeOption = (optionValue, e) => {
    e.stopPropagation(); // Evitar que se abra el dropdown
    
    if (multiple && Array.isArray(value)) {
      const newValue = value.filter(v => v !== optionValue);
      onChange({ target: { name, value: newValue } });
    } else {
      onChange({ target: { name, value: '' } });
    }
  };
  
  return (
    <DropdownContainer ref={dropdownRef} width={width}>
      {label && <Label>{label}</Label>}
      
      <DropdownHeader onClick={toggleDropdown} $isOpen={isOpen}>
        <DropdownSelectedValue $placeholder={selectedOptions.length === 0}>
          {selectedOptions.length === 0 ? (
            placeholder
          ) : multiple ? (
            <>
              {selectedOptions.slice(0, maxDisplayItems).map(option => (
                <ValueChip key={option.value}>
                  {option.label}
                  <RemoveChip onClick={(e) => removeOption(option.value, e)}>
                    <Icon name="FaTimes" size="xs" />
                  </RemoveChip>
                </ValueChip>
              ))}
              {selectedOptions.length > maxDisplayItems && (
                <ValueChip>+{selectedOptions.length - maxDisplayItems}</ValueChip>
              )}
            </>
          ) : (
            selectedOptions[0]?.label
          )}
        </DropdownSelectedValue>
        <DropdownIcon $isOpen={isOpen}>
          <Icon name="FaChevronDown" size="sm" />
        </DropdownIcon>
      </DropdownHeader>
      
      <DropdownMenu $isOpen={isOpen}>
        {options.map(option => (
          <DropdownItem
            key={option.value}
            $selected={multiple 
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value
            }
            onClick={() => handleOptionClick(option)}
          >
            <div>{option.label}</div>
            {(multiple 
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value
            ) && (
              <CheckIcon>
                <Icon name="FaCheck" size="xs" />
              </CheckIcon>
            )}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  maxDisplayItems: PropTypes.number
};

export default Dropdown;