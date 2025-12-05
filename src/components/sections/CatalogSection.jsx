import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Text from "../ui/Text";
import Icon from "../ui/Icon";
import { useProducts } from "../../api";
import { useEmpresa } from "../../hooks/useEmpresa";

const CatalogSectionContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme, $alternate }) =>
    $alternate ? theme.colors.lightGray : theme.colors.lightGray};
  position: relative;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ProductCardWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductCardImageContainer = styled.div`
  width: 100%;
  height: 240px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const ProductCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const ProductCardImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  color: #666;
`;

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductBrand = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
`;

const ProductName = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    line-height: 1.3;
  }
`;

const ProductDescription = styled.div`
  flex: 1;

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.6;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const CatalogSection = ({ featured = false, alternate = false }) => {
  const { products, loading, fetchProducts } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { config } = useEmpresa();

  const navigate = useNavigate();

  // Función para generar descripción del producto
  const generateProductDescription = (product) => {
    if (!product) return "";

    // Para lubricantes
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

    // Para llantas
    if (product.DMA_RIN || product.DMA_SERIE || product.DMA_ANCHO) {
      const parts = [];
      if (product.DMA_RIN) parts.push(`Rin ${product.DMA_RIN}`);
      if (product.DMA_ANCHO) parts.push(`Ancho ${product.DMA_ANCHO}`);
      if (product.DMA_SERIE) parts.push(`Alto/Serie ${product.DMA_SERIE}`);

      if (parts.length > 0) {
        return parts.join(" • ");
      }
    }

    // Fallback: usar marca y modelo
    if (product.DMA_MARCA && product.DMA_MODELO) {
      return `${product.DMA_MARCA} ${product.DMA_MODELO}`;
    }

    // Último fallback: usar marca
    if (product.DMA_MARCA) {
      return product.DMA_MARCA;
    }

    return "";
  };

  // Función para manejar imagen del producto
  const getProductImage = (product) => {
    if (!product) return null;

    // Si tiene imagen, retornar la URL completa
    if (product.DMA_RUTAIMAGEN && typeof product.DMA_RUTAIMAGEN === "string") {
      const baseUrl = import.meta.env.VITE_API_IMAGES_URL || "";
      return baseUrl + product.DMA_RUTAIMAGEN;
    }

    // Si no tiene imagen, retornar null
    return null;
  };

  // Función para verificar si un producto tiene imagen
  const hasProductImage = (product) => {
    return (
      product &&
      product.DMA_RUTAIMAGEN &&
      typeof product.DMA_RUTAIMAGEN === "string" &&
      product.DMA_RUTAIMAGEN.trim() !== ""
    );
  };

  // Función para seleccionar productos al azar con prioridad por línea de negocio
  const selectRandomProducts = (allProducts) => {
    if (!allProducts || allProducts.length === 0) return [];

    // Separar productos por línea de negocio
    const llantas = allProducts.filter(
      (product) => product.DMA_LINEANEGOCIO === "LLANTAS"
    );
    const llantasMoto = allProducts.filter(
      (product) => product.DMA_LINEANEGOCIO === "LLANTAS MOTO"
    );
    const lubricantes = allProducts.filter(
      (product) => product.DMA_LINEANEGOCIO === "LUBRICANTES"
    );
    const herramientas = allProducts.filter(
      (product) => product.DMA_LINEANEGOCIO === "HERRAMIENTAS"
    );

    let selectedProducts = [];

    // Intentar seleccionar productos de las líneas disponibles
    const availableLines = [];
    if (llantas.length > 0)
      availableLines.push({ products: llantas, name: "llantas" });
    if (llantasMoto.length > 0)
      availableLines.push({ products: llantasMoto, name: "llantas moto" });
    if (lubricantes.length > 0)
      availableLines.push({ products: lubricantes, name: "lubricantes" });
    if (herramientas.length > 0)
      availableLines.push({ products: herramientas, name: "herramientas" });

    if (availableLines.length === 0) return [];

    // Si hay múltiples líneas, seleccionar de cada una
    if (availableLines.length > 1) {
      // Distribuir productos de manera más flexible para llegar a 4
      const baseProductsPerLine = Math.floor(4 / availableLines.length);
      const extraProducts = 4 % availableLines.length;

      availableLines.forEach((line, index) => {
        let productsToTake = baseProductsPerLine;

        // Dar productos extra a las primeras líneas
        if (index < extraProducts) {
          productsToTake += 1;
        }

        const randomProducts = line.products
          .sort(() => Math.random() - 0.5)
          .slice(0, productsToTake);
        selectedProducts = [...selectedProducts, ...randomProducts];
      });

      // Si aún no tenemos 4 productos, completar con productos aleatorios
      if (selectedProducts.length < 4) {
        const remaining = 4 - selectedProducts.length;
        const allRemainingProducts = allProducts.filter(
          (product) =>
            !selectedProducts.some(
              (selected) => selected.DMA_ID === product.DMA_ID
            )
        );

        if (allRemainingProducts.length > 0) {
          const extraRandomProducts = allRemainingProducts
            .sort(() => Math.random() - 0.5)
            .slice(0, remaining);
          selectedProducts = [...selectedProducts, ...extraRandomProducts];
        }
      }
    } else {
      // Si solo hay una línea, seleccionar hasta 4 productos
      selectedProducts = availableLines[0].products
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    }

    return selectedProducts;
  };

  // Cargar productos y seleccionar destacados
  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  // Actualizar productos destacados cuando cambien los productos
  useEffect(() => {
    if (products && products.length > 0) {
      const selected = selectRandomProducts(products);
      setFeaturedProducts(selected);
    }
  }, [products]);

  return (
    <CatalogSectionContainer $alternate={alternate}>
      <SectionHeader>
        <SectionTitle>
          {featured
            ? config.textos.catalogo.titulo
            : config.textos.catalogo.titulo}
        </SectionTitle>
        <Text
          variant="p"
          color="gray"
          maxWidth="700px"
          align="center"
          style={{ margin: "0 auto", lineHeight: "1.6" }}
        >
          {config.textos.catalogo.subtitulo}
        </Text>
      </SectionHeader>

      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <Text variant="p" color="gray">
            Cargando productos destacados...
          </Text>
        </div>
      ) : featuredProducts.length > 0 ? (
        <ProductsGrid>
          {featuredProducts.map((product) => (
            <ProductCardWrapper
              key={product.DMA_IDENTIFICADORITEM || product.id}
              onClick={() => {
                if (product && product.DMA_IDENTIFICADORITEM) {
                  // Guardar la URL actual del catálogo antes de navegar al producto
                  const currentCatalogUrl =
                    window.location.pathname + window.location.search;
                  sessionStorage.setItem(
                    "previousCatalogUrl",
                    currentCatalogUrl
                  );

                  // Guardar el ID del producto seleccionado para hacer scroll cuando regreses
                  sessionStorage.setItem(
                    "selectedProductId",
                    product.DMA_IDENTIFICADORITEM
                  );

                  // Codificar el ID para que funcione correctamente en la URL
                  const encodedId = encodeURIComponent(
                    product.DMA_IDENTIFICADORITEM
                  );

                  // Navegar al producto SIN parámetros en la URL
                  navigate(`/producto/${encodedId}`);
                }
              }}
            >
              <ProductCardImageContainer>
                {hasProductImage(product) ? (
                  <ProductCardImage
                    src={getProductImage(product)}
                    alt={product.DMA_NOMBREITEM || "Producto"}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                {/* Placeholder cuando no hay imagen o hay error */}
                <ProductCardImagePlaceholder
                  style={{
                    display: hasProductImage(product) ? "none" : "flex",
                  }}
                >
                  <Icon name="FaImage" size="xl" color="#666" />
                </ProductCardImagePlaceholder>
              </ProductCardImageContainer>

              <ProductContent>
                <ProductBrand>
                  {product.DMA_MARCA
                    ? product.DMA_MARCA.charAt(0).toUpperCase() +
                      product.DMA_MARCA.slice(1)
                    : "Sin marca"}
                </ProductBrand>
                <ProductName>
                  <Text variant="h3" size="lg" noMargin>
                    {product.DMA_NOMBREITEM || "Sin nombre"}
                  </Text>
                </ProductName>
                <ProductDescription>
                  <Text variant="p" color="gray">
                    {generateProductDescription(product) ||
                      "Sin descripción disponible"}
                  </Text>
                </ProductDescription>
              </ProductContent>
            </ProductCardWrapper>
          ))}
        </ProductsGrid>
      ) : (
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <Text variant="p" color="gray">
            No hay productos disponibles para mostrar
          </Text>
        </div>
      )}

      <ButtonContainer>
        <StyledButton
          as={Link}
          to="/catalogo"
          size="lg"
          variant={alternate ? "primary" : "outline"}
        >
          {featured ? "Ver catálogo completo" : "Explorar más productos"}
        </StyledButton>
      </ButtonContainer>
    </CatalogSectionContainer>
  );
};

CatalogSection.propTypes = {
  featured: PropTypes.bool,
  alternate: PropTypes.bool,
};

export default CatalogSection;
