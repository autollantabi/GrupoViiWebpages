import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import { useEmpresa } from "../../hooks/useEmpresa";

const BrandsContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

const BrandsHeader = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
`;

const BrandsTitle = styled.h2`
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

const BrandsSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0;
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BrandCard = styled.div`
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
  }
`;

const StyledCard = styled(Card)`
  height: 100%;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const BrandContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const BrandName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
`;

const BrandType = styled.span`
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
`;

const BrandDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const BrandsSection = () => {
  const { config } = useEmpresa();
  const navigate = useNavigate();

  // Función para navegar al catálogo con la línea y marca seleccionadas
  const handleBrandClick = (linea, marcaNombre) => {
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
    <BrandsContainer>
      <BrandsHeader>
        <BrandsTitle>{config.textos.marcas.titulo}</BrandsTitle>
        <BrandsSubtitle>{config.textos.marcas.subtitulo}</BrandsSubtitle>
      </BrandsHeader>

      <BrandsGrid>
        {config.marcas.map((marca) => (
          <BrandCard
            onClick={() => handleBrandClick(marca.linea, marca.nombre)}
            key={marca.nombre}
          >
            <StyledCard
              images={[marca.logo]}
              imageAlt={`Logo de ${marca.nombre}`}
              elevated
              clickable
              zoomImage
              imageHeight="160px"
              imagePadding="40px"
              objectFit="contain"
            >
              <BrandContent>
                <div style={{ textAlign: "center" }}>
                  <BrandType>{marca.linea}</BrandType>
                </div>
                <BrandName>{marca.nombre}</BrandName>
                <BrandDescription>{marca.descripcion}</BrandDescription>
              </BrandContent>
            </StyledCard>
          </BrandCard>
        ))}
      </BrandsGrid>
    </BrandsContainer>
  );
};

export default BrandsSection;
