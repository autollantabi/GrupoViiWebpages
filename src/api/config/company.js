export const COMPANY_CONFIG = {
  // Nombre de la empresa para las llamadas a la API
  EMPRESA_NOMBRE: import.meta.env.VITE_EMPRESA_NOMBRE || 'IKONIX',
  
  // Configuración adicional de la empresa
  NAME: 'Ikonix',
  DESCRIPTION: 'Distribuidor de neumáticos',
  
  // Configuración de la API
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: 3,
};

// Función para obtener el nombre de la empresa
export const getEmpresaNombre = () => {
  return COMPANY_CONFIG.EMPRESA_NOMBRE;
};

// Función para validar que el nombre de la empresa esté configurado
export const validateEmpresaNombre = () => {
  if (!COMPANY_CONFIG.EMPRESA_NOMBRE) {
    throw new Error('EMPRESA_NOMBRE no está configurado en COMPANY_CONFIG');
  }
  return true;
};
