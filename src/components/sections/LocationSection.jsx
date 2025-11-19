import styled from "styled-components";
import Icon from "../ui/Icon";
import { useEmpresa } from "../../hooks/useEmpresa";

const LocationContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.lightGray};
  position: relative;
`;

const LocationWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const LocationInfo = styled.div`
  flex: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-right: ${({ theme }) => theme.spacing.xxl};
  }
`;

const LocationTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const LocationDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const LocationDetails = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const LocationDetail = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const DetailIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.lg};
  flex-shrink: 0;
  font-size: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const DetailText = styled.div`
  flex: 1;

  p {
    margin: 0;
    line-height: 1.5;

    &:first-child {
      font-weight: 600;
      font-size: ${({ theme }) => theme.fontSizes.md};
      color: ${({ theme }) => theme.colors.text.primary};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    &:not(:first-child) {
      color: ${({ theme }) => theme.colors.text.secondary};
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`;

const MapContainer = styled.div`
  flex: 1;
  height: 450px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 4px solid ${({ theme }) => theme.colors.light};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
    pointer-events: none;
    z-index: 1;
  }
`;

const LocationSection = () => {
  const { config } = useEmpresa();
  return (
    <LocationContainer>
      <LocationWrapper>
        <LocationInfo>
          <LocationTitle>{config.textos.ubicacion.titulo}</LocationTitle>
          <LocationDescription>
            {config.textos.ubicacion.subtitulo}
          </LocationDescription>

          <LocationDetails>
            <LocationDetail>
              <DetailIcon>
                <Icon name="FaMapPin" color="light" />
              </DetailIcon>
              <DetailText>
                <p>Dirección Principal</p>
                <p>{config.textos.ubicacion.direccion}</p>
              </DetailText>
            </LocationDetail>

            <LocationDetail>
              <DetailIcon>
                <Icon name="FaClock" color="light" />
              </DetailIcon>
              <DetailText>
                <p>Horario de Atención</p>
                {config.textos.ubicacion.horario.map((horario) => (
                  <p key={horario}>{horario}</p>
                ))}
              </DetailText>
            </LocationDetail>

            <LocationDetail>
              <DetailIcon>
                <Icon name="FaPhone" color="light" />
              </DetailIcon>
              <DetailText>
                <p>Teléfono</p>
                <p>{config.textos.ubicacion.telefono}</p>
              </DetailText>
            </LocationDetail>
          </LocationDetails>
        </LocationInfo>

        <MapContainer>
          <iframe
            src={config.textos.ubicacion.map}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación Ikonix"
          />
        </MapContainer>
      </LocationWrapper>
    </LocationContainer>
  );
};

export default LocationSection;
