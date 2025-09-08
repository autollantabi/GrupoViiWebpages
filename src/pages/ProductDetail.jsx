import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Text from "../components/ui/Text";
import Icon from "../components/ui/Icon";
import Link from "../components/ui/Link";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import { useProducts } from "../api";
import Card from "../components/ui/Card";

/**
 * Genera descripción del producto basada en sus características
 * @param {Object} product - Producto a describir
 * @returns {string} Descripción generada
 */
const generateDescription = (product) => {
  if (!product) return "";

  if (product.DMA_LINEANEGOCIO === "LUBRICANTES") {
    const parts = [];
    if (product.DMA_CLASE) parts.push(product.DMA_CLASE);
    if (product.DMA_CLASIFICACION) parts.push(product.DMA_CLASIFICACION);
    if (product.DMA_TIPO) parts.push(product.DMA_TIPO);
    if (product.DMA_MODELO) parts.push(product.DMA_MODELO);

    if (parts.length > 0) {
      return parts.join(" • ");
    }
  }

  if (product.DMA_RIN || product.DMA_SERIE || product.DMA_ANCHO) {
    const parts = [];
    if (product.DMA_RIN) parts.push(`Rin ${product.DMA_RIN}`);
    if (product.DMA_ANCHO) parts.push(`Ancho ${product.DMA_ANCHO}`);
    if (product.DMA_SERIE) parts.push(`Alto ${product.DMA_SERIE}`);

    if (parts.length > 0) {
      return parts.join(" • ");
    }
  }

  if (product.DMA_MARCA && product.DMA_MODELO) {
    return `${product.DMA_MARCA} ${product.DMA_MODELO}`;
  }

  if (product.DMA_MARCA) {
    return product.DMA_MARCA;
  }

  return "";
};

/**
 * Construye la URL completa de la imagen del producto
 * @param {Object} product - Producto
 * @returns {string|null} URL de la imagen o null si no existe
 */
const getProductImage = (product) => {
  if (!product) return null;

  if (product.DMA_RUTAIMAGEN && typeof product.DMA_RUTAIMAGEN === "string") {
    const baseUrl = import.meta.env.VITE_API_IMAGES_URL || "";
    return baseUrl + product.DMA_RUTAIMAGEN;
  }

  return null;
};

/**
 * Verifica si un producto tiene imagen válida
 * @param {Object} product - Producto a verificar
 * @returns {boolean} true si tiene imagen válida
 */
const hasProductImage = (product) => {
  return (
    product &&
    product.DMA_RUTAIMAGEN &&
    typeof product.DMA_RUTAIMAGEN === "string" &&
    product.DMA_RUTAIMAGEN.trim() !== ""
  );
};

const ProductDetailContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Breadcrumbs = styled.ol`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;

  &:not(:last-child):after {
    content: "/";
    margin: 0 ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }

  &:last-child {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const ProductImages = styled.div`
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 500px;
  }
`;

const MainImage = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  background: white;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const RelatedProducts = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProductCardImage = styled.div`
  width: 100%;
  height: 180px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  .placeholder-icon {
    font-size: 48px;
    color: #ccc;
  }
`;

const ProductBrand = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  width: max-content;
  display: inline-block;
  margin-bottom: 8px;
`;

const SpecificationsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SpecificationItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const SpecName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SpecValue = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

// Función para renderizar texto con saltos de línea
const renderTextWithLineBreaks = (text) => {
  if (!text) return null;
  
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </span>
  ));
};

/**
 * Componente de detalle del producto
 * Muestra información completa, especificaciones y productos relacionados
 */
