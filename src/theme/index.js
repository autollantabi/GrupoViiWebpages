import { getEmpresaTheme } from '../config/empresas';

// Tema por defecto (Ikonix)
const defaultTheme = {
  colors: {
    primary: '#79c3d2',
    secondary: '#303030',
    accent: '#FFB800',
    white: '#FFFFFF',
    light: '#FFFFFF',
    dark: '#333333',
    gray: '#EFEFEF',
    lightGray: '#F8F8F8',
    text: {
      primary: '#333333',
      secondary: '#666666',
      light: '#FFFFFF',
    }
  },
  fonts: {
    main: '"Raleway", sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  },
};

// Obtener tema dinámico basado en la empresa
const getDynamicTheme = () => {
  try {
    // Usar import.meta.env para variables de entorno en Vite
    const nombreEmpresa = import.meta.env.VITE_EMPRESA_NOMBRE || '';
    return getEmpresaTheme(nombreEmpresa);
  } catch (error) {
    console.warn('Error al obtener tema dinámico, usando tema por defecto:', error);
    return defaultTheme;
  }
};

export const theme = getDynamicTheme();
export default theme;