import styled from "styled-components";
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
`;

const BrandFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.light};
    transform: translateX(8px);
  }

  &:before {
    content: "✓";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    transition: color 0.3s ease;
  }

  &:hover:before {
    color: ${({ theme }) => theme.colors.light};
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  text-align: center;
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

  return (
    <BrandsPageContainer>
      <SEO 
        title="Marcas"
        description="Conoce las mejores marcas de neumáticos, lubricantes y herramientas que representamos. Calidad, confianza y rendimiento garantizado."
        keywords="marcas neumáticos, marcas lubricantes, marcas herramientas, calidad, confianza"
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
                      <BrandDescription>{marca.descripcion_larga}</BrandDescription>

                      <BrandFeatures>
                        {marca.features?.map((feature, index) => (
                          <BrandFeature key={index}>{feature}</BrandFeature>
                        ))}
                      </BrandFeatures>
                      <ButtonContainer>
                        <StyledButton
                          to={`/catalogo?linea=${linea.linea.toLowerCase()}&marca=${marca.nombre.toUpperCase()}`}
                          size="md"
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
