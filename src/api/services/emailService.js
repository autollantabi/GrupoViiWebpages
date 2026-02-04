import apiService from "./apiService";
import { API_ENDPOINTS } from "../config/api";

// Límites de longitud para evitar abuso y payloads excesivos
const MAX_LENGTHS = {
  nombre: 100,
  correo: 254,
  telefono: 20,
  ciudad: 100,
  provincia: 100,
  asunto: 200,
  mensaje: 2000,
  codigoProducto: 100,
  empresa: 50,
};

// Sanitiza strings: elimina caracteres de control y normaliza espacios
const sanitizeString = (str, maxLength) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/[\x00-\x1F\x7F]/g, "") // Eliminar caracteres de control
    .trim()
    .slice(0, maxLength);
};

class EmailService {
  /**
   * Envía una solicitud de cotización de producto
   * @param {Object} cotizacionData - Datos de la cotización
   * @param {string} cotizacionData.nombre - Nombre del cliente
   * @param {string} cotizacionData.correo - Correo electrónico del cliente
   * @param {string} cotizacionData.telefono - Teléfono del cliente
   * @param {string} cotizacionData.ciudad - Ciudad del cliente
   * @param {string} cotizacionData.provincia - Provincia del cliente
   * @param {string} cotizacionData.codigoProducto - Código del producto
   * @param {string} cotizacionData.empresa - Nombre de la empresa
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async enviarCotizacion(cotizacionData) {
    try {
      // Validar datos requeridos
      const requiredFields = [
        'nombre', 'correo', 'telefono', 'ciudad', 'provincia', 'codigoProducto', 'empresa'
      ];
      
      for (const field of requiredFields) {
        const value = cotizacionData[field];
        if (!value || String(value).trim() === "") {
          throw new Error(`El campo ${field} es requerido`);
        }
        const maxLen = MAX_LENGTHS[field];
        if (maxLen && String(value).length > maxLen) {
          throw new Error(`El campo ${field} no puede superar ${maxLen} caracteres`);
        }
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cotizacionData.correo)) {
        throw new Error("El formato del correo electrónico no es válido");
      }

      // Preparar y sanitizar datos para envío
      const payload = {
        nombre: sanitizeString(cotizacionData.nombre, MAX_LENGTHS.nombre),
        correo: sanitizeString(cotizacionData.correo, MAX_LENGTHS.correo).toLowerCase(),
        telefono: sanitizeString(cotizacionData.telefono, MAX_LENGTHS.telefono),
        ciudad: sanitizeString(cotizacionData.ciudad, MAX_LENGTHS.ciudad),
        provincia: sanitizeString(cotizacionData.provincia, MAX_LENGTHS.provincia),
        codigoProducto: sanitizeString(cotizacionData.codigoProducto, MAX_LENGTHS.codigoProducto),
        empresa: sanitizeString(cotizacionData.empresa, MAX_LENGTHS.empresa),
      };

      const response = await apiService.post(
        API_ENDPOINTS.EMAIL.COTIZACION,
        payload
      );

      return response;
    } catch (error) {
      console.error('Error al enviar cotización:', error);
      throw new Error(`No se pudo enviar la cotización: ${error.message}`);
    }
  }

  /**
   * Envía un comentario o consulta desde la página de contacto
   * @param {Object} comentarioData - Datos del comentario
   * @param {string} comentarioData.nombre - Nombre del cliente
   * @param {string} comentarioData.correo - Correo electrónico del cliente
   * @param {string} comentarioData.telefono - Teléfono del cliente
   * @param {string} comentarioData.asunto - Asunto del mensaje
   * @param {string} comentarioData.mensaje - Mensaje del cliente
   * @param {string} comentarioData.empresa - Nombre de la empresa
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async enviarComentario(comentarioData) {
    try {
      // Validar datos requeridos
      const requiredFields = [
        'nombre', 'correo', 'telefono', 'asunto', 'mensaje', 'empresa'
      ];
      
      for (const field of requiredFields) {
        const value = comentarioData[field];
        if (!value || String(value).trim() === "") {
          throw new Error(`El campo ${field} es requerido`);
        }
        const maxLen = MAX_LENGTHS[field];
        if (maxLen && String(value).length > maxLen) {
          throw new Error(`El campo ${field} no puede superar ${maxLen} caracteres`);
        }
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(comentarioData.correo)) {
        throw new Error("El formato del correo electrónico no es válido");
      }

      // Preparar y sanitizar datos para envío
      const payload = {
        nombre: sanitizeString(comentarioData.nombre, MAX_LENGTHS.nombre),
        correo: sanitizeString(comentarioData.correo, MAX_LENGTHS.correo).toLowerCase(),
        telefono: sanitizeString(comentarioData.telefono, MAX_LENGTHS.telefono),
        asunto: sanitizeString(comentarioData.asunto, MAX_LENGTHS.asunto),
        mensaje: sanitizeString(comentarioData.mensaje, MAX_LENGTHS.mensaje),
        empresa: sanitizeString(comentarioData.empresa, MAX_LENGTHS.empresa),
      };

      const response = await apiService.post(
        API_ENDPOINTS.EMAIL.COMENTARIO,
        payload
      );

      return response;
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      throw new Error(`No se pudo enviar el comentario: ${error.message}`);
    }
  }
}

// Crear una instancia única del servicio
const emailService = new EmailService();

export default emailService;
