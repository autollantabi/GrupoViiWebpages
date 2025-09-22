// Configuración
export { API_CONFIG, API_ENDPOINTS, buildApiUrl } from './config/api';
export { COMPANY_CONFIG, getEmpresaNombre, validateEmpresaNombre } from './config/company';

// Servicios
export { default as apiService } from './services/apiService';
export { default as productService } from './services/productService';
export { default as emailService } from './services/emailService';

// Hooks
export { useProducts } from './hooks/useProducts';
