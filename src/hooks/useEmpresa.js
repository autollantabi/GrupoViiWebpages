import { useMemo } from "react";
import { getEmpresaConfig, getEmpresaTheme } from "../config/empresas";

/**
 * Hook para obtener la configuración de la empresa actual
 * @returns {Object} Configuración completa de la empresa
 */
export const useEmpresa = () => {
  // Obtener el nombre de la empresa desde la variable de entorno
  const nombreEmpresa = import.meta.env.VITE_EMPRESA_NOMBRE;

  const config = useMemo(() => {
    const result = getEmpresaConfig(nombreEmpresa);
    return result;
  }, [nombreEmpresa]);

  const theme = useMemo(() => {
    return getEmpresaTheme(nombreEmpresa);
  }, [nombreEmpresa]);

  return {
    empresa: nombreEmpresa,
    config,
    theme,
  };
};
