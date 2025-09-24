import styled from "styled-components";
import Button from "../components/ui/Button";
import Link from "../components/ui/Link";
import HeroSection from "../components/sections/HeroSection";
import BrandsSection from "../components/sections/BrandsSection";
import CatalogSection from "../components/sections/CatalogSection";
import LocationSection from "../components/sections/LocationSection";
import SEO from "../components/seo/SEO";

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <HomeContainer>
      <SEO
        title="Inicio"
        description="Descubre nuestra amplia gama de neumáticos, lubricantes y herramientas de las mejores marcas. Calidad garantizada y servicio profesional."
        keywords="neumáticos, lubricantes, herramientas, marcas, calidad, servicio"
      />
      <HeroSection
        cta={
          <Link to="/catalogo">
            <Button size="lg">Ver Catálogo</Button>
          </Link>
        }
      />
      <BrandsSection />
      <CatalogSection featured={true} />
      <LocationSection />
    </HomeContainer>
  );
};

export default Home;
