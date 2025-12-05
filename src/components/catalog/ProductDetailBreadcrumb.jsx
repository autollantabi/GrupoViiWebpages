import React from "react";
import styled from "styled-components";
import Icon from "../ui/Icon";
import Text from "../ui/Text";

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
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: flex-start;
  max-width: 1280px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const BreadcrumbItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  transition: color 0.2s ease;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: ${({ $active }) => ($active ? "none" : "underline")};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 ${({ theme }) => theme.spacing.xs};
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline;
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

/**
 * Breadcrumb simplificado para la página de detalle del producto
 * Solo muestra: Línea > Productos > [Nombre del Producto]
 */
const ProductDetailBreadcrumb = ({
  selectedLinea,
  productName,
  availableLines = [],
  onLineaSelect,
  onProductsSelect,
}) => {
  const lineaInfo = availableLines.find((linea) => linea.key === selectedLinea);

  return (
    <BreadcrumbContainer>
      <BreadcrumbContent>
        {/* Línea */}
        {selectedLinea && lineaInfo && (
          <>
            <BreadcrumbItem
              onClick={() => onLineaSelect && onLineaSelect(selectedLinea)}
              $active={false}
            >
              <BreadcrumbIcon>
                <Icon name={lineaInfo.icon || "FaBox"} size="sm" />
              </BreadcrumbIcon>
              <Text variant="span" size="sm" noMargin>
                {lineaInfo.name}
              </Text>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Icon name="FaChevronRight" size="xs" />
            </BreadcrumbSeparator>
          </>
        )}

        {/* Productos */}
        <BreadcrumbItem
          onClick={() => onProductsSelect && onProductsSelect()}
          $active={false}
        >
          <BreadcrumbIcon>
            <Icon name="FaBox" size="sm" />
          </BreadcrumbIcon>
          <Text variant="span" size="sm" noMargin>
            Productos
          </Text>
        </BreadcrumbItem>

        {/* Nombre del producto actual (no clickeable) */}
        {productName && (
          <>
            <BreadcrumbSeparator>
              <Icon name="FaChevronRight" size="xs" />
            </BreadcrumbSeparator>
            <BreadcrumbItem $active={true} disabled>
              <Text variant="span" size="sm" noMargin>
                {productName}
              </Text>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbContent>
    </BreadcrumbContainer>
  );
};

export default ProductDetailBreadcrumb;

