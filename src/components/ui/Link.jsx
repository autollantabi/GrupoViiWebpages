import { Link as RouterLink } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const linkStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
  font-weight: ${({ weight }) => weight || "normal"};
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: ${({ theme, size }) =>
    size === "sm"
      ? theme.fontSizes.sm
      : size === "lg"
      ? theme.fontSizes.lg
      : theme.fontSizes.md};

  ${({ $variant, theme }) => {
    switch ($variant) {
      case "button":
        return css`
          padding: ${({ theme, size }) =>
            size === "sm"
              ? `${theme.spacing.xs} ${theme.spacing.md}`
              : size === "lg"
              ? `${theme.spacing.md} ${theme.spacing.lg}`
              : `${theme.spacing.sm} ${theme.spacing.md}`};
          background-color: ${theme.colors.primary};
          color: ${theme.colors.light};
          border-radius: ${theme.borderRadius.md};
          text-align: center;

          &:hover {
            background-color: #e13e00;
            transform: translateY(-2px);
          }
        `;
      case "outline":
        return css`
          padding: ${({ theme, size }) =>
            size === "sm"
              ? `${theme.spacing.xs} ${theme.spacing.md}`
              : size === "lg"
              ? `${theme.spacing.sm} ${theme.spacing.lg}`
              : `${theme.spacing.sm} ${theme.spacing.md}`};
          border: 2px solid ${theme.colors.primary};
          color: ${theme.colors.primary};
          border-radius: ${theme.borderRadius.md};
          text-align: center;

          &:hover {
            background-color: ${theme.colors.primary}10;
          }
        `;
      case "text":
      default:
        return css`
          color: ${({ theme, color }) =>
            color === "primary"
              ? theme.colors.primary
              : color === "secondary"
              ? theme.colors.secondary
              : color === "light"
              ? theme.colors.light
              : color === "gray"
              ? theme.colors.text.secondary
              : theme.colors.primary};

          &:hover {
            color: ${({ theme, color }) =>
              color === "primary"
                ? "#E13E00"
                : color === "secondary"
                ? theme.colors.primary
                : color === "light"
                ? theme.colors.lightGray
                : color === "gray"
                ? theme.colors.primary
                : "#E13E00"};
            text-decoration: ${({ $underline }) =>
              $underline ? "underline" : "none"};
          }
        `;
    }
  }}
`;

const StyledRouterLink = styled(RouterLink)`
  ${linkStyles}
`;

const StyledExternalLink = styled.a`
  ${linkStyles}
`;

const Link = ({
  to,
  href,
  children,
  variant = "text",
  color = "primary",
  size = "md",
  weight,
  underline = false,
  external = false,
  target,
  leftIcon,
  rightIcon,
  onClick,
  className,
  ...props
}) => {
  const linkProps = {
    $variant: variant,
    color,
    size,
    weight,
    $underline: underline,
    className,
    onClick,
    ...props,
  };

  // Si es un enlace externo o se proporciona href en lugar de to
  if (external || href) {
    return (
      <StyledExternalLink
        href={href || to}
        target={target || (external ? "_blank" : undefined)}
        rel={external ? "noopener noreferrer" : undefined}
        {...linkProps}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </StyledExternalLink>
    );
  }

  // Para enlaces internos con react-router
  return (
    <StyledRouterLink to={to} {...linkProps}>
      {leftIcon}
      {children}
      {rightIcon}
    </StyledRouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["text", "button", "outline"]),
  color: PropTypes.oneOf(["primary", "secondary", "light", "dark", "gray"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  weight: PropTypes.oneOf(["normal", "500", "600", "bold"]),
  underline: PropTypes.bool,
  external: PropTypes.bool,
  target: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Link;