const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { products, loading, fetchProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const returnUrl = location.state?.returnUrl || "/catalogo";

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    loadProduct();
  }, [fetchProducts]);

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((p) => p.DMA_ID === id);

      if (foundProduct) {
        setProduct(foundProduct);

        let related = [];

        // Filtrar productos de la misma línea de negocio
        const sameLineProducts = products.filter(
          (p) =>
            p.DMA_ID !== foundProduct.DMA_ID &&
            p.DMA_LINEANEGOCIO === foundProduct.DMA_LINEANEGOCIO
        );

        // Lógica específica por tipo de producto
        if (foundProduct.DMA_LINEANEGOCIO === "LLANTAS" && foundProduct.DMA_RIN) {
          // Para llantas, buscar por mismo rin
          related = sameLineProducts
            .filter((p) => p.DMA_RIN === foundProduct.DMA_RIN)
            .slice(0, 3);
        } else if (foundProduct.DMA_LINEANEGOCIO === "LUBRICANTES" && foundProduct.DMA_CLASE) {
          // Para lubricantes, buscar por misma clase
          related = sameLineProducts
            .filter((p) => p.DMA_CLASE === foundProduct.DMA_CLASE)
            .slice(0, 3);
        } else if (foundProduct.DMA_LINEANEGOCIO === "HERRAMIENTAS" && foundProduct.DMA_GRUPO) {
          // Para herramientas, buscar por mismo grupo
          related = sameLineProducts
            .filter((p) => p.DMA_GRUPO === foundProduct.DMA_GRUPO)
            .slice(0, 3);
        }

        // Si no se encontraron productos específicos, tomar cualquier producto de la misma línea
        if (related.length === 0) {
          related = sameLineProducts.slice(0, 3);
        }

        setRelatedProducts(related);
      } else {
        setProduct(null);
        setRelatedProducts([]);
      }
    }
  }, [products, id]);

  const renderSpecifications = () => {
    if (!product) return null;

    // Función auxiliar para renderizar un campo de especificación
    const renderSpecField = (name, value) => {
      if (!value || value === "" || value === null || value === undefined) return null;
      return (
        <SpecificationItem key={name}>
          <SpecName>{name}:</SpecName>
          <SpecValue>{value}</SpecValue>
        </SpecificationItem>
      );
    };

    // Función auxiliar para renderizar un campo de especificación con texto multilínea
    const renderSpecFieldMultiline = (name, value) => {
      if (!value || value === "" || value === null || value === undefined) return null;
      return (
        <SpecificationItem key={name}>
          <SpecName>{name}</SpecName>
          <SpecValue>{renderTextWithLineBreaks(value)}</SpecValue>
        </SpecificationItem>
      );
    };

    // Obtener todas las especificaciones disponibles
    const specifications = [];

    if (product.DMA_LINEANEGOCIO === "LLANTAS") {
      specifications.push(
        renderSpecField("Rin", product.DMA_RIN),
        renderSpecField("Ancho", product.DMA_ANCHO),
        renderSpecField("Altura", product.DMA_SERIE),
        renderSpecField("Categoría", product.DMA_CATEGORIA),
        renderSpecField("Aplicación", product.DMA_APLICACION),
        renderSpecField("Eje", product.DMA_EJE),
        renderSpecField("Marca", product.DMA_MARCA),
        renderSpecField("Modelo", product.DMA_MODELO)
      );
    } else if (product.DMA_LINEANEGOCIO === "LUBRICANTES") {
      specifications.push(
        renderSpecField("Clase", product.DMA_CLASE),
        renderSpecField("Clasificación", product.DMA_CLASIFICACION),
        renderSpecField("Tipo", product.DMA_TIPO),
        renderSpecField("Modelo", product.DMA_MODELO),
        renderSpecField("Marca", product.DMA_MARCA),
        renderSpecField("Grupo", product.DMA_GRUPO),
        renderSpecField("Subgrupo", product.DMA_SUBGRUPO)
      );
    } else if (product.DMA_LINEANEGOCIO === "HERRAMIENTAS") {
      specifications.push(
        renderSpecField("Grupo", product.DMA_GRUPO),
        renderSpecField("Subgrupo", product.DMA_SUBGRUPO),
        renderSpecField("Marca", product.DMA_MARCA),
        renderSpecField("Modelo", product.DMA_MODELO),
        renderSpecField("Tipo", product.DMA_TIPO),
        renderSpecFieldMultiline("", product.DMA_CARACTERISTICASESP)
      );
    }

    // Filtrar especificaciones nulas
    const validSpecifications = specifications.filter(Boolean);

    // Si no hay especificaciones, no mostrar la sección
    if (validSpecifications.length === 0) return null;

    return (
      <>
        <Text
          variant="h3"
          style={{
            marginBottom: "20px",
            fontSize: "20px",
            fontWeight: "600",
            color: "#333",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "8px",
          }}
        >
          Especificaciones
        </Text>
        <SpecificationsList>
          {validSpecifications}
        </SpecificationsList>
      </>
    );
  };

  if (loading) {
    return (
      <ProductDetailContainer>
        <Loader type="spinner" text="Cargando detalles del producto..." />
      </ProductDetailContainer>
    );
  }

  if (!product) {
    return (
      <ProductDetailContainer>
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <Text variant="h2">Producto no encontrado</Text>
          <Text variant="p" color="gray" style={{ marginTop: "16px" }}>
            El producto que buscas no existe o ha sido removido.
          </Text>
          <Link
            to={returnUrl}
            style={{ marginTop: "24px", display: "inline-block" }}
          >
            <Button variant="primary">Volver al catálogo</Button>
          </Link>
        </div>
      </ProductDetailContainer>
    );
  }

  const URL_MAYORISTA = import.meta.env.VITE_MAYORISTA_URL;

  return (
    <ProductDetailContainer>
      <BreadcrumbNav>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">Inicio</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={returnUrl}>Catálogo</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={returnUrl}>
              {product.DMA_LINEANEGOCIO === "LUBRICANTES"
                ? "Lubricantes"
                : product.DMA_LINEANEGOCIO === "LLANTAS"
                  ? "Neumáticos"
                  : "Herramientas"}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            {product.DMA_NOMBREITEM || "Sin nombre"}
          </BreadcrumbItem>
        </Breadcrumbs>
      </BreadcrumbNav>

      <ProductContent>
        <ProductImages>
          <MainImage>
            {hasProductImage(product) ? (
              <img
                src={getProductImage(product)}
                alt={product.DMA_NOMBREITEM || "Producto"}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              style={{
                display: hasProductImage(product) ? "none" : "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                background: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Icon name="image" size="xl" color="#666" />
            </div>
          </MainImage>
        </ProductImages>

        <ProductInfo>
          <div style={{ marginBottom: "24px" }}>
          
            <Text
              variant="h2"
              noMargin
              style={{
                fontSize: "28px",
                fontWeight: "600",
                marginBottom: "16px",
                lineHeight: "1.3",
              }}
            >
              {product.DMA_NOMBREITEM || "Sin nombre"}
            </Text>

            <ProductDescription>
              <Text
                variant="p"
                color="gray"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.6",
                  marginBottom: "0",
                }}
              >
                {generateDescription(product) || "Sin descripción disponible"}
              </Text>
            </ProductDescription>
            <ButtonContainer>
              <Button
                as="a"
                href={URL_MAYORISTA}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                style={{
                  padding: "16px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                Da click aquí para adquirir este producto
                <Icon name="store" style={{ marginRight: "12px" }} />
              </Button>
            </ButtonContainer>
          </div>

          {renderSpecifications()}
        </ProductInfo>
      </ProductContent>

      {relatedProducts.length > 0 && (
        <RelatedProducts>
          <Text
            variant="h2"
            align="center"
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "32px",
              color: "#333",
              borderBottom: "2px solid #e0e0e0",
              paddingBottom: "12px",
            }}
          >
            Productos relacionados
          </Text>

          <RelatedGrid>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.DMA_ID}
                onClick={() =>
                  (window.location.href = `/catalogo/${relatedProduct.DMA_ID}`)
                }
              >
                <ProductCardImage>
                  {hasProductImage(relatedProduct) ? (
                    <img
                      src={getProductImage(relatedProduct)}
                      alt={relatedProduct.DMA_NOMBREITEM || "Producto"}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      display: hasProductImage(relatedProduct)
                        ? "none"
                        : "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      background: "#f5f5f5",
                    }}
                  >
                    <Text variant="p" color="gray">
                      Imagen no disponible
                    </Text>
                    {/* <Icon name="image" className="placeholder-icon" /> */}
                  </div>
                </ProductCardImage>

                <div
                  style={{
                    padding: "16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <ProductBrand>
                    {relatedProduct.DMA_MARCA
                      ? relatedProduct.DMA_MARCA.charAt(0).toUpperCase() +
                        relatedProduct.DMA_MARCA.slice(1)
                      : "Sin marca"}
                  </ProductBrand>

                  <Text
                    variant="h3"
                    noMargin
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      lineHeight: "1.3",
                      color: "#333",
                    }}
                  >
                    {relatedProduct.DMA_NOMBREITEM || "Sin nombre"}
                  </Text>

                  <Text
                    variant="p"
                    color="gray"
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.4",
                      marginBottom: "0",
                      flex: 1,
                    }}
                  >
                    {generateDescription(relatedProduct) || "Sin descripción"}
                  </Text>
                </div>
              </ProductCard>
            ))}
          </RelatedGrid>
        </RelatedProducts>
      )}
    </ProductDetailContainer>
  );
};

export default ProductDetail;
