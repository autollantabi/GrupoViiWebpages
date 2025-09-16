import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
// Importar configuraciones
import { catalogConfig } from "../config/catalogConfig";
import { filterDefinitions } from "../config/filterDefinitions";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Text from "../components/ui/Text";
import Icon from "../components/ui/Icon";
import FilterControl from "../components/ui/FilterControl";
import Input from "../components/ui/Input";
import Dropdown from "../components/ui/Dropdown";
// Importar API
import { useProducts } from "../api";
// Importar hook de empresa
import { useEmpresa } from "../hooks/useEmpresa";
// Importar SEO
import SEO from "../components/seo/SEO";

/**
 * Normaliza texto eliminando acentos y convirtiendo a minúsculas
 * @param {string} text - Texto a normalizar
 * @returns {string} Texto normalizado
 */
const normalizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .trim();
};

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
    return `${import.meta.env.VITE_API_IMAGES_URL}${product.DMA_RUTAIMAGEN}`;
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

const CatalogContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  max-width: 1280px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.sm}`};
  }
`;

const CatalogHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

// Nueva estructura de layout con grid
const CatalogLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    position: relative;
  }
`;

// Overlay para el modal móvil
const ModalOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  backdrop-filter: blur(8px);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  }
`;

// Contenedor interno para filtros en móvil
const FiltersContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: calc(100vh - 120px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xxl};

    /* Scroll personalizado para móviles */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.lightGray};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: calc(100vh - 100px);
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

// Panel lateral para filtros
const FiltersPanel = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  align-self: start;
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;

  /* Scroll personalizado */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    max-height: 100vh;
    border-radius: 0;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.white};
    padding: 0;
    box-shadow: none;
  }
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};

  h2 {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 2px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.white};
    z-index: 10;
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  display: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      transform: scale(1.1);
    }
  }
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.lightGray};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    border: 1px solid ${({ theme }) => theme.colors.gray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const FilterSectionTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 20px;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;

    &::after {
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
    }
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Sección principal para productos
const ProductsSection = styled.div`
  /* Scroll personalizado para toda la sección */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

// Botón para mostrar filtros en móvil
const ShowFiltersButton = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xxl};
  }
`;

const ProductCardWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: 8px;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 240px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 220px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
`;

const ProductImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #f5f5f5;
`;

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
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
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    line-height: 1.3;
  }
`;

const ProductDescription = styled.div`
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: 1.4;
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin-top: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const PaginationButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm};
  min-width: 40px;
  height: 40px;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    background: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 36px;
    height: 36px;
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

// Componentes para mostrar filtros activos
const ActiveFiltersSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: ${({ theme }) => theme.spacing.sm} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
`;

const FilterChip = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const ResultsHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const SortSelect = styled(Input)`
  width: auto;
  min-width: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-width: 150px;
    width: 100%;
  }
