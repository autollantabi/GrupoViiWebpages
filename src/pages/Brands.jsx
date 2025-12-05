import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Text from "../components/ui/Text";
import Button from "../components/ui/Button";
import { useEmpresa } from "../hooks/useEmpresa";
import SEO from "../components/seo/SEO";

const BrandsPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BrandsHero = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  text-align: center;
  position: relative;
`;

const CategorySection = styled.section`
  padding: ${({ theme, $alternate }) =>
    $alternate
      ? `${theme.spacing.xxl} ${theme.spacing.xl}`
      : `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme, $alternate }) =>
    $alternate ? theme.colors.lightGray : theme.colors.lightGray};
  position: relative;
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BrandCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const BrandContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const BrandName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }
`;

const CategoryChip = styled.span`
  display: inline-block;
  background: ${({ theme, $category }) =>
    $category === "Vehiculos" ? theme.colors.primary : theme.colors.secondary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 2px 4px;
  align-self: center;
`;

const CategoryChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: 4px;
`;

const BrandDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex-grow: 1;
  line-height: 1.5;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BrandFeatures = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  list-style: none;
  padding: 0;
  text-align: left;
`;

const BrandFeature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;

  &:before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-weight: bold;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  text-align: center;
`;

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Componente para títulos con palabras destacadas
const HighlightedTitle = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;

  h2 {
    display: inline;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: 700;
    margin: 0;
    position: relative;
  }

  .highlight {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 0.5rem;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 3px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 2px;
    }
  }
`;

const CategoryDescription = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.xl} !important;
  line-height: 1.6;
`;

const BrandType = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Brands = () => {
  const { config } = useEmpresa();
  const navigate = useNavigate();

  // Función para navegar al catálogo con la línea y marca seleccionadas
  const handleVerProductos = (linea, marcaNombre) => {
    if (linea) {
      // Convertir el nombre de la línea a slug (ej: "LLANTAS" -> "llantas", "LLANTAS MOTO" -> "llantas-moto")
      const lineaSlug = linea.toLowerCase().replace(/\s+/g, "-");

      // Construir la URL con línea y marca
      const params = new URLSearchParams({
        linea: lineaSlug,
        page: "1",
        sort: "destacados",
        perPage: "192",
      });

      // Agregar el filtro de marca si existe
      if (marcaNombre) {
        params.set("DMA_MARCA", marcaNombre.toUpperCase());
      }

      navigate(`/catalogo?${params.toString()}`);
    } else {
      navigate("/catalogo");
    }
  };

  return (
    <BrandsPageContainer>
      <SEO
        title="Marcas"
        description="Conoce las mejores marcas de llantas, lubricantes y herramientas que representamos. Calidad, confianza y rendimiento garantizado."
        keywords="marcas llantas, marcas lubricantes, marcas herramientas, calidad, confianza"
      />
      <BrandsHero>
        <Text variant="h1" size="xxxl">
          {config.textos.pageMarcas.titulo}
        </Text>
        <Text
          variant="p"
          size="lg"
          color="gray"
          align="center"
          maxWidth="800px"
          style={{ margin: "0 auto", lineHeight: "1.6" }}
        >
          {config.textos.pageMarcas.subtitulo}
        </Text>
      </BrandsHero>

      {config.textos.pageMarcas.lineas.map((linea) => (
        <>
          <CategorySection $alternate>
            <HighlightedTitle>
              <h2>{linea.titulo_destacado}</h2>
              <h2 className="highlight">{linea.titulo_destacado_2}</h2>
            </HighlightedTitle>
            <CategoryDescription
              variant="p"
              align="center"
              color="gray"
              maxWidth="800px"
              style={{ margin: "0 auto" }}
            >
              {linea.descripcion}
            </CategoryDescription>

            <BrandsGrid>
              {config.marcas
                .filter((marca) => marca.linea === linea.linea)
                .map((marca) => (
                  <BrandCard
                    key={marca.nombre}
                    images={[marca.logo]}
                    imageAlt={`Logo de ${marca.nombre}`}
                    elevated
                    zoomImage
                    imageHeight="200px"
                    imagePadding="40px"
                    objectFit="contain"
                  >
                    <BrandContent>
                      <BrandName>{marca.nombre}</BrandName>
                      <BrandDescription>
                        {marca.descripcion_larga}
                      </BrandDescription>

                      <BrandFeatures>
                        {marca.features?.map((feature, index) => (
                          <BrandFeature key={index}>{feature}</BrandFeature>
                        ))}
                      </BrandFeatures>
                      <ButtonContainer>
                        <StyledButton
                          onClick={() =>
                            handleVerProductos(linea.linea, marca.nombre)
                          }
                          size="sm"
                        >
                          Ver productos
                        </StyledButton>
                      </ButtonContainer>
                    </BrandContent>
                  </BrandCard>
                ))}
            </BrandsGrid>
          </CategorySection>
        </>
      ))}
    </BrandsPageContainer>
  );
};

export default Brands;
