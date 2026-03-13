import styled from "styled-components";
import Text from "../components/ui/Text";
import { useEmpresa } from "../hooks/useEmpresa";
import SEO from "../components/seo/SEO";

const DataProtectionContainer = styled.div`
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

const DataProtectionHeader = styled.div`
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
 * Página de Protección de Datos
 */
const DataProtection = () => {
  const { empresa } = useEmpresa();

  return (
    <DataProtectionContainer>
      <SEO
        title="Protección de Datos"
        description="Política de protección de datos. Conoce cómo protegemos tus datos personales conforme a la legislación vigente."
        keywords="protección de datos, datos personales, LOPDP, seguridad de datos"
      />
      <DataProtectionHeader>
        <Text variant="h1" align="center">
          Protección de Datos
        </Text>
        <Text
          variant="p"
          align="center"
          size="lg"
          color="gray"
          maxWidth="700px"
          style={{ margin: "0 auto", lineHeight: "1.6" }}
        >
          {empresa?.toUpperCase()}
        </Text>
      </DataProtectionHeader>

      <ContentSection>
        <SectionTitle>1. Identificación del responsable del Tratamiento</SectionTitle>
        <ContentText>
          <p>
            Responsable del tratamiento: {empresa?.toUpperCase()},
            <br />
            Domicilio: Ecuador
            <br />
            Sitio web: https://{empresa?.toLowerCase()}.com/
            <br />
            Correo de contacto para protección de datos personales: <strong>pdp@{empresa?.toLowerCase()}.com</strong>
          </p>
          <p>
            {empresa?.toUpperCase()} determina las finalidades y los medios del tratamiento de los datos personales 
            que se recopilan a través de su plataforma digital, en observancia de los principios de licitud, lealtad,
            transparencia, finalidad, minimización y responsabilidad proactiva.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>2. Delegado de Protección de Datos (DPO / DPD)</SectionTitle>
        <ContentText>
          <p>
            Delegado de Protección de Datos designado: <strong>Ing. Marco David Rivadeneira Fuentes</strong>.
            <br />
            Para temas relacionados con protección de datos personales y ejercicio de derechos, el canal oficial de atención es: 
            <strong>pdp@{empresa?.toLowerCase()}.com</strong>
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>3. ¿Qué hacemos con su información?</SectionTitle>
        <ContentText>
          <p>
            Cuando usted realiza una compra en nuestra tienda o utiliza funcionalidades del sitio, 
            recopilamos la información personal que usted nos proporciona, como su nombre, 
            número de identificación, dirección, correo electrónico, número de teléfono y 
            los datos necesarios para facturar, procesar pagos y realizar la entrega de sus productos. 
            También recopilamos información técnica (por ejemplo, dirección IP, tipo de navegador, 
            sistema operativo e identificadores de sesión) con el fin de mejorar la seguridad, el funcionamiento y 
            la experiencia de navegación en nuestra plataforma.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>4. Datos personales que se tratan</SectionTitle>
        <ContentText>
          <p>
            {empresa?.toUpperCase()} podrá tratar las siguientes categorías de datos personales:
          </p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              <strong>Datos identificativos y de contacto:</strong> nombres, número de identificación, dirección, correo electrónico y número telefónico.
            </li>
            <li>
              <strong>Datos de facturación y transacción:</strong> información necesaria para facturar, procesar cobros, gestionar devoluciones y cumplir obligaciones legales.
            </li>
            <li>
              <strong>Datos técnicos y de navegación:</strong> dirección IP, tipo de navegador, sistema operativo, registros de seguridad e identificadores de sesión.
            </li>
          </ul>
          <p>
            {empresa?.toUpperCase()} no trata datos sensibles de forma innecesaria o desproporcionada.
             En caso de requerirse por una obligación legal o por una funcionalidad específica, 
             se aplicarán las salvaguardas correspondientes y, cuando aplique, se solicitará consentimiento expreso.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>5. Finalidades del tratamiento</SectionTitle>
        <ContentText>
          <p>Utilizamos sus datos personales para:</p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              Procesar compras, pagos, facturación y envíos.
            </li>
            <li>
              Gestionar solicitudes, consultas, devoluciones, garantías o reclamos.
            </li>
            <li>
              Cumplir obligaciones legales, tributarias, regulatorias y de seguridad.
            </li>
            <li>
              Mejorar la seguridad y el funcionamiento de la plataforma.
            </li>
            <li>
              Llevar un historial de compras y brindar soporte al cliente.
            </li>
            <li>
              Prevenir fraude, usos indebidos del sistema y actividades de lavado de activos, así como cumplir verificaciones que exijan entidades financieras u organismos de control conforme a la normativa aplicable.
            </li>
            <li>
              Enviar comunicaciones comerciales o promociones solo si usted nos autoriza expresamente (marketing).
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>6. Base legal del tratamiento</SectionTitle>
        <ContentText>
          <p>Tratamos sus datos personales con fundamento en:</p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              Ejecución del contrato de compraventa y medidas precontractuales solicitadas por el usuario.
            </li>
            <li>
              Cumplimiento de obligaciones legales aplicables (por ejemplo, tributarias y regulatorias).
            </li>
            <li>
              Consentimiento del titular (para marketing y comunicaciones opcionales).
            </li>
            <li>
              Interés legítimo debidamente ponderado para prevenir fraude y garantizar la seguridad transaccional.
            </li>
            <li>
              Cumplimiento de obligaciones legales relacionadas con prevención de fraude, financiamiento de delitos y lavado de activos, cuando corresponda.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>7. Encargados externos, destinatarios y transferencias</SectionTitle>
        <ContentText>
          <p>Podemos compartir su información únicamente con terceros estrictamente necesarios para la operación del servicio, tales como:</p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              La pasarela de pagos certificada que procesa las transacciones.
            </li>
            <li>
              Empresas de transporte y logística para la entrega de productos.
            </li>
            <li>
              Proveedores tecnológicos (hosting, correo electrónico, almacenamiento seguro, soporte técnico).
            </li>
            <li>
              Autoridades competentes cuando exista una obligación legal.
            </li>
          </ul>
          <p>
            {empresa?.toUpperCase()} no vende ni comercializa datos personales. Cualquier transferencia nacional o internacional se realizará conforme a la normativa aplicable y con garantías adecuadas.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>8. Plazos de conservación</SectionTitle>
        <ContentText>
          <p>Los datos personales se conservarán únicamente por el tiempo necesario para cumplir su finalidad y los plazos legales aplicables:</p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              Datos de facturación: 7 años (requerimiento tributario).
            </li>
            <li>
              Datos de compras y entregas: mientras sean necesarios para la relación contractual, atención de garantías, devoluciones y plazos de prescripción aplicables.
            </li>
            <li>
              Datos de marketing: hasta que usted retire su consentimiento o solicite la oposición al tratamiento.
            </li>
            <li>
              Datos de técnicos y de navegación: por los tiempos técnicos necesarios para la seguridad del sistema y prevención de incidentes.
            </li>
          </ul>
          <p>
            Una vez cumplida la finalidad y plazos aplicables, los datos serán eliminados, anonimizados o bloqueados de forma segura, según corresponda.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>9. Cookies y tecnologías de rastreo</SectionTitle>
        <ContentText>
          <p>
            El sitio web puede utilizar cookies y tecnologías similares para permitir el funcionamiento del sitio, mejorar la experiencia del usuario y, cuando aplique, realizar mediciones analíticas. Las cookies pueden ser:
          </p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              Cookies técnicas o necesarias: indispensables para el funcionamiento del sitio y sus funciones de seguridad.
            </li>
            <li>
              Cookies de análisis: permiten obtener métricas agregadas sobre uso y rendimiento.
            </li>
            <li>
              Cookies de publicidad (si llegaran a utilizarse): orientadas a mostrar contenidos o promociones según intereses; solo se activarán cuando exista el consentimiento correspondiente.
            </li>
          </ul>
          <p>
            El usuario puede aceptar o rechazar cookies no necesarias mediante los mecanismos disponibles en el sitio y/o la configuración del navegador. En caso de participar terceros en analítica o publicidad, se informará al usuario y se habilitarán opciones de control.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>10. Pagos y datos de tarjeta</SectionTitle>
        <ContentText>
          <p>Los pagos realizados en nuestra plataforma son procesados exclusivamente mediante una pasarela de pagos certificada, la cual cumple con estándares internacionales de seguridad PCI-DSS.</p>
          <p><strong>{empresa?.toUpperCase()}:</strong></p>
          <ul style={{ listStyleType: "square" }}>
            <li>
              No almacena, registra ni tiene acceso al número completo de su tarjeta.
            </li>
            <li>
              No almacena ni tiene acceso al código CVV ni a otra información confidencial del medio de pago.
            </li>
            <li>
              No procesa directamente los datos de tarjeta; estos se transmiten cifrados a la pasarela correspondiente.
            </li>
          </ul>
          <p>
            Aunque adoptamos medidas razonables para proteger su información, las transacciones no reconocidas o usos fraudulentos de tarjetas que se originen fuera de nuestra plataforma deben gestionarse directamente con el banco emisor conforme a la normativa financiera aplicable.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>11. Seguridad de la información</SectionTitle>
        <ContentText>
          <p>
            {empresa?.toUpperCase()} implementa medidas técnicas y organizativas razonables y proporcionales al riesgo para proteger los datos personales, incluyendo conexiones seguras (SSL), cifrado, controles de acceso, autenticación, registros de actividad, copias de seguridad y mantenimiento continuo.
          </p>
          <p>
            Estas medidas se aplican para prevenir accesos no autorizados, pérdidas, alteraciones o usos indebidos de la información.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>12. Tratamiento de datos de menores de edad</SectionTitle>
        <ContentText>
          <p>
            Este sitio web y los servicios ofrecidos no están dirigidos a menores de edad. Al utilizar la plataforma, usted declara que tiene al menos 18 años.
          </p>
          <p>
            Si se identifica que un menor ha proporcionado datos personales sin la autorización de su representante legal, {empresa?.toUpperCase()} procederá a eliminar dicha información de manera segura. En caso de que en el futuro se ofrezcan servicios destinados a menores, se solicitará previamente el consentimiento verificable del representante legal conforme a la LOPDP.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>13. Derechos de los titulares y procedimiento para ejercerlos</SectionTitle>
        <ContentText>
          <p>
            El titular puede ejercer, entre otros, los derechos de: acceso, rectificación, actualización, eliminación, oposición, suspensión del tratamiento, portabilidad, revocatoria del consentimiento y a no ser objeto de decisiones automatizadas cuando corresponda.
          </p>
          <p>
            Para ejercer sus derechos, los titulares de datos personales deberán utilizar exclusivamente el Formulario para Ejercer Derechos, disponible para descarga en el sitio web institucional de {empresa?.toUpperCase()} (https://{empresa?.toLowerCase()}.com/).
          </p>
          <p>
            Una vez completado el formulario, el titular deberá enviarlo por correo electrónico a: <strong>pdp@{empresa?.toLowerCase()}.com</strong>, adjuntando una copia de su documento de identidad. En caso de que la solicitud sea presentada por un tercero, deberá incluirse adicionalmente la autorización o poder correspondiente, junto con la identificación del representante.
          </p>
          <p>
            Adicionalmente, el titular podrá presentar reclamos ante la Superintendencia de Protección de Datos Personales (SPDP), conforme a la ley.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>14. Incidentes de seguridad y limitación de responsabilidad</SectionTitle>
        <ContentText>
          <p>
            {empresa?.toUpperCase()} cumple con su deber de seguridad conforme a la LOPDP. Sin perjuicio de ello, ninguna transmisión o almacenamiento electrónico es 100% seguro.
          </p>
          <p>
            En caso de incidentes de seguridad que comprometan datos personales, {empresa?.toUpperCase()} actuará con diligencia adoptando medidas correctivas y, cuando corresponda, notificará a la autoridad competente y a los titulares de los datos conforme a la LOPDP y a las directrices de la SPDP.
          </p>
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
    </DataProtectionContainer>
  );
};

export default DataProtection;
