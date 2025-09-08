import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const baseTextStyles = css`
  margin: 0;
  color: ${({ theme, color }) =>
    color === "primary"
      ? theme.colors.primary
      : color === "secondary"
      ? theme.colors.secondary
      : color === "light"
      ? theme.colors.light
      : color === "gray"
      ? theme.colors.text.secondary
      : theme.colors.text.primary};
  font-weight: ${({ $weight }) => $weight || "normal"};
  text-align: ${({ $align }) => $align || "inherit"};
  margin-bottom: ${({ theme, $noMargin }) =>
    $noMargin ? "0" : theme.spacing.md};
  line-height: ${({ lineHeight }) => lineHeight || "1.5"};
  text-transform: ${({ transform }) => transform || "none"};
  letter-spacing: ${({ spacing }) => spacing || "normal"};
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.md};
  max-width: ${({ $maxWidth }) => $maxWidth || "none"};
`;

const StyledHeading1 = styled.h1`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xxxl};
  font-weight: ${({ $weight }) => $weight || "bold"};
  line-height: 1.2;
  margin-bottom: ${({ theme, $noMargin }) =>
    $noMargin ? "0" : theme.spacing.lg};
`;

const StyledHeading2 = styled.h2`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xxl};
  font-weight: ${({ $weight }) => $weight || "bold"};
  line-height: 1.2;
  margin-bottom: ${({ theme, $noMargin }) =>
    $noMargin ? "0" : theme.spacing.lg};
`;

const StyledHeading3 = styled.h3`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.xl};
  font-weight: ${({ $weight }) => $weight || "600"};
  line-height: 1.3;
`;

const StyledHeading4 = styled.h4`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.lg};
  font-weight: ${({ $weight }) => $weight || "600"};
`;

const StyledHeading5 = styled.h5`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.md};
  font-weight: ${({ $weight }) => $weight || "600"};
`;

const StyledHeading6 = styled.h6`
  ${baseTextStyles}
  font-size: ${({ theme, size }) =>
    size ? theme.fontSizes[size] : theme.fontSizes.sm};
  font-weight: ${({ $weight }) => $weight || "600"};
`;

const StyledParagraph = styled.p`
  ${baseTextStyles}
`;

const StyledSpan = styled.span`
  ${baseTextStyles}
  margin-bottom: 0;
`;

const StyledLabel = styled.label`
  ${baseTextStyles}
  display: block;
  font-weight: ${({ $weight }) => $weight || "500"};
  margin-bottom: ${({ theme, $noMargin }) =>
    $noMargin ? "0" : theme.spacing.xs};
`;

const Text = ({
  variant = "p",
  size,
  color,
  weight,
  align,
  transform,
  spacing,
  lineHeight,
  noMargin,
  children,
  className,
  maxWidth,
  ...props
}) => {
  const textProps = {
    size,
    color,
    $weight:weight,
    $align: align,
    transform,
    spacing,
    lineHeight,
    $noMargin:noMargin,
    $maxWidth: maxWidth,
    className,
    ...props,
  };

  switch (variant) {
    case "h1":
      return <StyledHeading1 {...textProps}>{children}</StyledHeading1>;
    case "h2":
      return <StyledHeading2 {...textProps}>{children}</StyledHeading2>;
    case "h3":
      return <StyledHeading3 {...textProps}>{children}</StyledHeading3>;
    case "h4":
      return <StyledHeading4 {...textProps}>{children}</StyledHeading4>;
    case "h5":
      return <StyledHeading5 {...textProps}>{children}</StyledHeading5>;
    case "h6":
      return <StyledHeading6 {...textProps}>{children}</StyledHeading6>;
    case "label":
      return <StyledLabel {...textProps}>{children}</StyledLabel>;
    case "span":
      return <StyledSpan {...textProps}>{children}</StyledSpan>;
    default:
      return <StyledParagraph {...textProps}>{children}</StyledParagraph>;
  }
};

Text.propTypes = {
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "label",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"]),
  color: PropTypes.oneOf(["primary", "secondary", "light", "dark", "gray"]),
  weight: PropTypes.oneOf(["normal", "500", "600", "bold"]),
  align: PropTypes.oneOf(["left", "center", "right", "justify"]),
  transform: PropTypes.oneOf(["uppercase", "lowercase", "capitalize", "none"]),
  spacing: PropTypes.string,
  lineHeight: PropTypes.string,
  noMargin: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default Text;
