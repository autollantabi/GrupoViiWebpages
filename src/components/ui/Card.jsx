import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Icon from "./Icon";

const CardContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.light};
  transition: all 0.3s ease;
  box-shadow: ${({ theme, $elevated }) =>
    $elevated ? theme.shadows.md : "none"};

  ${({ $clickable }) =>
    $clickable &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  `};
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || "auto"};
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: ${({ $objectFit }) => $objectFit || "cover"};
    transition: transform 0.3s ease;

    /* Aplicar padding horizontal según tipo de objectFit o valor explícito */
    padding: ${({ $imagePadding, $objectFit }) => {
      if ($imagePadding) return $imagePadding;
      // Agregar padding automáticamente para 'contain'
      return $objectFit === "contain" ? "0 15%" : "0";
    }};
    box-sizing: border-box;

    ${({ $zoomOnHover }) =>
      $zoomOnHover &&
      `
      &:hover {
        transform: scale(1.05);
      }
    `};
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) =>
    `${theme.colors.dark}80`}; // Con transparencia
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  z-index: 2;

  ${CardImageContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    opacity: 0.8; // Siempre visible en móvil
    width: 30px;
    height: 30px;
  }
`;

const ImageIndicators = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
  z-index: 2;
`;

const ImageIndicator = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : `${theme.colors.light}80`};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    outline: none;
  }
`;

const CardContent = styled.div`
  padding: ${({ theme, $noPadding }) => ($noPadding ? "0" : theme.spacing.lg)};
`;

const Card = ({
  children,
  images,
  imageAlt,
  imageHeight,
  objectFit = "cover",
  imagePadding = null,
  noPadding = false,
  elevated = false,
  clickable = false,
  zoomImage = false,
  onClick,
  className,
  ...props
}) => {
  // Convertir image o images a un array unificado
  const imageArray = images ? (Array.isArray(images) ? images : [images]) : [];
  const hasMultipleImages = imageArray.length > 1;

  // Estado para controlar la imagen activa
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Funciones para navegar entre imágenes
  const nextImage = (e) => {
    e.stopPropagation(); // Evitar que el onClick del Card se active
    setActiveImageIndex((prev) =>
      prev === imageArray.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation(); // Evitar que el onClick del Card se active
    setActiveImageIndex((prev) =>
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  const goToImage = (index, e) => {
    e.stopPropagation(); // Evitar que el onClick del Card se active
    setActiveImageIndex(index);
  };

  return (
    <CardContainer
      $elevated={elevated}
      $clickable={clickable || !!onClick}
      onClick={onClick}
      className={className}
      {...props}
    >
      {imageArray.length > 0 && (
        <CardImageContainer height={imageHeight}>
          <CardImage
            $zoomOnHover={zoomImage}
            $objectFit={objectFit}
            $imagePadding={imagePadding}
          >
            <img
              src={imageArray[activeImageIndex]}
              alt={`${imageAlt || "Card image"} ${activeImageIndex + 1}`}
              loading="lazy"
            />
          </CardImage>

          {/* Botones de navegación (solo para múltiples imágenes) */}
          {hasMultipleImages && (
            <>
              <NavigationButton className="prev" onClick={prevImage}>
                <Icon name="chevronLeft" size="sm" />
              </NavigationButton>

              <NavigationButton className="next" onClick={nextImage}>
                <Icon name="chevronRight" size="sm" />
              </NavigationButton>

              {/* Indicadores de posición */}
              <ImageIndicators>
                {imageArray.map((_, index) => (
                  <ImageIndicator
                    key={index}
                    $active={index === activeImageIndex}
                    onClick={(e) => goToImage(index, e)}
                    aria-label={`Ver imagen ${index + 1}`}
                  />
                ))}
              </ImageIndicators>
            </>
          )}
        </CardImageContainer>
      )}

      <CardContent $noPadding={noPadding}>{children}</CardContent>
    </CardContainer>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string), // Nueva prop para múltiples imágenes
  imageAlt: PropTypes.string,
  imageHeight: PropTypes.string,
  objectFit: PropTypes.oneOf([
    "cover",
    "contain",
    "fill",
    "scale-down",
    "none",
  ]),
  imagePadding: PropTypes.string,
  noPadding: PropTypes.bool,
  elevated: PropTypes.bool,
  clickable: PropTypes.bool,
  zoomImage: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card;
