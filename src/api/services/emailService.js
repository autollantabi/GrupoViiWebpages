import apiService from "./apiService";
import { API_ENDPOINTS } from "../config/api";

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
        if (!cotizacionData[field] || cotizacionData[field].trim() === '') {
          throw new Error(`El campo ${field} es requerido`);
        }
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cotizacionData.correo)) {
        throw new Error('El formato del correo electrónico no es válido');
      }

      // Preparar datos para envío
      const payload = {
        nombre: cotizacionData.nombre.trim(),
        correo: cotizacionData.correo.trim().toLowerCase(),
        telefono: cotizacionData.telefono.trim(),
        ciudad: cotizacionData.ciudad.trim(),
        provincia: cotizacionData.provincia.trim(),
        codigoProducto: cotizacionData.codigoProducto.trim(),
        empresa: cotizacionData.empresa.trim(),
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
        if (!comentarioData[field] || comentarioData[field].trim() === '') {
          throw new Error(`El campo ${field} es requerido`);
        }
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(comentarioData.correo)) {
        throw new Error('El formato del correo electrónico no es válido');
      }

      // Preparar datos para envío
      const payload = {
        nombre: comentarioData.nombre.trim(),
        correo: comentarioData.correo.trim().toLowerCase(),
        telefono: comentarioData.telefono.trim(),
        asunto: comentarioData.asunto.trim(),
        mensaje: comentarioData.mensaje.trim(),
        empresa: comentarioData.empresa.trim(),
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
