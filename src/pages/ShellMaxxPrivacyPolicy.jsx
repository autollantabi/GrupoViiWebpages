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

const AppBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary}15;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

/**
 * Página de Políticas de Privacidad de la App ShellMaxx
 * App de recompensas de Shell
 * Solo visible para la empresa MAXXIMUNDO
 */
const ShellMaxxPrivacyPolicy = () => {
  const { config } = useEmpresa();

  return (
    <PrivacyPolicyContainer>
      <SEO
        title="Políticas de Privacidad - ShellMaxx App"
        description="Políticas de privacidad de la aplicación ShellMaxx, programa de recompensas de Shell. Conoce cómo protegemos y manejamos tu información personal en nuestra app de recompensas."
        keywords="políticas de privacidad, privacidad, ShellMaxx, app ShellMaxx, recompensas Shell, programa de recompensas, protección de datos, app móvil"
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
          ShellMaxx - Programa de Recompensas Shell
        </Text>
        <AppBadge>
          <Text variant="span" size="sm" noMargin>
            📱 Aplicación Móvil
          </Text>
        </AppBadge>
      </PrivacyPolicyHeader>

      <ContentSection>
        <SectionTitle>1. Introducción</SectionTitle>
        <ContentText>
          <p>
            Bienvenido a ShellMaxx, la aplicación móvil de recompensas de Shell
            operada por Maxximundo. Nos comprometemos a proteger la privacidad y
            seguridad de la información personal de nuestros usuarios. Esta
            Política de Privacidad describe cómo recopilamos, utilizamos,
            almacenamos y protegemos la información que nos proporciona cuando
            utiliza nuestra aplicación móvil ShellMaxx.
          </p>
          <p>
            ShellMaxx es un programa de recompensas que permite a los usuarios
            acumular puntos mediante la compra de productos Shell y canjear esos
            puntos por recompensas exclusivas. Al utilizar ShellMaxx, usted
            acepta las prácticas descritas en esta política. Si no está de
            acuerdo con estas prácticas, le solicitamos que no utilice nuestra
            aplicación.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>2. Información que Recopilamos</SectionTitle>
        <ContentText>
          <p>
            Para brindarle una experiencia personalizada en ShellMaxx y gestionar
            su cuenta de recompensas, recopilamos los siguientes tipos de
            información:
          </p>
          <ul>
            <li>
              <strong>Información de Registro:</strong> Nombre completo, dirección
              de correo electrónico, número de teléfono, fecha de nacimiento,
              dirección física y otra información que nos proporciona al crear su
              cuenta en ShellMaxx.
            </li>
            <li>
              <strong>Información de Transacciones:</strong> Detalles de sus
              compras de productos Shell, incluyendo fecha, monto, tipo de
              producto, ubicación de la compra y puntos acumulados o canjeados.
            </li>
            <li>
              <strong>Información del Dispositivo:</strong> Tipo de dispositivo
              móvil, sistema operativo, identificador único del dispositivo,
              dirección IP, tipo de navegador y otra información técnica
              necesaria para el funcionamiento de la aplicación.
            </li>
            <li>
              <strong>Información de Uso de la App:</strong> Datos sobre cómo
              utiliza ShellMaxx, incluyendo páginas visitadas dentro de la app,
              funciones utilizadas, tiempo de uso, patrones de navegación y
              preferencias de configuración.
            </li>
            <li>
              <strong>Información de Ubicación:</strong> Si usted lo permite,
              podemos recopilar información sobre su ubicación geográfica para
              brindarle ofertas personalizadas basadas en su ubicación y
              localizar puntos de venta Shell cercanos.
            </li>
            <li>
              <strong>Información de Recompensas:</strong> Historial de puntos
              acumulados, puntos canjeados, recompensas solicitadas y estado de
              las recompensas.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>3. Uso de la Información</SectionTitle>
        <ContentText>
          <p>
            Utilizamos la información recopilada para los siguientes fines:
          </p>
          <ul>
            <li>
              <strong>Gestión de la Cuenta:</strong> Crear y administrar su cuenta
              de usuario en ShellMaxx, verificar su identidad y procesar sus
              solicitudes.
            </li>
            <li>
              <strong>Programa de Recompensas:</strong> Gestionar su
              participación en el programa de recompensas, incluyendo el
              seguimiento de puntos, procesamiento de canjes y entrega de
              recompensas.
            </li>
            <li>
              <strong>Personalización:</strong> Personalizar su experiencia en la
              aplicación, incluyendo ofertas, promociones y recomendaciones
              basadas en sus preferencias y historial de compras.
            </li>
            <li>
              <strong>Comunicación:</strong> Enviarle notificaciones sobre su
              cuenta, puntos acumulados, ofertas especiales, nuevas recompensas
              disponibles y actualizaciones importantes de la aplicación.
            </li>
            <li>
              <strong>Mejora de Servicios:</strong> Analizar el uso de la
              aplicación para mejorar nuestros servicios, desarrollar nuevas
              funcionalidades y optimizar la experiencia del usuario.
            </li>
            <li>
              <strong>Cumplimiento Legal:</strong> Cumplir con obligaciones
              legales y regulatorias, responder a solicitudes gubernamentales y
              hacer cumplir nuestros términos y condiciones.
            </li>
            <li>
              <strong>Seguridad:</strong> Prevenir fraudes, proteger la seguridad
              de nuestros usuarios y detectar actividades sospechosas.
            </li>
            <li>
              <strong>Investigación y Análisis:</strong> Realizar estudios y
              análisis estadísticos para mejorar nuestros productos y servicios.
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
              <strong>Shell Internacional:</strong> Como ShellMaxx es un programa
              de recompensas de Shell, podemos compartir información con Shell
              International para la gestión del programa y el cumplimiento de
              acuerdos corporativos, siempre sujeto a estrictos acuerdos de
              confidencialidad.
            </li>
            <li>
              <strong>Proveedores de Servicios:</strong> Compartimos información
              con proveedores que nos ayudan a operar la aplicación, procesar
              pagos, enviar comunicaciones y gestionar las recompensas, todos
              sujetos a acuerdos de confidencialidad y cumplimiento de esta
              política.
            </li>
            <li>
              <strong>Socios de Entrega:</strong> Si canjea una recompensa física,
              compartiremos su información de contacto con socios de entrega
              necesarios para completar el envío.
            </li>
            <li>
              <strong>Cumplimiento Legal:</strong> Podemos divulgar información
              cuando sea requerido por ley, orden judicial, proceso legal o
              solicitud gubernamental.
            </li>
            <li>
              <strong>Protección de Derechos:</strong> Podemos compartir
              información para proteger nuestros derechos, propiedad o seguridad,
              así como la de nuestros usuarios, empleados o terceros.
            </li>
            <li>
              <strong>Con su Consentimiento:</strong> Compartiremos información
              con terceros cuando usted nos dé su consentimiento explícito para
              hacerlo.
            </li>
            <li>
              <strong>Transferencias Empresariales:</strong> En caso de fusión,
              adquisición o venta de activos, su información puede ser
              transferida como parte de la transacción.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>5. Programa de Recompensas y Puntos</SectionTitle>
        <ContentText>
          <p>
            Como parte del programa ShellMaxx, su información de transacciones y
            puntos es esencial para el funcionamiento del programa:
          </p>
          <ul>
            <li>
              <strong>Acreditación de Puntos:</strong> Utilizamos la información
              de sus compras para acreditar puntos a su cuenta según las reglas
              del programa.
            </li>
            <li>
              <strong>Canje de Recompensas:</strong> Cuando canjea puntos por
              recompensas, procesamos su solicitud y utilizamos su información
              para entregar la recompensa.
            </li>
            <li>
              <strong>Historial de Actividad:</strong> Mantenemos un historial
              completo de todas sus actividades de puntos y recompensas para su
              referencia y para resolver cualquier disputa.
            </li>
            <li>
              <strong>Comunicaciones del Programa:</strong> Le enviamos
              notificaciones sobre su saldo de puntos, nuevas recompensas
              disponibles, ofertas especiales y recordatorios sobre puntos que
              están por vencer.
            </li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>6. Seguridad de la Información</SectionTitle>
        <ContentText>
          <p>
            Implementamos medidas de seguridad técnicas, administrativas y físicas
            de nivel empresarial para proteger su información personal contra
            acceso no autorizado, alteración, divulgación o destrucción. Estas
            medidas incluyen:
          </p>
          <ul>
            <li>
              <strong>Cifrado de Datos:</strong> Cifrado de extremo a extremo
              para datos en tránsito y en reposo utilizando estándares de la
              industria.
            </li>
            <li>
              <strong>Autenticación Segura:</strong> Múltiples factores de
              autenticación y sistemas de verificación para proteger el acceso a
              su cuenta.
            </li>
            <li>
              <strong>Monitoreo Continuo:</strong> Monitoreo 24/7 de nuestros
              sistemas para detectar y prevenir actividades sospechosas.
            </li>
            <li>
              <strong>Acceso Restringido:</strong> Acceso a información personal
              solo para empleados autorizados que necesitan esta información para
              realizar su trabajo.
            </li>
            <li>
              <strong>Actualizaciones Regulares:</strong> Actualizaciones
              constantes de seguridad y parches para proteger contra nuevas
              vulnerabilidades.
            </li>
            <li>
              <strong>Copias de Seguridad:</strong> Copias de seguridad regulares
              y protegidas de todos los datos.
            </li>
            <li>
              <strong>Capacitación del Personal:</strong> Capacitación regular de
              nuestro personal sobre prácticas de seguridad y privacidad de datos.
            </li>
          </ul>
          <p>
            Sin embargo, ningún método de transmisión por Internet o
            almacenamiento electrónico es 100% seguro. Aunque nos esforzamos por
            proteger su información utilizando los mejores estándares de la
            industria, no podemos garantizar su seguridad absoluta.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>7. Sus Derechos</SectionTitle>
        <ContentText>
          <p>
            Usted tiene los siguientes derechos respecto a su información
            personal en ShellMaxx:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> Puede solicitar acceso a la información
              personal que tenemos sobre usted, incluyendo su historial de puntos
              y recompensas.
            </li>
            <li>
              <strong>Rectificación:</strong> Puede solicitar la corrección de
              información inexacta o incompleta a través de la configuración de
              su cuenta o contactándonos directamente.
            </li>
            <li>
              <strong>Eliminación:</strong> Puede solicitar la eliminación de su
              información personal. Tenga en cuenta que la eliminación de su
              cuenta resultará en la pérdida de todos sus puntos y recompensas
              acumulados.
            </li>
            <li>
              <strong>Portabilidad:</strong> Puede solicitar una copia de su
              información en un formato estructurado y de uso común.
            </li>
            <li>
              <strong>Oposición:</strong> Puede oponerse al procesamiento de su
              información para ciertos fines, como marketing directo.
            </li>
            <li>
              <strong>Retiro del Consentimiento:</strong> Puede retirar su
              consentimiento en cualquier momento cuando el procesamiento se base
              en su consentimiento.
            </li>
            <li>
              <strong>Limitación del Procesamiento:</strong> Puede solicitar que
              limitemos el procesamiento de su información en ciertas
              circunstancias.
            </li>
            <li>
              <strong>Revocación de Permisos:</strong> Puede revocar permisos de
              la aplicación, como acceso a ubicación, a través de la
              configuración de su dispositivo.
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, puede:
          </p>
          <ul>
            <li>Acceder a la configuración de su cuenta en la aplicación</li>
            <li>Contactarnos a través de los medios proporcionados en la sección de contacto</li>
            <li>Enviar una solicitud escrita a nuestra dirección oficial</li>
          </ul>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>8. Retención de Datos</SectionTitle>
        <ContentText>
          <p>
            Conservamos su información personal durante el tiempo necesario para
            cumplir con los fines descritos en esta política, a menos que la ley
            requiera o permita un período de retención más largo. Específicamente:
          </p>
          <ul>
            <li>
              <strong>Información de Cuenta:</strong> Mientras su cuenta esté
              activa y durante un período adicional de 3 años después de la
              desactivación para fines de cumplimiento legal.
            </li>
            <li>
              <strong>Información de Transacciones:</strong> Durante 7 años desde
              la fecha de la transacción para fines contables y fiscales.
            </li>
            <li>
              <strong>Historial de Puntos:</strong> Mientras su cuenta esté activa
              y hasta 1 año después de que todos los puntos hayan sido utilizados
              o hayan expirado.
            </li>
            <li>
              <strong>Registros de Seguridad:</strong> Durante 2 años para fines
              de seguridad y prevención de fraudes.
            </li>
          </ul>
          <p>
            Cuando ya no necesitemos su información personal, la eliminaremos de
            forma segura utilizando métodos que impidan la recuperación de datos.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>9. Menores de Edad</SectionTitle>
        <ContentText>
          <p>
            ShellMaxx está dirigida a usuarios mayores de 18 años. No recopilamos
            intencionalmente información personal de menores de edad. Si
            descubrimos que hemos recopilado información de un menor sin el
            consentimiento parental o que un menor ha creado una cuenta de manera
            incorrecta, tomaremos medidas inmediatas para:
          </p>
          <ul>
            <li>Eliminar la cuenta y toda la información asociada</li>
            <li>Canceler todos los puntos acumulados</li>
            <li>Cancelar cualquier recompensa pendiente</li>
            <li>Notificar al usuario sobre la eliminación</li>
          </ul>
          <p>
            Si usted es padre o tutor y cree que su hijo menor de edad nos ha
            proporcionado información personal, por favor contáctenos
            inmediatamente.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>10. Cookies y Tecnologías Similares</SectionTitle>
        <ContentText>
          <p>
            Utilizamos cookies, balizas web, píxeles de seguimiento y otras
            tecnologías similares para:
          </p>
          <ul>
            <li>Mantener su sesión activa en la aplicación</li>
            <li>Recordar sus preferencias y configuraciones</li>
            <li>Analizar el uso de la aplicación y mejorar nuestros servicios</li>
            <li>Personalizar su experiencia y ofrecer contenido relevante</li>
            <li>Medir la efectividad de nuestras campañas y comunicaciones</li>
            <li>Proporcionar funciones de seguridad</li>
          </ul>
          <p>
            Puede controlar el uso de cookies y tecnologías similares a través de
            la configuración de su dispositivo móvil. Sin embargo, tenga en cuenta
            que deshabilitar ciertas cookies puede afectar la funcionalidad de la
            aplicación.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>11. Notificaciones Push</SectionTitle>
        <ContentText>
          <p>
            ShellMaxx puede enviarle notificaciones push sobre:
          </p>
          <ul>
            <li>Puntos acreditados a su cuenta</li>
            <li>Nuevas recompensas disponibles</li>
            <li>Ofertas especiales y promociones</li>
            <li>Recordatorios sobre puntos que están por vencer</li>
            <li>Actualizaciones importantes de la aplicación</li>
            <li>Estado de sus canjes de recompensas</li>
          </ul>
          <p>
            Puede controlar las notificaciones push a través de la configuración
            de su dispositivo o dentro de la configuración de la aplicación. Puede
            optar por no recibir ciertas notificaciones mientras mantiene otras
            habilitadas.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>12. Transferencias Internacionales</SectionTitle>
        <ContentText>
          <p>
            Como ShellMaxx es un programa global de Shell, su información puede
            ser transferida y procesada en países fuera de Ecuador, incluyendo
            países que pueden tener leyes de protección de datos diferentes. En
            tales casos, nos aseguramos de que se implementen salvaguardias
            adecuadas para proteger su información de acuerdo con esta política.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>13. Cambios a esta Política</SectionTitle>
        <ContentText>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente para
            reflejar cambios en nuestras prácticas, servicios o requisitos
            legales. Le notificaremos sobre cambios significativos mediante:
          </p>
          <ul>
            <li>Una notificación destacada en la aplicación</li>
            <li>Un correo electrónico a la dirección registrada en su cuenta</li>
            <li>Una notificación push (si tiene habilitadas las notificaciones)</li>
            <li>Actualización de la fecha de "Última actualización" en esta página</li>
          </ul>
          <p>
            Los cambios entrarán en vigor inmediatamente después de la
            publicación, a menos que se indique lo contrario. Le recomendamos
            revisar esta política periódicamente para mantenerse informado sobre
            cómo protegemos su información.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>14. Términos del Programa de Recompensas</SectionTitle>
        <ContentText>
          <p>
            Además de esta Política de Privacidad, su participación en ShellMaxx
            está sujeta a nuestros Términos y Condiciones del Programa de
            Recompensas, que incluyen información sobre:
          </p>
          <ul>
            <li>Reglas para acumular puntos</li>
            <li>Reglas para canjear recompensas</li>
            <li>Expiración de puntos</li>
            <li>Limitaciones y restricciones del programa</li>
            <li>Condiciones de cancelación de cuenta</li>
          </ul>
          <p>
            Le recomendamos revisar también nuestros Términos y Condiciones para
            una comprensión completa de su participación en ShellMaxx.
          </p>
        </ContentText>
      </ContentSection>

      <ContentSection>
        <SectionTitle>15. Contacto</SectionTitle>
        <ContentText>
          <p>
            Si tiene preguntas, inquietudes o solicitudes relacionadas con esta
            Política de Privacidad, el manejo de su información personal, o
            desea ejercer sus derechos, puede contactarnos a través de:
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
            <li>
              <strong>Dentro de la App:</strong> Puede contactarnos directamente
              desde la sección de "Ayuda" o "Soporte" en la aplicación ShellMaxx
            </li>
          </ul>
          <p>
            Nos comprometemos a responder a sus consultas en un plazo máximo de
            30 días hábiles.
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
    </PrivacyPolicyContainer>
  );
};

export default ShellMaxxPrivacyPolicy;


