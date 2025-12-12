import styled from "styled-components";
import Text from "../components/ui/Text";
import { useEmpresa } from "../hooks/useEmpresa";
import SEO from "../components/seo/SEO";

const PrivacyPolicyContainer = styled.div`
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

const PrivacyPolicyHeader = styled.div`
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

const ContentSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-weight: 700;
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const ContentText = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const LastUpdated = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

/**
 * Página de Políticas de Privacidad de la Empresa Maxximundo
 * Solo visible para la empresa MAXXIMUNDO
 */
const PrivacyPolicy = () => {
  const { config } = useEmpresa();

  return (
    <PrivacyPolicyContainer>
      <SEO
        title="Políticas de Privacidad - Maxximundo"
        description="Políticas de privacidad de Maxximundo. Conoce cómo protegemos y manejamos tu información personal cuando interactúas con nuestros servicios y productos."
        keywords="políticas de privacidad, privacidad, Maxximundo, protección de datos, privacidad empresa"
      />
      <PrivacyPolicyHeader>
        <Text variant="h1" align="center">
          Políticas de Privacidad
        </Text>
        <Text
          variant="p"
          align="center"
          size="lg"
          color="gray"
          maxWidth="700px"
          style={{ margin: "0 auto", lineHeight: "1.6" }}
        >
          {config.EMPRESA_NOMBRE || "Maxximundo"}
        </Text>
      </PrivacyPolicyHeader>

      <ContentSection>
        <SectionTitle>1. Introducción</SectionTitle>
        <ContentText>
          <p>
            En Maxximundo, nos comprometemos a proteger la privacidad y
            seguridad de la información personal de nuestros clientes,
            visitantes y usuarios. Esta Política de Privacidad describe cómo
            recopilamos, utilizamos, almacenamos y protegemos la información que
            nos proporciona cuando interactúa con nuestros servicios, sitio web,
            puntos de venta y comunicaciones comerciales.
          </p>
          <p>
            Al utilizar nuestros servicios, visitar nuestro sitio web, hacer
            compras en nuestros puntos de venta o interactuar con nosotros de
            cualquier manera, usted acepta las prácticas descritas en esta
            política. Si no está de acuerdo con estas prácticas, le solicitamos
            que no utilice nuestros servicios.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>2. Información que Recopilamos</SectionTitle>
        <ContentText>
          <p>
            Recopilamos diferentes tipos de información para brindarle una mejor
            experiencia y servicio:
          </p>
          <ul>
            <li>
              <strong>Información Personal:</strong> Nombre completo, dirección
              de correo electrónico, número de teléfono, dirección física,
              número de identificación y otra información que usted nos
              proporciona voluntariamente al realizar compras, registrarse en
              nuestros servicios o contactarnos.
            </li>
            <li>
              <strong>Información de Transacciones:</strong> Detalles de sus
              compras, incluyendo productos adquiridos, montos, fechas, métodos
              de pago y preferencias de compra.
            </li>
            <li>
              <strong>Información de Navegación Web:</strong> Cuando visita
              nuestro sitio web, recopilamos información sobre su navegación,
              incluyendo páginas visitadas, tiempo de permanencia, enlaces
              seguidos y búsquedas realizadas.
            </li>
            <li>
              <strong>Información de Comunicación:</strong> Registros de
              correspondencia, consultas, quejas y comunicaciones que mantiene
              con nuestro servicio al cliente.
            </li>
            <li>
              <strong>Información del Dispositivo:</strong> Cuando accede a
              nuestros servicios digitales, podemos recopilar información
              técnica como tipo de dispositivo, sistema operativo, dirección IP
              y configuración del navegador.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>3. Uso de la Información</SectionTitle>
        <ContentText>
          <p>Utilizamos la información recopilada para los siguientes fines:</p>
          <ul>
            <li>
              Proporcionar y mejorar nuestros productos y servicios de llantas y
              lubricantes
            </li>
            <li>Personalizar su experiencia de compra y atención</li>
            <li>Procesar sus transacciones y solicitudes de cotización</li>
            <li>
              Enviar notificaciones importantes sobre nuestros productos y
              servicios
            </li>
            <li>
              Comunicarnos con usted sobre productos, servicios, promociones y
              ofertas especiales
            </li>
            <li>
              Realizar análisis y estudios para mejorar nuestros servicios y
              experiencia del cliente
            </li>
            <li>Cumplir con obligaciones legales y regulatorias</li>
            <li>
              Prevenir fraudes y garantizar la seguridad de las transacciones
            </li>
            <li>
              Gestionar relaciones con clientes y mejorar el servicio al cliente
            </li>
            <li>
              Desarrollar nuevos productos y servicios que se ajusten a sus
              necesidades
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>4. Compartir Información</SectionTitle>
        <ContentText>
          <p>
            No vendemos, alquilamos ni comercializamos su información personal a
            terceros. Sin embargo, podemos compartir su información en las
            siguientes circunstancias:
          </p>
          <ul>
            <li>
              <strong>Proveedores de Servicios:</strong> Compartimos información
              con proveedores que nos ayudan a operar la aplicación y brindar
              nuestros servicios, sujetos a acuerdos de confidencialidad.
            </li>
            <li>
              <strong>Cumplimiento Legal:</strong> Podemos divulgar información
              cuando sea requerido por ley, orden judicial o proceso legal.
            </li>
            <li>
              <strong>Protección de Derechos:</strong> Podemos compartir
              información para proteger nuestros derechos, propiedad o
              seguridad, así como la de nuestros usuarios.
            </li>
            <li>
              <strong>Con su Consentimiento:</strong> Compartiremos información
              con terceros cuando usted nos dé su consentimiento explícito.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>5. Seguridad de la Información</SectionTitle>
        <ContentText>
          <p>
            Implementamos medidas de seguridad técnicas, administrativas y
            físicas para proteger su información personal contra acceso no
            autorizado, alteración, divulgación o destrucción. Estas medidas
            incluyen:
          </p>
          <ul>
            <li>Cifrado de datos en tránsito y en reposo</li>
            <li>Autenticación segura de usuarios</li>
            <li>Monitoreo regular de nuestros sistemas</li>
            <li>Acceso restringido a información personal</li>
            <li>Actualizaciones regulares de seguridad</li>
          </ul>
          <p>
            Sin embargo, ningún método de transmisión por Internet o
            almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por
            proteger su información, no podemos garantizar su seguridad
            absoluta.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>6. Sus Derechos</SectionTitle>
        <ContentText>
          <p>
            Usted tiene los siguientes derechos respecto a su información
            personal:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> Puede solicitar acceso a la información
              personal que tenemos sobre usted.
            </li>
            <li>
              <strong>Rectificación:</strong> Puede solicitar la corrección de
              información inexacta o incompleta.
            </li>
            <li>
              <strong>Eliminación:</strong> Puede solicitar la eliminación de su
              información personal, sujeto a ciertas excepciones legales.
            </li>
            <li>
              <strong>Portabilidad:</strong> Puede solicitar una copia de su
              información en un formato estructurado.
            </li>
            <li>
              <strong>Oposición:</strong> Puede oponerse al procesamiento de su
              información para ciertos fines.
            </li>
            <li>
              <strong>Retiro del Consentimiento:</strong> Puede retirar su
              consentimiento en cualquier momento cuando el procesamiento se
              base en su consentimiento.
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, puede contactarnos a través de los
            medios proporcionados en la sección de contacto de esta política.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>7. Retención de Datos</SectionTitle>
        <ContentText>
          <p>
            Conservamos su información personal durante el tiempo necesario para
            cumplir con los fines descritos en esta política, a menos que la ley
            requiera o permita un período de retención más largo. Cuando ya no
            necesitemos su información personal, la eliminaremos de forma
            segura.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>8. Menores de Edad</SectionTitle>
        <ContentText>
          <p>
            Nuestros servicios están dirigidos a personas mayores de 18 años. No
            recopilamos intencionalmente información personal de menores de
            edad. Si descubrimos que hemos recopilado información de un menor
            sin el consentimiento parental apropiado, tomaremos medidas para
            eliminar esa información inmediatamente. Si usted es padre o tutor y
            cree que su hijo menor de edad nos ha proporcionado información
            personal, por favor contáctenos inmediatamente.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>9. Cookies y Tecnologías Similares</SectionTitle>
        <ContentText>
          <p>
            Nuestro sitio web utiliza cookies y tecnologías similares para
            mejorar su experiencia de navegación, analizar el tráfico del sitio,
            recordar sus preferencias y personalizar el contenido. Estas
            tecnologías nos ayudan a:
          </p>
          <ul>
            <li>Recordar sus preferencias y configuraciones</li>
            <li>Analizar cómo los visitantes utilizan nuestro sitio web</li>
            <li>Mejorar la funcionalidad y el rendimiento del sitio</li>
            <li>Personalizar su experiencia de navegación</li>
            <li>Proporcionar contenido relevante basado en sus intereses</li>
          </ul>
          <p>
            Puede controlar el uso de cookies a través de la configuración de su
            navegador. Sin embargo, tenga en cuenta que deshabilitar ciertas
            cookies puede afectar la funcionalidad de nuestro sitio web.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>10. Cambios a esta Política</SectionTitle>
        <ContentText>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Le
            notificaremos sobre cambios significativos publicando la nueva
            política en la aplicación y actualizando la fecha de "Última
            actualización". Le recomendamos revisar esta política
            periódicamente.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>11. Contacto</SectionTitle>
        <ContentText>
          <p>
            Si tiene preguntas, inquietudes o solicitudes relacionadas con esta
            Política de Privacidad o el manejo de su información personal, puede
            contactarnos a través de:
          </p>
          <ul>
            <li>
              <strong>Correo Electrónico:</strong>{" "}
              {config.textos?.ubicacion?.email || "info@maxximundo.com"}
            </li>
            <li>
              <strong>Teléfono:</strong>{" "}
              {config.textos?.ubicacion?.telefono || "+593 (07) 2800 022"}
            </li>
            <li>
              <strong>Dirección:</strong>{" "}
              {config.textos?.ubicacion?.direccion ||
                "Gonzales Suarez y Gonzalo Saldumbide, Cuenca, Ecuador"}
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <LastUpdated>
        <Text variant="p" color="gray" size="sm">
          Última actualización:{" "}
          {new Date().toLocaleDateString("es-EC", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </LastUpdated>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
