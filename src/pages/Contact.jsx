import { useState } from "react";
import styled from "styled-components";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Text from "../components/ui/Text";
import Icon from "../components/ui/Icon";
import { mockLocation } from "../data/mockLocation";
import { useEmpresa } from "../hooks/useEmpresa";
import { emailService, getEmpresaNombre } from "../api";
import SEO from "../components/seo/SEO";

const ContactContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContactHeader = styled.div`
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

const ContactContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ContactFormSection = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ContactInfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    order: -1;
  }
`;

const SuccessMessage = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  animation: slideInDown 0.5s ease-out;

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    transform: translateX(8px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.sm};

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const InfoIcon = styled.div`
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 56px;
    height: 56px;
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const InfoText = styled.div`
  p {
    margin: 0;

    &:first-child {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text.primary};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    &:last-child {
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const MapContainer = styled.div`
  flex: 1;
  height: 400px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 250px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
  }
`;

const BusinessHours = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const HoursTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    text-align: center;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const HoursList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HoursItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    padding-left: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.sm} 0;

    &:hover {
      padding-left: 0;
    }
  }
`;

const Day = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Hours = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  }
`;

/**
 * Componente de contacto con formulario y información de la empresa
 * Maneja validación de formularios y estado de envío
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { config } = useEmpresa();

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  /**
   * Valida todos los campos del formulario
   * @returns {Object} Objeto con errores encontrados
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingrese su nombre";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Por favor ingrese su correo electrónico";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un correo electrónico válido";
    }

    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = "Por favor ingrese un número de teléfono válido";
    }

    if (!formData.subject) {
      newErrors.subject = "Por favor seleccione un asunto";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor escriba su mensaje";
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    return newErrors;
  };

  /**
   * Maneja el envío del formulario
   * Valida campos, envía comentario y muestra mensaje de éxito
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Preparar datos para enviar comentario
      const comentarioData = {
        nombre: formData.name,
        correo: formData.email,
        telefono: formData.phone || "",
        asunto: formData.subject,
        mensaje: formData.message,
        empresa: getEmpresaNombre(),
      };

      // Enviar comentario usando el servicio de email
      await emailService.enviarComentario(comentarioData);

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      alert(
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contacta con nosotros directamente."
      );
    }
  };

  /**
   * Opciones disponibles para el campo asunto del formulario
   */
  const subjectOptions = [
    { value: "", label: "Seleccione un asunto" },
    { value: "consulta_productos", label: "Consulta sobre productos" },
    { value: "cotizacion", label: "Solicitud de cotización" },
    { value: "ventas_mayoristas", label: "Ventas mayoristas" },
    { value: "garantia", label: "Garantía y servicio técnico" },
    { value: "otros", label: "Otros" },
  ];

  return (
    <ContactContainer>
      <SEO 
        title="Contacto"
        description="Contáctanos para consultas sobre productos, cotizaciones o servicios. Estamos aquí para ayudarte con tus necesidades de neumáticos, lubricantes y herramientas."
        keywords="contacto, consultas, cotizaciones, servicio al cliente, neumáticos, lubricantes"
      />
      <ContactHeader>
        <Text variant="h1" align="center">
          {config.textos.pageContacto.titulo}
        </Text>
        <Text
          variant="p"
          align="center"
          size="lg"
          color="gray"
          maxWidth="700px"
          style={{ margin: "0 auto", lineHeight: "1.6" }}
        >
          {config.textos.pageContacto.subtitulo}
        </Text>
      </ContactHeader>

      <ContactContent>
        <ContactFormSection>
          <Text variant="h2">Envíenos un mensaje</Text>

          {submitted && (
            <SuccessMessage>
              <Icon
                name="check"
                color="primary"
                size="lg"
                style={{ marginRight: "8px" }}
              />
              <Text variant="p" noMargin>
                ¡Gracias por contactarnos! Su mensaje ha sido enviado
                correctamente. Nos pondremos en contacto con usted a la
                brevedad.
              </Text>
            </SuccessMessage>
          )}

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              <Input
                label="Nombre completo"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Ingrese su nombre"
                required
                leftIcon={<Icon name="user" color="gray" />}
              />

              <Input
                label="Correo electrónico"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="ejemplo@correo.com"
                required
                leftIcon={<Icon name="email" color="gray" />}
              />
            </div>

            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                marginTop: "20px",
              }}
            >
              <Input
                label="Teléfono"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="+593 9XXXXXXXX"
                leftIcon={<Icon name="phone" color="gray" />}
              />

              <Input
                label="Asunto"
                id="subject"
                name="subject"
                type="select"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                options={subjectOptions}
                required
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <Input
                label="Mensaje"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Escriba su mensaje aquí..."
                required
                multiline
                rows={4}
              />
            </div>

            <div style={{ marginTop: "24px" }}>
              <StyledButton type="submit" size="lg">
                Enviar mensaje
              </StyledButton>
            </div>
          </form>
        </ContactFormSection>

        <ContactInfoSection>
          <InfoCard>
            <Text variant="h2">Información de contacto</Text>
            <InfoList>
              <InfoItem>
                <InfoIcon>
                  <Icon name="phone" color="light" />
                </InfoIcon>
                <InfoText>
                  <Text variant="p" weight="600" noMargin>
                    Teléfono
                  </Text>
                  <Text variant="p" color="gray" noMargin>
                    {config.textos.ubicacion.telefono}
                  </Text>
                </InfoText>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Icon name="email" color="light" />
                </InfoIcon>
                <InfoText>
                  <Text variant="p" weight="600" noMargin>
                    Correo electrónico
                  </Text>
                  <Text variant="p" color="gray" noMargin>
                    {config.textos.ubicacion.email}
                  </Text>
                </InfoText>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Icon name="location" color="light" />
                </InfoIcon>
                <InfoText>
                  <Text variant="p" weight="600" noMargin>
                    Dirección Principal
                  </Text>
                  <Text variant="p" color="gray" noMargin>
                    {config.textos.ubicacion.direccion}
                  </Text>
                </InfoText>
              </InfoItem>
            </InfoList>

            <SocialLinks>
              {config.textos.footer.redesSociales.map((redSocial, index) => (
                <SocialButton
                  key={`social-${index}-${redSocial.nombre}`}
                  href={redSocial.url}
                  target="_blank"
                  aria-label={redSocial.nombre}
                >
                  <Icon name={redSocial.icon} />
                </SocialButton>
              ))}
            </SocialLinks>
          </InfoCard>

          <MapContainer>
            <iframe
              src={mockLocation.map}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación Ikonix"
            />
          </MapContainer>

          <InfoCard>
            <HoursTitle>Horario de atención</HoursTitle>
            <HoursList>
              {config.textos.ubicacion.horario.map((horario, index) => (
                <HoursItem key={`horario-${index}-${horario}`}>
                  <Day>{horario}</Day>
                </HoursItem>
              ))}
            </HoursList>
          </InfoCard>
        </ContactInfoSection>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;
