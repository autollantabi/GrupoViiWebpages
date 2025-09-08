import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme, $noMargin }) => $noMargin ? '0' : theme.spacing.md};
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const inputStyles = css`
  width: 100%;
  min-height: 42px; // Igual que el DropdownHeader
  padding: ${({ theme, size }) => 
    size === 'sm' ? `${theme.spacing.xs} ${theme.spacing.md}` :
    size === 'lg' ? `${theme.spacing.md} ${theme.spacing.lg}` :
    `${theme.spacing.sm} ${theme.spacing.md}`
  };
  font-size: ${({ theme, size }) => 
    size === 'sm' ? theme.fontSizes.sm :
    size === 'lg' ? theme.fontSizes.lg :
    theme.fontSizes.sm // Cambiado a 'sm' para coincidir con Dropdown
  };
  border: 1px solid ${({ theme, $hasError, $isFocused }) => 
    $hasError ? theme.colors.primary :
    $isFocused ? theme.colors.primary :
    theme.colors.gray
  };
  border-radius: ${({ theme }) => theme.borderRadius.md}; // Cambiado a 'md' para coincidir con Dropdown
  background-color: ${({ theme, disabled }) => disabled ? theme.colors.lightGray : theme.colors.light};
  transition: all 0.2s ease; // Misma transición que en Dropdown
  outline: none;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ $isFocused }) => $isFocused ? `0 4px 12px rgba(0, 0, 0, 0.05)` : 'none'};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary}; // Comportamiento de hover similar al Dropdown
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); // Sombra sutil como en Dropdown
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled}; // Usar el mismo color que el placeholder en Dropdown
  }
`;

const StyledInput = styled.input`
  ${inputStyles}
`;

const StyledTextarea = styled.textarea`
  ${inputStyles}
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
`;

const StyledSelect = styled.select`
  ${inputStyles}
  appearance: none;
  padding-right: ${({ theme }) => theme.spacing.xl};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${({ theme }) => theme.spacing.sm} center;
  background-size: 16px;
  cursor: pointer;
`;

const HelperText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme, $hasError }) => $hasError ? theme.colors.primary : theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => $position === 'left' ? `left: 12px;` : `right: 12px;`}
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ $clickable }) => $clickable ? 'auto' : 'none'};
  cursor: ${({ $clickable }) => $clickable ? 'pointer' : 'default'};
  color: ${({ theme }) => theme.colors.text.secondary};
  z-index: 2; // Asegurar que esté encima del input
  
  &:hover {
    color: ${({ theme, $clickable }) => $clickable ? theme.colors.primary : theme.colors.text.secondary};
  }
`;

// Añadir estos componentes a Input.jsx para manejar inputs tipo chip/tag

// Para inputs con tags/chips (como el searchable con tags)
const InputTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
`;

const InputTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 2px ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin: 2px;
`;

const RemoveTag = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const Input = ({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  size = 'md',
  error,
  helperText,
  required,
  disabled,
  readOnly,
  multiline,
  rows = 4,
  options,
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  noMargin = false,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const renderInputElement = () => {
    const inputProps = {
      id: inputId,
      name,
      value,
      onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      placeholder,
      disabled,
      readOnly,
      size,
      $hasError: !!error,
      $isFocused: isFocused,
      required,
      ...props
    };

    // Añadir padding izquierdo/derecho si hay iconos
    if (leftIcon) {
      inputProps.style = { ...inputProps.style, paddingLeft: '2.75rem' }; // Ligeramente mayor para alinearse mejor
    }
    if (rightIcon) {
      inputProps.style = { ...inputProps.style, paddingRight: '2.75rem' }; // Ligeramente mayor para alinearse mejor
    }

    if (multiline) {
      return <StyledTextarea rows={rows} {...inputProps} />;
    }

    if (type === 'select') {
      return (
        <StyledSelect {...inputProps}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      );
    }

    return <StyledInput type={type} {...inputProps} />;
  };

  return (
    <InputContainer $noMargin={noMargin} className={className}>
      {label && (
        <InputLabel htmlFor={inputId} size={size}>
          {label}
          {required && <RequiredMark>*</RequiredMark>}
        </InputLabel>
      )}
      <InputWrapper>
        {leftIcon && (
          <IconWrapper 
            $position="left" 
            $clickable={!!onLeftIconClick}
            onClick={onLeftIconClick}
            data-testid={`${inputId}-left-icon`}
          >
            {leftIcon}
          </IconWrapper>
        )}
        {renderInputElement()}
        {rightIcon && (
          <IconWrapper 
            $position="right" 
            $clickable={!!onRightIconClick}
            onClick={onRightIconClick}
            data-testid={`${inputId}-right-icon`}
          >
            {rightIcon}
          </IconWrapper>
        )}
      </InputWrapper>
      {(helperText || error) && (
        <HelperText $hasError={!!error}>
          {error || helperText}
        </HelperText>
      )}
    </InputContainer>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'search', 'url', 'date', 'time', 'datetime-local', 'select']),
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onLeftIconClick: PropTypes.func,
  onRightIconClick: PropTypes.func,
  noMargin: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;