export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.3.68:3700',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000, // 10 segundos
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export const API_ENDPOINTS = {
  PRODUCTOS: 'web/productos',
};

// Función para construir URLs completas
export const buildApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Reemplazar parámetros en la URL (ej: {empresaId})
  Object.keys(params).forEach(key => {
    url = url.replace(`{${key}}`, params[key]);
  });
  
  return url;
};
