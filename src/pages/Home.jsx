import styled from 'styled-components';
import Button from '../components/ui/Button';
import HeroSection from '../components/sections/HeroSection';
import BrandsSection from '../components/sections/BrandsSection';
import CatalogSection from '../components/sections/CatalogSection';
import LocationSection from '../components/sections/LocationSection';

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Home = () => {  
  return (
    <HomeContainer>
      <HeroSection 
        cta={<Button size="lg">Ver Catálogo</Button>}
      />
      <BrandsSection />
      <CatalogSection featured={true} />
      <LocationSection />
    </HomeContainer>
  );
};

export default Home;