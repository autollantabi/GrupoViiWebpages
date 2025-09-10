import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../ui/Icon"; // Nuevo componente
import Link from "../ui/Link"; // Nuevo componente
import { useEmpresa } from "../../hooks/useEmpresa";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  max-width: 1280px;
  margin: 0 auto;
  height: 80px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  max-width: 200px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 40px;
    max-width: 150px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.light};
    padding: ${({ theme }) => theme.spacing.md};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const StyledNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm};
  transition: color 0.2s ease;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    position: relative;
    border:none &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { config } = useEmpresa();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <LogoContainer to="/">
          {config.imagenBrand ? (
            <LogoImage src={config.imagenBrand} alt={config.nombre} />
          ) : (
            <Logo>{config.nombre}</Logo>
          )}
        </LogoContainer>

        <MenuButton onClick={toggleMenu}>
          <Icon name={isMenuOpen ? "times" : "bars"} size="xl" />
        </MenuButton>

        <NavMenu $isOpen={isMenuOpen}>
          <StyledNavLink to="/" end onClick={closeMenu}>
            Inicio
          </StyledNavLink>
          <StyledNavLink to="/marcas" onClick={closeMenu}>Marcas</StyledNavLink>
          <StyledNavLink to="/catalogo" onClick={closeMenu}>Catálogo</StyledNavLink>
          <StyledNavLink to="/contacto" onClick={closeMenu}>Contacto</StyledNavLink>
        </NavMenu>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
