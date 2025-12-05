import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";

/**
 * Hook para sincronizar el estado del catálogo con la URL
 * Maneja: línea, filtros, página, ordenamiento, elementos por página
 */
const useCatalogURL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Valores por defecto
  const defaults = {
    linea: null,
    page: "1",
    sort: "destacados",
    perPage: "192",
  };

  // Obtener valores de la URL
  const getURLParam = useCallback(
    (key, defaultValue = null) => {
      const value = searchParams.get(key);
      return value !== null ? value : defaultValue;
    },
    [searchParams]
  );

  // Obtener todos los filtros de la URL (p1, p2, p3, etc. y DMA_*)
  const getURLFilters = useCallback(() => {
    const filters = {};
    
    // Obtener filtros del flujo (p1, p2, p3, etc.)
    searchParams.forEach((value, key) => {
      if (key.startsWith("p") && /^\d+$/.test(key.substring(1))) {
        const stepIndex = parseInt(key.substring(1)) - 1;
        filters[`p${stepIndex + 1}`] = value;
      }
      // Obtener filtros adicionales (DMA_*)
      else if (key.startsWith("DMA_")) {
        filters[key] = value;
      }
    });

    return filters;
  }, [searchParams]);

  // Actualizar un parámetro en la URL
  const updateURLParam = useCallback(
    (key, value, options = {}) => {
      const newParams = new URLSearchParams(searchParams);
      
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }

      // Si se especifica replace, usar replace en lugar de push
      if (options.replace) {
        setSearchParams(newParams, { replace: true });
      } else {
        setSearchParams(newParams, { replace: false });
      }
    },
    [searchParams, setSearchParams]
  );

  // Actualizar múltiples parámetros a la vez
  const updateURLParams = useCallback(
    (updates, options = {}) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      if (options.replace) {
        setSearchParams(newParams, { replace: true });
      } else {
        setSearchParams(newParams, { replace: false });
      }
    },
    [searchParams, setSearchParams]
  );

  // Limpiar todos los parámetros del catálogo
  const clearCatalogParams = useCallback(() => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams, { replace: true });
  }, [setSearchParams]);

  // Obtener valores específicos del catálogo de la URL
  const catalogState = {
    linea: getURLParam("linea"),
    page: parseInt(getURLParam("page", defaults.page)) || 1,
    sort: getURLParam("sort", defaults.sort),
    perPage: parseInt(getURLParam("perPage", defaults.perPage)) || 192,
    filters: getURLFilters(),
    search: getURLParam("search", ""),
  };

  // Función para establecer línea
  const setLinea = useCallback(
    (linea) => {
      if (linea) {
        const lineaSlug = linea.toLowerCase().replace(/\s+/g, "-");
        const updates = { 
          linea: lineaSlug, 
          page: "1",
          sort: defaults.sort,
          perPage: defaults.perPage,
        };
        
        // Limpiar todos los filtros adicionales (DMA_*) al cambiar de línea
        searchParams.forEach((value, key) => {
          if (key.startsWith("DMA_")) {
            updates[key] = null;
          }
        });
        
        // Limpiar todos los filtros del flujo (p1, p2, p3, etc.)
        searchParams.forEach((value, key) => {
          if (key.startsWith("p") && /^\d+$/.test(key.substring(1))) {
            updates[key] = null;
          }
        });
        
        // Limpiar búsqueda
        updates.search = null;
        
        updateURLParams(updates, { replace: false });
      } else {
        updateURLParam("linea", null);
      }
    },
    [updateURLParam, updateURLParams, searchParams]
  );

  // Función para establecer filtros del flujo (p1, p2, p3, etc.)
  const setFlowFilters = useCallback(
    (filters, flowConfig) => {
      const updates = {};
      
      if (flowConfig && flowConfig.steps) {
        // Limpiar todos los filtros del flujo primero
        searchParams.forEach((value, key) => {
          if (key.startsWith("p") && /^\d+$/.test(key.substring(1))) {
            updates[key] = null;
          }
        });

        // Establecer nuevos filtros
        flowConfig.steps.forEach((step, index) => {
          const filterValue = filters[step.id];
          if (filterValue) {
            updates[`p${index + 1}`] = filterValue;
          }
        });
      }

      // Resetear página cuando cambian los filtros
      updates.page = "1";
      updateURLParams(updates, { replace: false });
    },
    [searchParams, updateURLParams]
  );

  // Función para establecer un filtro adicional (DMA_*)
  const setAdditionalFilter = useCallback(
    (filterId, value) => {
      if (value) {
        updateURLParams({ [filterId]: value, page: "1" }, { replace: false });
      } else {
        updateURLParam(filterId, null);
        updateURLParam("page", "1");
      }
    },
    [updateURLParam, updateURLParams]
  );

  // Función para limpiar un filtro adicional
  const clearAdditionalFilter = useCallback(
    (filterId) => {
      updateURLParams({ [filterId]: null, page: "1" }, { replace: false });
    },
    [updateURLParams]
  );

  // Función para limpiar todos los filtros adicionales
  const clearAllAdditionalFilters = useCallback(() => {
    const updates = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith("DMA_")) {
        updates[key] = null;
      }
    });
    updates.page = "1";
    updateURLParams(updates, { replace: false });
  }, [searchParams, updateURLParams]);

  // Función para establecer página
  const setPage = useCallback(
    (page) => {
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum >= 1) {
        updateURLParam("page", pageNum.toString(), { replace: false });
      }
    },
    [updateURLParam]
  );

  // Función para establecer ordenamiento
  const setSort = useCallback(
    (sort) => {
      updateURLParams({ sort, page: "1" }, { replace: false });
    },
    [updateURLParams]
  );

  // Función para establecer elementos por página
  const setPerPage = useCallback(
    (perPage) => {
      const perPageNum = parseInt(perPage);
      // El mínimo es 192
      const validPerPage = Math.max(192, perPageNum);
      if (!isNaN(validPerPage) && validPerPage >= 192) {
        updateURLParams({ perPage: validPerPage.toString(), page: "1" }, { replace: false });
      }
    },
    [updateURLParams]
  );

  // Función para establecer búsqueda
  const setSearch = useCallback(
    (search) => {
      if (search && search.trim()) {
        updateURLParams({ search: search.trim(), page: "1" }, { replace: false });
      } else {
        updateURLParam("search", null);
        updateURLParam("page", "1");
      }
    },
    [updateURLParam, updateURLParams]
  );

  // Función para construir filtros del flujo desde la URL (compatibilidad con useCatalogFlow)
  const getFlowFiltersFromURL = useCallback(
    (flowConfig) => {
      const filters = {};
      
      if (flowConfig && flowConfig.steps) {
        flowConfig.steps.forEach((step, index) => {
          const paramValue = searchParams.get(`p${index + 1}`);
          if (paramValue) {
            filters[step.id] = paramValue;
          }
        });
      }

      return filters;
    },
    [searchParams]
  );

  // Función para obtener filtros adicionales de la URL
  const getAdditionalFiltersFromURL = useCallback(() => {
    const filters = {};
    
    searchParams.forEach((value, key) => {
      // Solo incluir filtros adicionales con valores válidos
      if (key.startsWith("DMA_")) {
        // Verificar que el valor sea válido (no null, undefined, o string vacío)
        if (value !== null && value !== undefined && value !== "") {
          // Si es string, verificar que no esté vacío después de trim
          if (typeof value === "string" && value.trim() === "") {
            return; // Saltar valores que son solo espacios en blanco
          }
          filters[key] = value;
        }
      }
    });

    return filters;
  }, [searchParams]);

  return {
    // Estado actual de la URL
    catalogState,
    
    // Funciones para actualizar la URL
    setLinea,
    setFlowFilters,
    setAdditionalFilter,
    clearAdditionalFilter,
    clearAllAdditionalFilters,
    setPage,
    setSort,
    setPerPage,
    setSearch,
    clearCatalogParams,
    updateURLParam,
    updateURLParams,
    
    // Funciones de utilidad
    getURLParam,
    getURLFilters,
    getFlowFiltersFromURL,
    getAdditionalFiltersFromURL,
    
    // Acceso directo a searchParams
    searchParams,
  };
};

export default useCatalogURL;

