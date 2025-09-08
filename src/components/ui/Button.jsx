import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

// Modificar el ButtonStyles para que sea más coherente con Dropdown

const ButtonStyles = css`
  border-radius: ${({ theme, $rounded }) =>
    $rounded ? theme.borderRadius.full : theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme, size }) =>
    size === "sm"
      ? `${theme.spacing.xs} ${theme.spacing.md}`
      : size === "lg"
      ? `${theme.spacing.md} ${theme.spacing.xl}`
      : `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme, size }) =>
    size === "sm"
      ? theme.fontSizes.sm
      : size === "lg"
      ? theme.fontSizes.lg
      : theme.fontSizes.md};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  min-height: ${({ size }) => size === "sm" ? "36px" : size === "lg" ? "48px" : "42px"}; // Añadir min-height como en Dropdown

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.light};
          border: 1px solid ${theme.colors.primary}; // Cambiar a 1px para coincidir con Dropdown
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); // Añadir sombra sutil como en chips

          &:hover:not(:disabled) {
            background-color: #e13e00; /* Versión más oscura del primary */
            border-color: #e13e00;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Aumentar sombra en hover
          }

          &:active:not(:disabled) {
            background-color: #c43700; // Color aún más oscuro al presionar
            transform: translateY(1px); // Pequeño efecto de presión
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.light};
          border: 1px solid ${theme.colors.secondary}; // Cambiar a 1px
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

          &:hover:not(:disabled) {
            background-color: #072f40;
            border-color: #072f40;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          &:active:not(:disabled) {
            background-color: #04212e;
            transform: translateY(1px);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.gray}; // Cambiar a 1px y color gris como Dropdown

          &:hover:not(:disabled) {
            border-color: ${theme.colors.primary};
            background-color: ${theme.colors.primary}10;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.primary}20;
            transform: translateY(1px);
          }
        `;
      case "text":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: none;
          padding: ${({ theme, size }) =>
            size === "sm"
              ? `${theme.spacing.xs} ${theme.spacing.xs}`
              : size === "lg"
              ? `${theme.spacing.sm} ${theme.spacing.sm}`
              : `${theme.spacing.xs} ${theme.spacing.sm}`};

          &:hover:not(:disabled) {
            color: #e13e00;
            text-decoration: underline;
            background-color: transparent;
          }
          
          &:active:not(:disabled) {
            color: #c43700;
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.light};
          border: 1px solid ${theme.colors.primary}; // Cambiar a 1px
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

          &:hover:not(:disabled) {
            background-color: #e13e00;
            border-color: #e13e00;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          &:active:not(:disabled) {
            background-color: #c43700;
            transform: translateY(1px);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => props.$mobileOnly && `
    display: none;
    @media (max-width: ${props.theme.breakpoints.md}) {
      display: inline-flex;
    }
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

const StyledLink = styled.a`
  ${ButtonStyles}
  text-decoration: none;
`;

// Nuevo componente StyledRouterLink para trabajar con react-router-dom
const StyledRouterLink = styled(RouterLink)`
  ${ButtonStyles}
  text-decoration: none;
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  as,
  href,
  fullWidth = false,
  mobileOnly = false,
  to, // Nueva prop para enlaces de react-router-dom
  ...props
}) => {
  // Si hay un 'to', usamos RouterLink
  if (to) {
    return (
      <StyledRouterLink
        to={to}
        $variant={variant}
        size={size}
        $rounded={rounded}
        $fullWidth={fullWidth}
        $mobileOnly={mobileOnly}
        {...props}
      >
        {children}
      </StyledRouterLink>
    );
  }

  // Si hay un 'as=a' o 'href', usamos un enlace normal
  if (as === "a" || href) {
    return (
      <StyledLink
        href={href || "#"}
        $variant={variant}
        size={size}
        $rounded={rounded}
        $mobileOnly={mobileOnly}
        {...props}
      >
        {children}
      </StyledLink>
    );
  }

  // Por defecto, usamos un botón
  return (
    <StyledButton
      $variant={variant}
      size={size}
      $rounded={rounded}
      $mobileOnly={mobileOnly}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "text"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  rounded: PropTypes.bool,
  as: PropTypes.string,
  href: PropTypes.string,
  fullWidth: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Actualizar propTypes
};

export default Button;
