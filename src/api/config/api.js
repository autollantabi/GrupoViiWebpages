export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.3.68:3700',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000, // 10 segundos
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const API_ENDPOINTS = {
  PRODUCTOS: 'web/productos/{empresa}',
  PRODUCTO_BY_CODIGO: 'web/productos/getProductoByCodigo/{value}/{empresaId}',
  EMAIL: {
    COTIZACION: 'email/cotizacion',
    COMENTARIO: 'email/comentario',
  },
};

// Caracteres permitidos en valores de parámetros URL (evita inyección)
const SAFE_PARAM_REGEX = /^[a-zA-Z0-9_\-.\s]+$/;

/**
 * Construye URLs completas de forma segura.
 * Valida que los valores de params solo contengan caracteres seguros.
 * @param {string} endpoint - Ruta del endpoint (ej: "web/productos")
 * @param {Object} params - Parámetros para reemplazar en la URL (ej: {empresaNombre: "ikonix"})
 * @returns {string} URL completa
 */
export const buildApiUrl = (endpoint, params = {}) => {
  const baseUrl = API_CONFIG.BASE_URL?.replace(/\/$/, "") || "";
  const path = String(endpoint || "").replace(/^\//, "");
  let url = `${baseUrl}/${path}`;

  Object.entries(params).forEach(([key, value]) => {
    const strValue = String(value ?? "");
    if (!SAFE_PARAM_REGEX.test(strValue)) {
      console.warn(`buildApiUrl: valor no permitido en param "${key}"`);
      return;
    }
    url = url.replace(`{${key}}`, encodeURIComponent(strValue));
  });

  return url;
};
