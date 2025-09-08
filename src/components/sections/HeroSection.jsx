import styled from "styled-components";
import PropTypes from "prop-types";
import { useEmpresa } from "../../hooks/useEmpresa";

const HeroContainer = styled.section`
  background: ${({ theme, bgColor, $bgImage }) =>
    $bgImage
      ? `linear-gradient(135deg, ${
          bgColor || theme.colors.lightGray
        } 0%, rgba(0, 0, 0, 0.8) 100%), url(${$bgImage})`
      : `linear-gradient(135deg, ${bgColor || theme.colors.lightGray} 0%, ${
          theme.colors.light
        } 100%)`};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  height: ${({ $fullHeight }) => ($fullHeight ? "100vh" : "600px")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ overlay, $bgImage }) =>
      $bgImage ? overlay || "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.1)"};
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  color: ${({ theme, textColor, $bgImage }) =>
    $bgImage
      ? textColor || theme.colors.light
      : textColor || theme.colors.text.primary};
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.xl};
  animation: fadeInUp 1s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: inherit;
  line-height: 1.2;
  text-shadow: ${({ $bgImage }) =>
    $bgImage ? "2px 2px 4px rgba(0, 0, 0, 0.5)" : "none"};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};

    &::after {
      width: 60px;
      height: 3px;
      bottom: -10px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};

    &::after {
      width: 50px;
      height: 2px;
      bottom: -8px;
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
  text-shadow: ${({ $bgImage }) =>
    $bgImage ? "1px 1px 2px rgba(0, 0, 0, 0.3)" : "none"};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const CtaContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  animation: fadeInUp 1s ease-out 0.3s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const FloatingElement = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.primary};
  opacity: 0.1;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;

  &:nth-child(1) {
    width: 80px;
    height: 80px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    width: 120px;
    height: 120px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    width: 60px;
    height: 60px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const HeroSection = ({
  cta,
  bgImage = "/hero-bg.jpg",
  bgColor,
  overlay,
  textColor,
  fullHeight = false,
}) => {
  const { config } = useEmpresa();

  // Usar textos de la empresa si no se proporcionan props específicas
  const displayTitle = config.textos.hero.titulo;
  const displaySubtitle = config.textos.hero.subtitulo;
  const displayDescription = config.textos.hero.descripcion;

  return (
    <HeroContainer
      $bgImage={bgImage}
      bgColor={bgColor}
      overlay={overlay}
      $fullHeight={fullHeight}
    >
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>

      <HeroContent textColor={textColor} $bgImage={bgImage}>
        <HeroTitle $bgImage={bgImage}>{displayTitle}</HeroTitle>
        {displaySubtitle && (
          <HeroSubtitle $bgImage={bgImage}>{displaySubtitle}</HeroSubtitle>
        )}
        {displayDescription && (
          <HeroSubtitle $bgImage={bgImage}>{displayDescription}</HeroSubtitle>
        )}
        {cta && <CtaContainer>{cta}</CtaContainer>}
      </HeroContent>
    </HeroContainer>
  );
};

HeroSection.propTypes = {
  cta: PropTypes.node,
  bgImage: PropTypes.string,
  bgColor: PropTypes.string,
  overlay: PropTypes.string,
  textColor: PropTypes.string,
  fullHeight: PropTypes.bool,
};

export default HeroSection;
