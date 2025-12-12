import styled from "styled-components";
import Text from "../ui/Text";
import Link from "../ui/Link";
import Icon from "../ui/Icon";
import { useEmpresa } from "../../hooks/useEmpresa";

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  padding: ${({ theme }) => theme.spacing.xxl} 0
    ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FooterColumn = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FooterText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray};
  max-width: 300px;
  line-height: 1.6;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray};
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(8px);
  }

  &::before {
    content: "";
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::before {
    width: 8px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.dark} 0%,
    ${({ theme }) => theme.colors.gray} 100%
  );
  color: ${({ theme }) => theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary} 0%,
      ${({ theme }) => theme.colors.secondary} 100%
    );
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ColumnTitle = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray};
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  a {
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(8px);
  }

  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.4;
  }

  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
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
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 15px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { config, empresa } = useEmpresa();
  // Verificar si la empresa es MAXXIMUNDO
  const isMaxximundo = empresa?.toUpperCase() === 'MAXXIMUNDO';
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <LogoContainer to="/">
            {config.imagenBrand ? (
              <LogoImage src={config.imagenBrand1} alt={config.nombre} />
            ) : (
              <Logo>{config.nombre}</Logo>
            )}
          </LogoContainer>
          <FooterText>{config.textos.footer.descripcion}</FooterText>
          <SocialLinks>
            {config.textos.footer.redesSociales.map((redSocial) => (
              <SocialLink
                key={redSocial.nombre}
                href={redSocial.url}
                target="_blank"
                aria-label={redSocial.nombre}
              >
                <Icon name={redSocial.icon} />
              </SocialLink>
            ))}
          </SocialLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle variant="h3" color="light" size="md">
            Enlaces rápidos
          </ColumnTitle>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/" color="gray">
                Inicio
              </StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/marcas" color="gray">
                Nuestras Marcas
              </StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/catalogo" color="gray">
                Catálogo
              </StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/contacto" color="gray">
                Contáctanos
              </StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterColumn>

        <FooterColumn>
          <ColumnTitle variant="h3" color="light" size="md">
            Contacto
          </ColumnTitle>
          <ContactItem>
            <Icon name="FaMapPin" color="primary" />
            <span>{config.textos.ubicacion.direccion}</span>
          </ContactItem>
          <ContactItem>
            <Icon name="FaPhone" color="primary" />
            <span>{config.textos.ubicacion.telefono}</span>
          </ContactItem>
          <ContactItem>
            <Icon name="FaEnvelope" color="primary" />
            <span>{config.textos.ubicacion.email}</span>
          </ContactItem>
        </FooterColumn>
      </FooterContent>

      <Copyright>
        © {currentYear} {config.nombre}. Todos los derechos reservados.
        {isMaxximundo && (
          <>
            {" | "}
            <Link to="/politicas-privacidad" color="gray">
              Política de privacidad
            </Link>
            {" | "}
            <Link to="/politicas-privacidad-shellmaxx" color="gray">
              Política de privacidad ShellMaxx
            </Link>
          </>
        )}
        {" | "}
        <Link href="#" color="gray">
          Términos y condiciones
        </Link>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