`;

/**
 * Componente principal del catálogo de productos
 * Maneja filtrado, búsqueda, paginación y navegación
 */
const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const { config } = useEmpresa();
  const sortOption =
    searchParams.get("ordenar") || catalogConfig.general.defaultSorting;
  const search = searchParams.get("buscar") || "";
  const productsPerPage = parseInt(searchParams.get("ver")) || catalogConfig.general.productsPerPage;

  /**
   * Genera las categorías basadas en las líneas de negocio de la empresa actual
   */
  const getCompanyCategories = () => {
    if (!config?.lineasNegocio) return [];
    
    return config.lineasNegocio.map(linea => {
      const lineaLower = linea.toLowerCase();
      let id = lineaLower;
      let label = linea;
      
      // Mapear a los IDs esperados por el sistema
      if (lineaLower === "llantas") {
        id = "llantas";
        label = "Neumáticos";
      } else if (lineaLower === "lubricantes") {
        id = "lubricantes";
        label = "Lubricantes";
      } else if (lineaLower === "herramientas") {
        id = "herramientas";
        label = "Herramientas";
      }
      
      return { id, label };
    });
  };

  const companyCategories = getCompanyCategories();

  /**
   * Línea de negocio determinada por el parámetro 'linea' en la URL
   * Si no hay parámetro, se selecciona la primera línea de la empresa por defecto
   */
  const lineBusiness =
    searchParams.get("linea") ||
    (companyCategories.length > 0 ? companyCategories[0].id : "");

  /**
   * Filtros activos parseados desde los parámetros de la URL
   * Los valores múltiples se separan por comas y se convierten en arrays
   */
  const filters = useMemo(() => {
    const getFilterValue = (paramName) => {
      const value = searchParams.get(paramName);
      if (!value) return "";

      if (value.includes(",")) {
        return value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v);
      }

      return value;
    };

    const result = {
      DMA_RIN: getFilterValue("rin"),
      DMA_SERIE: getFilterValue("alto"),
      DMA_ANCHO: getFilterValue("ancho"),
      DMA_CATEGORIA: getFilterValue("categoria"),
      DMA_APLICACION: getFilterValue("aplicacion"),
      DMA_EJE: getFilterValue("eje"),
      DMA_MARCA: getFilterValue("marca"),
      DMA_CLASE: getFilterValue("clase"),
      DMA_CLASIFICACION: getFilterValue("clasificacion"),
      DMA_TIPO: getFilterValue("tipo"),
      DMA_MODELO: getFilterValue("modelo"),
      DMA_GRUPO: getFilterValue("grupo"),
      DMA_SUBGRUPO: getFilterValue("subgrupo"),
    };

    return result;
  }, [searchParams]);

  const { products, loading, error, fetchProducts } = useProducts();
  const navigate = useNavigate();

  /**
   * Productos filtrados aplicando búsqueda, línea de negocio y filtros adicionales
   * Lógica de filtrado: AND (producto debe cumplir TODAS las condiciones)
   */
  const filteredProducts = useMemo(() => {
    // Si no hay productos o están cargando, retornar array vacío
    if (!Array.isArray(products) || products.length === 0 || loading) {
      return [];
    }

    // Si no hay línea de negocio establecida, no aplicar filtros
    if (!lineBusiness) {
      return products;
    }


    // Los filtros solo se aplican cuando los productos están completamente cargados
    // y no están en estado de carga
    let result = [...products];
    

    if (search) {
      const normalizedSearch = normalizeText(search);
      result = result.filter((product) => {
        const name = product.DMA_NOMBREITEM || "";
        const brand = product.DMA_MARCA || "";
        const normalizedName = normalizeText(name);
        const normalizedBrand = normalizeText(brand);
        const matches =
          normalizedName.includes(normalizedSearch) ||
          normalizedBrand.includes(normalizedSearch);
        return matches;
      });
    }

    if (lineBusiness === "llantas") {
      result = result.filter((product) => {
        const lineanegocio = product.DMA_LINEANEGOCIO;
        const isNeumatico = lineanegocio === "LLANTAS";
        return isNeumatico;
      });
    } else if (lineBusiness === "lubricantes") {
      result = result.filter((product) => {
        const lineanegocio = product.DMA_LINEANEGOCIO;
        const isLubricante = lineanegocio === "LUBRICANTES";
        return isLubricante;
      });
    } else if (lineBusiness === "herramientas") {
      result = result.filter((product) => {
        const lineanegocio = product.DMA_LINEANEGOCIO;
        const isHerramienta = lineanegocio === "HERRAMIENTAS";
        return isHerramienta;
      });
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        
        if (Array.isArray(value) && value.length > 0) {
          result = result.filter((product) => {
            const productValue = product[key];
            if (!productValue) return false;

            if (Array.isArray(productValue)) {
              return value.every((selectedValue) =>
                productValue.some(
                  (pv) => pv.toString() === selectedValue.toString()
                )
              );
            }

            return value.every(
              (selectedValue) =>
                productValue.toString() === selectedValue.toString()
            );
          });
        } else {
          result = result.filter((product) => {
            const productValue = product[key];
            if (!productValue) return false;

            if (
              key === "DMA_RIN" ||
              key === "DMA_ANCHO" ||
              key === "DMA_SERIE"
            ) {
              const searchValue = value.toString().toLowerCase();
              const productValueStr = productValue.toString().toLowerCase();

              if (key === "DMA_RIN") {
                return productValueStr === searchValue;
              }

              return productValueStr === searchValue;
            }

            return productValue.toString() === value.toString();
          });
        }
        
      }
    });

    return result;
  }, [products, search, lineBusiness, filters, loading]);

  /**
   * Productos ordenados según la opción de ordenamiento seleccionada
   */
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) {
      return [];
    }

    let result = [...filteredProducts];

    // Aplicar ordenación
    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) =>
          (a.DMA_NOMBREITEM || "").localeCompare(b.DMA_NOMBREITEM || "")
        );
        break;
      case "name-desc":
        result.sort((a, b) =>
          (b.DMA_NOMBREITEM || "").localeCompare(a.DMA_NOMBREITEM || "")
        );
        break;
      case "brand-asc":
        result.sort((a, b) =>
          (a.DMA_MARCA || "").localeCompare(b.DMA_MARCA || "")
        );
        break;
      case "brand-desc":
        result.sort((a, b) =>
          (b.DMA_MARCA || "").localeCompare(a.DMA_MARCA || "")
        );
        break;
      default:
        break;
    }

    return result;
  }, [filteredProducts, sortOption]);

  /**
   * Sincroniza la página actual desde la URL al montar el componente
   * También asegura que haya una línea de negocio seleccionada por defecto
   */
  useEffect(() => {
    const syncFiltersFromURL = () => {
      const paginaFromURL = searchParams.get("pagina");
      if (paginaFromURL) {
        const pageNumber = parseInt(paginaFromURL, 10);
        if (pageNumber > 1) {
          setCurrentPage(pageNumber);
        }
      }
    };

    // Si no hay línea de negocio seleccionada y hay categorías de la empresa disponibles,
    // seleccionar la primera por defecto
    if (!searchParams.get("linea") && companyCategories.length > 0) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("linea", companyCategories[0].id);
      setSearchParams(newParams, { replace: true });
    }

    syncFiltersFromURL();
  }, [searchParams, setSearchParams, companyCategories]);

  /**
   * Recarga productos cuando cambie la línea de negocio
   * Solo si ya se han cargado productos previamente
   */
  useEffect(() => {
    if (lineBusiness && products.length > 0) {
      // No recargar productos, solo limpiar la página actual
      setCurrentPage(1);
    }
  }, [lineBusiness, products.length]);

  /**
   * Asegura que los productos se carguen cuando se establezca la línea de negocio inicial
   */
  useEffect(() => {
    if (lineBusiness && !loading && products.length === 0) {
      fetchProducts();
    }
  }, [lineBusiness, loading, products.length, fetchProducts]);

  /**
   * Asegura que los productos se carguen cuando se accede directamente a una URL con filtros
   * PERO solo después de que se haya establecido la línea de negocio
   */
  useEffect(() => {
    // Solo cargar productos si:
    // 1. Hay una línea de negocio establecida
    // 2. Hay filtros en la URL
    // 3. No hay productos cargados
    // 4. No está cargando
    const hasFiltersInURL = Object.entries(filters).some(
      ([, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
    );
    
    if (lineBusiness && hasFiltersInURL && products.length === 0 && !loading) {
      fetchProducts();
    }
  }, [lineBusiness, filters, products.length, loading, fetchProducts]);

  /**
   * Asegura que los filtros se apliquen inmediatamente cuando se carguen los productos
   */
  useEffect(() => {
    if (products.length > 0 && !loading && lineBusiness) {
      // Verificar si hay filtros activos en la URL
      const hasActiveFilters = Object.entries(filters).some(
        ([, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
      );
      
      if (hasActiveFilters && !filtersApplied) {
        // Marcar que los filtros se han aplicado
        setFiltersApplied(true);
        
        // Forzar re-renderizado inmediato para aplicar filtros
        setCurrentPage(1);
      }
    }
  }, [products, loading, filters, filtersApplied, lineBusiness]);

  /**
   * Asegura que los productos se carguen al montar el componente
   */
  useEffect(() => {
    if (products.length === 0 && !loading) {
      fetchProducts();
    }
  }, [products.length, loading, fetchProducts]);

  /**
   * Sincroniza los filtros cuando los productos se cargan completamente
   */
  useEffect(() => {
    if (products.length > 0 && !loading && lineBusiness) {
      // Verificar si hay filtros activos en la URL que necesiten sincronización
      const hasActiveFilters = Object.entries(filters).some(
        ([, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
      );
      
      if (hasActiveFilters) {
        // Solo aplicar filtros cuando los productos estén completamente cargados
        // y no estén en estado de carga
        setCurrentPage(1);
      }
    }
  }, [products, loading, filters, lineBusiness]);

  /**
   * Fuerza la sincronización de filtros cuando cambia la URL
   */
  useEffect(() => {
    // Si hay productos cargados, línea de negocio establecida y hay filtros en la URL, forzar re-renderizado
    if (products.length > 0 && !loading && lineBusiness) {
      const hasFiltersInURL = Object.entries(filters).some(
        ([, value]) => value && (Array.isArray(value) ? value.length > 0 : true)
      );
      
      if (hasFiltersInURL) {
        // Forzar re-renderizado para asegurar que los filtros se apliquen
        const timer = setTimeout(() => {
          setCurrentPage(1);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams, products, loading, filters, lineBusiness]);

  /**
   * Resetea el estado de filtros aplicados cuando cambia la URL
   */
  useEffect(() => {
    // Resetear el estado cuando cambie la URL
    setFiltersApplied(false);
  }, [searchParams]);

  /**
   * Sincroniza la página actual cuando cambian los parámetros de la URL
   */
  useEffect(() => {
    const forceFilterSync = () => {
      const paginaFromURL = searchParams.get("pagina");
      if (paginaFromURL) {
        const pageNumber = parseInt(paginaFromURL, 10);
        if (pageNumber > 1 && pageNumber !== currentPage) {
          setCurrentPage(pageNumber);
        }
      }
    };

    forceFilterSync();
  }, [searchParams, lineBusiness, currentPage]);

  /**
   * Previene el scroll del body cuando el modal está abierto
   */
  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [filtersOpen]);

  /**
   * Manejador unificado para cambios en filtros
   * Actualiza la URL sin recargar la página
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const newParams = new URLSearchParams(searchParams);

    if (Array.isArray(value) && value.length === 0) {
      newParams.delete(catalogConfig.urlParams[name]);
    } else if (Array.isArray(value) && value.length > 0) {
      const joinedValue = value.join(",");
      newParams.set(catalogConfig.urlParams[name], joinedValue);
    } else if (value) {
      newParams.set(catalogConfig.urlParams[name], value);
    } else {
      newParams.delete(catalogConfig.urlParams[name]);
    }

    // Resetear a la página 1 cuando se cambien filtros
    setCurrentPage(1);
    newParams.delete("pagina");

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando se apliquen filtros
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Manejador para cambios en la búsqueda
   */
  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newSearch) {
      newParams.set("buscar", newSearch);
    } else {
      newParams.delete("buscar");
    }

    // Resetear a la página 1 cuando se cambie la búsqueda
    setCurrentPage(1);
    newParams.delete("pagina");

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando se realice una búsqueda
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Manejador para cambios en la ordenación
   */
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newSort && newSort !== catalogConfig.general.defaultSorting) {
      newParams.set("ordenar", newSort);
    } else {
      newParams.delete("ordenar");
    }

    // Resetear a la página 1 cuando se cambie el ordenamiento
    setCurrentPage(1);
    newParams.delete("pagina");

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando se cambie el ordenamiento
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Manejador para cambios en productos por página
   */
  const handleProductsPerPageChange = (e) => {
    const newProductsPerPage = parseInt(e.target.value);
    const newParams = new URLSearchParams(searchParams);

    if (newProductsPerPage && newProductsPerPage !== catalogConfig.general.productsPerPage) {
      newParams.set("ver", newProductsPerPage.toString());
    } else {
      newParams.delete("ver");
    }

    // Resetear a la primera página cuando cambie el número de productos por página
    setCurrentPage(1);
    newParams.delete("pagina");

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando cambie el número de productos por página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = Array.isArray(sortedProducts)
    ? sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(sortedProducts) ? sortedProducts.length : 0) /
      productsPerPage
  );

  /**
   * Cambia a la página especificada y actualiza la URL
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    const newParams = new URLSearchParams(searchParams);
    if (pageNumber > 1) {
      newParams.set("pagina", pageNumber.toString());
    } else {
      newParams.delete("pagina");
    }

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando cambie de página
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Limpia todos los filtros manteniendo la línea de negocio
   */
  const resetFilters = () => {
    setCurrentPage(1);

    const newParams = new URLSearchParams();

    if (lineBusiness) {
      newParams.set("linea", lineBusiness);
    }

    // Mantener el número de productos por página si no es el valor por defecto
    if (productsPerPage !== catalogConfig.general.productsPerPage) {
      newParams.set("ver", productsPerPage.toString());
    }

    setSearchParams(newParams, { replace: true });
    
    // Hacer scroll hacia arriba cuando se limpien los filtros
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /**
   * Elimina un filtro específico o un valor de un filtro múltiple
   * @param {string} filterName - Nombre del filtro a eliminar
   * @param {string|null} value - Valor específico a eliminar (opcional)
   */
  const removeFilter = (filterName, value = null) => {
    const newParams = new URLSearchParams(searchParams);
    const urlParam = catalogConfig.urlParams[filterName];

    if (!urlParam) {
      return;
    }

    if (Array.isArray(filters[filterName])) {
      if (value !== null) {
        const currentValues = filters[filterName].filter((v) => v !== value);

        if (currentValues.length > 0) {
          newParams.set(urlParam, currentValues.join(","));
        } else {
          newParams.delete(urlParam);
        }
      } else {
        newParams.delete(urlParam);
      }
    } else {
      newParams.delete(urlParam);
    }

    setSearchParams(newParams, { replace: true });
  };

  /**
   * Genera opciones para un filtro específico con conteos actualizados
   * @param {string} lineBusinessId - ID de la línea de negocio
   * @param {string} filterId - ID del filtro
   * @returns {Array} Array de opciones con valor, etiqueta y conteo
   */
  const getFilterOptions = (lineBusinessId, filterId) => {
    try {
      if (!lineBusinessId || !filterId || !filterDefinitions[lineBusinessId])
        return [];

      let relevantProducts = [...products];

      if (lineBusiness === "llantas") {
        relevantProducts = products.filter((product) => {
          const lineanegocio = product.DMA_LINEANEGOCIO;
          return lineanegocio === "LLANTAS";
        });
      } else if (lineBusiness === "lubricantes") {
        relevantProducts = products.filter((product) => {
          const lineanegocio = product.DMA_LINEANEGOCIO;
          return lineanegocio === "LUBRICANTES";
        });
      } else if (lineBusiness === "herramientas") {
        relevantProducts = products.filter((product) => {
          const lineanegocio = product.DMA_LINEANEGOCIO;
          return lineanegocio === "HERRAMIENTAS";
        });
      }

      if (search) {
        const normalizedSearch = normalizeText(search);
        relevantProducts = relevantProducts.filter((product) => {
          const name = product.DMA_NOMBREITEM || "";
          const brand = product.DMA_MARCA || "";
          const normalizedName = normalizeText(name);
          const normalizedBrand = normalizeText(brand);
          const matches =
            normalizedName.includes(normalizedSearch) ||
            normalizedBrand.includes(normalizedSearch);
          return matches;
        });
      }

      const activeFilters = Object.entries(filters).filter(
        ([key, value]) => value && value !== "" && key !== filterId
      );

      if (activeFilters.length > 0) {
        relevantProducts = relevantProducts.filter((product) => {
          return activeFilters.every(([filterKey, filterValue]) => {
            const productValue = product[filterKey];
            if (!productValue) return false;

            if (Array.isArray(filterValue) && filterValue.length > 0) {
              if (Array.isArray(productValue)) {
                return filterValue.some((selectedValue) =>
                  productValue.some(
                    (pv) => pv.toString() === selectedValue.toString()
                  )
                );
              } else {
                return filterValue.includes(productValue.toString());
              }
            }

            return productValue.toString() === filterValue.toString();
          });
        });
      }

      const uniqueValues = [
        ...new Set(
          relevantProducts.map((item) => item[filterId]).filter(Boolean)
        ),
      ];

      return uniqueValues
        .map((value) => {
          try {
            const count = relevantProducts.filter(
              (p) => p[filterId] === value
            ).length;

            const filterDef = filterDefinitions[lineBusiness].find(
              (f) => f.id === filterId
            );
            let label = value;

            if (filterDef?.transform) {
              const transformed = filterDef.transform(value);
              if (transformed !== undefined && transformed !== null) {
                label = transformed;
              }
            }
            if (filterDef?.valuePrefix) {
              label = `${filterDef.valuePrefix}${value}`;
            }

            if (typeof label !== "string") {
              label = String(label || "");
            }

            if (
              filterId === "DMA_RIN" ||
              filterId === "DMA_ANCHO" ||
              filterId === "DMA_SERIE"
            ) {
              label = value;
            }

            return { value, label, count };
          } catch (error) {
            console.error(
              `Error procesando valor ${value} para filtro ${filterId}:`,
              error
            );
            return { value: value || "", label: String(value || ""), count: 0 };
          }
        })
        .sort((a, b) => {
          if (
            filterId === "DMA_RIN" ||
            filterId === "DMA_ANCHO" ||
            filterId === "DMA_SERIE"
          ) {
            const numA = parseFloat(a.value) || 0;
            const numB = parseFloat(b.value) || 0;
            return numA - numB;
          }

          if (typeof a.label === "string" && typeof b.label === "string") {
            return a.label.localeCompare(b.label, "es", {
              numeric: true,
              sensitivity: "base",
            });
          }

          return String(a.value).localeCompare(String(b.value), "es", {
            numeric: true,
            sensitivity: "base",
          });
        });
    } catch (error) {
      console.error(
        `Error en getFilterOptions para ${lineBusiness}/${filterId}:`,
        error
      );
      return [];
    }
  };

  /**
   * Renderiza un filtro individual con sus opciones
   * @param {string} lineBusinessId - ID de la línea de negocio
   * @param {Object} filterDef - Definición del filtro
   * @returns {JSX.Element|null} Componente del filtro o null si no hay opciones
   */
  const renderFilter = (lineBusinessId, filterDef) => {
    const options = getFilterOptions(lineBusinessId, filterDef.id);

    if (options.length === 0) {
      return null;
    }

    const validOptions = options.map((opt) => ({
      ...opt,
      label:
        typeof opt.label === "string" ? opt.label : String(opt.label || ""),
      value: opt.value !== undefined && opt.value !== null ? opt.value : "",
    }));

    const currentFilterValue = filters[filterDef.id];

    return (
      <FilterGroup key={filterDef.id}>
        {filterDef.type === "select" ? (
          <Input
            key={filterDef.id}
            label={filterDef.label}
            id={filterDef.id}
            name={filterDef.id}
            type="select"
            value={currentFilterValue || ""}
            onChange={handleFilterChange}
            options={[
              { value: "", label: filterDef.emptyOptionLabel || `Todos` },
              ...validOptions,
            ]}
          />
        ) : (
          <FilterControl
            key={filterDef.id}
            type={filterDef.type}
            label={filterDef.label}
            name={filterDef.id}
            value={currentFilterValue || (filterDef.multiple ? [] : "")}
            onChange={handleFilterChange}
            options={validOptions}
            showCounts={filterDef.showCounts}
            multiple={filterDef.multiple}
            displayAs={filterDef.displayAs || "default"}
          />
        )}
      </FilterGroup>
    );
  };

  return (
    <CatalogContainer>
      <SEO 
        title="Catálogo"
        description="Explora nuestro catálogo completo de neumáticos, lubricantes y herramientas. Filtra por marca, tamaño, tipo y encuentra exactamente lo que necesitas."
        keywords="catálogo neumáticos, catálogo lubricantes, catálogo herramientas, filtros, búsqueda"
      />
      <CatalogHeader>
        <Text variant="h1">{catalogConfig.general.pageTitle}</Text>
        <Text variant="p" color="gray" style={{ lineHeight: "1.6" }}>
          {catalogConfig.general.pageDescription}
        </Text>
      </CatalogHeader>

      {error && (
        <div
          style={{
            background: "#fee",
            border: "1px solid #fcc",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          <Text variant="p" color="red">
            Error: {error}
          </Text>
          <Button
            variant="outline"
            onClick={fetchProducts}
            style={{ marginTop: "8px" }}
          >
            Reintentar
          </Button>
        </div>
      )}

      <ModalOverlay
        $isOpen={filtersOpen}
        onClick={() => setFiltersOpen(false)}
      />
      <CatalogLayout>
        <FiltersPanel key={`filters-${lineBusiness}`} $isOpen={filtersOpen}>
          <FiltersHeader>
            <Text variant="h2" size="lg">
              Filtros
            </Text>
            <CloseButton onClick={() => setFiltersOpen(false)}>
              <Icon name="close" />
            </CloseButton>
          </FiltersHeader>

          <FiltersContent>
            <FilterGroup>
              <Input
                id="search"
                name="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
                leftIcon={<Icon name="search" color="gray" />}
              />
            </FilterGroup>
            <ButtonGroup>
              <StyledButton variant="outline" onClick={resetFilters} fullWidth>
                Limpiar filtros
              </StyledButton>
              <StyledButton
                variant="primary"
                onClick={() => setFiltersOpen(false)}
                fullWidth
                mobileOnly
              >
                Cerrar
              </StyledButton>
            </ButtonGroup>

            <FilterGroup>
              <FilterControl
                key="lineBusiness"
                type="radio"
                label="Línea de Negocio"
                name="lineBusiness"
                value={lineBusiness}
                onChange={(e) => {
                  const newLineBusiness = e.target.value;
                  const newParams = new URLSearchParams();

                  if (newLineBusiness) {
                    newParams.set("linea", newLineBusiness);
                  }

                  // Mantener la búsqueda si existe
                  if (search) {
                    newParams.set("buscar", search);
                  }

                  // Mantener el ordenamiento si existe
                  if (
                    sortOption &&
                    sortOption !== catalogConfig.general.defaultSorting
                  ) {
                    newParams.set("ordenar", sortOption);
                  }

                  // Mantener el número de productos por página si no es el valor por defecto
                  if (productsPerPage !== catalogConfig.general.productsPerPage) {
                    newParams.set("ver", productsPerPage.toString());
                  }

                  // Resetear a la página 1 cuando se cambie la línea de negocio
                  setCurrentPage(1);
                  // NO incluir parámetro de página en la URL
                  
                  // Usar replace: true para evitar recargas de página
                  setSearchParams(newParams, { replace: true });
                  
                  // Hacer scroll hacia arriba cuando se cambie la línea de negocio
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
                options={companyCategories.map((cat) => ({
                  value: cat.id,
                  label: cat.label,
                }))}
                displayAs="chip"
              />
            </FilterGroup>

            {lineBusiness && filterDefinitions[lineBusiness] && (
              <>
                {loading ? (
                  <div style={{ textAlign: "center", padding: "24px" }}>
                    <Text variant="p" color="gray">
                      Cargando filtros...
                    </Text>
                  </div>
                ) : (
                  <>
                    {filterDefinitions[lineBusiness].filter(
                      (filter) => filter.isMainFilter
                    ).length > 0 && (
                      <>
                        <FilterSectionTitle>
                          Filtros principales
                        </FilterSectionTitle>
                        {filterDefinitions[lineBusiness]
                          .filter((filter) => filter.isMainFilter)
                          .map((filter) => renderFilter(lineBusiness, filter))}
                      </>
                    )}

                    {filterDefinitions[lineBusiness].filter(
                      (filter) => !filter.isMainFilter
                    ).length > 0 && (
                      <>
                        <FilterSectionTitle>
                          Filtros adicionales
                        </FilterSectionTitle>
                        {filterDefinitions[lineBusiness]
                          .filter((filter) => !filter.isMainFilter)
                          .map((filter) => renderFilter(lineBusiness, filter))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </FiltersContent>
        </FiltersPanel>

        <ProductsSection>
          <ShowFiltersButton onClick={() => setFiltersOpen(true)}>
            <Icon name="filter" />
            {loading ? "Cargando..." : "Filtros"}
          </ShowFiltersButton>

          {Object.entries(filters).some(
            ([, value]) =>
              value && (Array.isArray(value) ? value.length > 0 : true)
          ) && (
            <ActiveFiltersSection>
              <Text variant="p" size="sm">
                Filtros activos:
              </Text>
              <ActiveFiltersContainer>
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || (Array.isArray(value) && value.length === 0))
                    return null;

                  const fieldLabel = catalogConfig.fieldLabels[key] || key;

                  if (Array.isArray(value)) {
                    return value.map((val) => (
                      <FilterChip
                        onClick={() => removeFilter(key, val)}
                        key={`${key}-${val}`}
                      >
                        {fieldLabel}: {val}
                        <Icon name="times" size="xs" />
                      </FilterChip>
                    ));
                  }

                  return (
                    <FilterChip onClick={() => removeFilter(key)} key={key}>
                      {fieldLabel}: {value}
                      <Icon name="times" size="xs" />
                    </FilterChip>
                  );
                })}
              </ActiveFiltersContainer>
              <StyledButton variant="text" onClick={resetFilters}>
                Limpiar todos
              </StyledButton>
            </ActiveFiltersSection>
          )}

          <ResultsHeader>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Text variant="p">
                {loading
                  ? "Cargando productos..."
                  : `Mostrando ${sortedProducts.length} productos`}
              </Text>
              {!loading && (
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Dropdown
                    name="productsPerPage"
                    value={productsPerPage}
                    onChange={handleProductsPerPageChange}
                    options={catalogConfig.general.productsPerPageOptions}
                    placeholder="Ver"
                    width="150px"
                    style={{
                      '@media (max-width: 768px)': {
                        width: '120px',
                      },
                    }}
                  />
                  <Dropdown
                    name="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    options={catalogConfig.general.sortOptions}
                    placeholder="Ordenar por"
                    width="200px"
                    style={{
                      '@media (max-width: 768px)': {
                        width: '150px',
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </ResultsHeader>

          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#f8f8f8",
                borderRadius: "12px",
              }}
            >
              <Text variant="h3">Cargando productos...</Text>
              <Text variant="p" color="gray">
                Por favor espere mientras se cargan los productos desde la API
              </Text>
            </div>
          ) : !Array.isArray(products) || products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#f8f8f8",
                borderRadius: "12px",
              }}
            >
              <Text variant="h3">No hay productos disponibles</Text>
              <Text variant="p" color="gray">
                {error
                  ? `Error al cargar productos: ${error}`
                  : "No se encontraron productos en la API. Verifique la conexión o contacte al administrador."}
              </Text>
              <Button
                variant="primary"
                onClick={fetchProducts}
                style={{ marginTop: "16px" }}
              >
                Reintentar
              </Button>
            </div>
          ) : !Array.isArray(sortedProducts) || sortedProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#f8f8f8",
                borderRadius: "12px",
              }}
            >
              <Text variant="h3">
                No hay productos que coincidan con los filtros
              </Text>
              <Text variant="p" color="gray">
                Intente ajustar los filtros de búsqueda para encontrar más
                productos.
              </Text>
            </div>
          ) : (
            <>
              {currentProducts && currentProducts.length > 0 ? (
                <ProductGrid>
                  {currentProducts
                    .filter((product) => product && product.DMA_ID) // Solo productos válidos
                    .map((product) => {
                      return (
                        <ProductCardWrapper
                          key={product.DMA_ID}
                          onClick={() => {
                            // Pasar la URL actual como prop
                            const currentUrl =
                              window.location.pathname + window.location.search;
                            navigate(`/catalogo/${product.DMA_ID}`, {
                              state: {
                                returnUrl: currentUrl,
                              },
                            });
                          }}
                        >
                          <ProductImageContainer>
                            {hasProductImage(product) ? (
                              <ProductImage
                                src={getProductImage(product)}
                                alt={product.DMA_NOMBREITEM || "Producto"}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <ProductImagePlaceholder
                              style={{
                                display: hasProductImage(product)
                                  ? "none"
                                  : "flex",
                              }}
                            >
                              <Text size="xs" color="gray">
                                Imágen no disponible
                              </Text>
                            </ProductImagePlaceholder>
                          </ProductImageContainer>

                          <ProductContent>
                            <ProductBrand>
                              {product.DMA_MARCA &&
                                product.DMA_MARCA.charAt(0).toUpperCase() +
                                  product.DMA_MARCA.slice(1)}
                            </ProductBrand>
                            <ProductName>
                              <Text variant="h3" size="lg" noMargin>
                                {product.DMA_NOMBREITEM || "Sin nombre"}
                              </Text>
                            </ProductName>
                            <ProductDescription>
                              <Text variant="p" color="gray">
                                {generateDescription(product) ||
                                  "Sin descripción"}
                              </Text>
                            </ProductDescription>
                          </ProductContent>
                        </ProductCardWrapper>
                      );
                    })}
                </ProductGrid>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <Text variant="h3" color="gray">
                    {loading
                      ? "Cargando productos..."
                      : "No se encontraron productos"}
                  </Text>
                  {!loading && (
                    <Text
                      variant="p"
                      color="gray"
                      style={{ marginTop: "1rem" }}
                    >
                      Intenta ajustar los filtros o la búsqueda
                    </Text>
                  )}
                </div>
              )}

              {currentProducts && currentProducts.length > 0 && (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      marginBottom: "16px",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    Página {currentPage} de {totalPages} •{" "}
                    {sortedProducts.length} productos totales
                  </div>
                  <PaginationContainer>
                    <PaginationButton
                      onClick={() => paginate(1)}
                      disabled={currentPage === 1}
                      title="Primera página"
                    >
                      <Icon name="chevronLeft" size="sm" />
                      <Icon name="chevronLeft" size="sm" />
                    </PaginationButton>

                    <PaginationButton
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      title="Página anterior"
                    >
                      <Icon name="chevronLeft" size="sm" />
                    </PaginationButton>

                    {[...Array(Math.min(5, totalPages))].map((unused, i) => {
                      let pageNum = currentPage;
                      if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = currentPage - 2 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      if (pageNum > 0 && pageNum <= totalPages) {
                        return (
                          <PaginationButton
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            $active={currentPage === pageNum}
                            title={`Página ${pageNum}`}
                          >
                            {pageNum}
                          </PaginationButton>
                        );
                      }
                      return null;
                    })}

                    <PaginationButton
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      title="Página siguiente"
                    >
                      <Icon name="chevronRight" size="sm" />
                    </PaginationButton>

                    <PaginationButton
                      onClick={() => paginate(totalPages)}
                      disabled={currentPage === totalPages}
                      title="Última página"
                    >
                      <Icon name="chevronRight" size="sm" />
                      <Icon name="chevronRight" size="sm" />
                    </PaginationButton>
                  </PaginationContainer>
                </>
              )}
            </>
          )}
        </ProductsSection>
      </CatalogLayout>
    </CatalogContainer>
  );
};

export default Catalog;
