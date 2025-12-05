import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../api";
import catalogFlowConfig from "../config/catalogFlow.json";

const useCatalogFlow = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedValues, setSelectedValues] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingFilter, setEditingFilter] = useState(null);
  const [searchParams] = useSearchParams();

  const { products, loading } = useProducts();

  // Leer selectedLinea directamente de la URL (no estado local)
  const selectedLinea = useMemo(() => {
    const lineaSlug = searchParams.get("linea");
    if (!lineaSlug) return null;

    // Normalizar slug de URL a nombre de línea
    // Necesitamos buscar en availableLines para obtener el formato correcto
    // Por ahora, convertimos el slug: "llantas-moto" -> "LLANTAS MOTO"
    // Pero idealmente deberíamos buscar en los productos disponibles
    const lineaName = lineaSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Buscar la línea exacta en los productos disponibles
    if (products && products.length > 0) {
      const availableLines = [
        ...new Set(products.map((p) => p.DMA_LINEANEGOCIO)),
      ];
      // Buscar línea que coincida (case insensitive)
      const foundLine = availableLines.find(
        (line) => line.toUpperCase() === lineaName.toUpperCase()
      );
      if (foundLine) {
        return foundLine;
      }
    }

    // Fallback: usar el nombre normalizado
    return lineaName.toUpperCase();
  }, [searchParams, products]);

  // Obtener filtros adicionales directamente de la URL
  const getAdditionalFiltersFromURL = useCallback(() => {
    const filters = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith("DMA_")) {
        filters[key] = value;
      }
    });
    return filters;
  }, [searchParams]);

  // Función auxiliar para obtener descripción de línea
  const getLineDescription = (linea) => {
    const descriptions = {
      LLANTAS: "Para vehículos",
      "LLANTAS MOTO": "Para motocicletas",
      LUBRICANTES: "Aceites y fluidos",
      HERRAMIENTAS: "Equipos profesionales",
    };
    return descriptions[linea] || "Productos disponibles";
  };

  // Función auxiliar para obtener icono de línea
  const getLineIcon = (linea) => {
    const icons = {
      LLANTAS: "FaCar",
      "LLANTAS MOTO": "FaMotorcycle",
      LUBRICANTES: "FaOilCan",
      HERRAMIENTAS: "FaTools",
    };
    return icons[linea] || "FaBox";
  };

  // Función auxiliar para obtener el campo de filtro
  const getFilterField = (stepId) => {
    const fieldMap = {
      categoria: "DMA_CATEGORIA",
      aplicacion: "DMA_APLICACION",
      clase: "DMA_CLASE",
      clasificacion: "DMA_CLASIFICACION",
      tipo: "DMA_TIPO",
      grupo: "DMA_GRUPO",
      subgrupo: "DMA_SUBGRUPO",
    };
    return fieldMap[stepId] || null;
  };

  // Función auxiliar para obtener descripción del filtro
  const getFilterDescription = (stepId, value) => {
    const descriptions = {
      categoria: `Productos de la categoría ${value}`,
      aplicacion: `Productos para ${value}`,
      clase: `Lubricantes de clase ${value}`,
      clasificacion: `Clasificación ${value}`,
      tipo: `Tipo ${value}`,
      grupo: `Herramientas del grupo ${value}`,
      subgrupo: `Subgrupo ${value}`,
      subgrupo2: `Subgrupo 2 ${value}`,
    };
    return descriptions[stepId] || `Productos de ${value}`;
  };

  // Función auxiliar para obtener icono del filtro
  const getFilterIcon = (stepId) => {
    const icons = {
      categoria: "FaTag",
      aplicacion: "FaCog",
      clase: "FaLayerGroup",
      tipo: "FaFilter",
      clasificacion: "FaFilter",
      grupo: "FaFolder",
      subgrupo: "FaFolderOpen",
      subgrupo2: "FaFolderOpen",
    };
    return icons[stepId] || "FaTag";
  };

  // Función auxiliar para obtener nombre de display del filtro
  const getFilterDisplayName = (filterField) => {
    const names = {
      DMA_EJE: "Eje",
      DMA_MARCA: "Marca",
      DMA_CARGA: "Carga",
      DMA_VELOCIDAD: "Velocidad",
      DMA_TIPO: "Tipo",
      DMA_MODELO: "Modelo",
      DMA_RIN: "Rin",
      DMA_ANCHO: "Ancho",
      DMA_SERIE: "Alto/Serie",
      DMA_CATEGORIA: "Categoría",
      DMA_APLICACION: "Aplicación",
      DMA_SUBGRUPO: "Subgrupo",
      DMA_GRUPO: "Grupo",
      DMA_SAE: "Viscosidad SAE",
      DMA_ISOVG: "Viscosidad ISO",
      DMA_SUBGRUPO2: "Subgrupo 2",
    };
    return names[filterField] || filterField;
  };

  // Obtener líneas de negocio disponibles basadas en los productos reales
  const availableLines = useMemo(() => {
    if (!products || products.length === 0) return [];

    const lines = [
      ...new Set(products.map((product) => product.DMA_LINEANEGOCIO)),
    ];

    return lines.map((linea) => {
      const productsInLine = products.filter(
        (product) => product.DMA_LINEANEGOCIO === linea
      );
      const config = catalogFlowConfig[linea] || {
        name: linea,
        displayName: linea,
      };

      return {
        key: linea,
        name: config.displayName || linea,
        description: getLineDescription(linea),
        icon: getLineIcon(linea),
        count: productsInLine.length,
        config: config,
      };
    });
  }, [products]);

  // Obtener configuración del flujo para la línea seleccionada
  const flowConfig = useMemo(() => {
    if (!selectedLinea || !catalogFlowConfig[selectedLinea]) {
      return null;
    }
    return catalogFlowConfig[selectedLinea];
  }, [selectedLinea]);

  // Obtener el paso actual
  const currentStep = useMemo(() => {
    if (!flowConfig || currentStepIndex >= flowConfig.steps.length) {
      return null;
    }
    return flowConfig.steps[currentStepIndex];
  }, [flowConfig, currentStepIndex]);

  // Generar opciones para el paso actual basado en los productos
  const currentStepOptions = useMemo(() => {
    if (!currentStep || !products || products.length === 0) {
      return [];
    }

    // Filtrar productos por línea de negocio
    let relevantProducts = products.filter(
      (product) => product.DMA_LINEANEGOCIO === selectedLinea
    );

    // Aplicar filtros previos (excluyendo el paso actual)
    Object.entries(selectedValues).forEach(([filterKey, filterValue]) => {
      // No aplicar el filtro del paso actual para mostrar todas las opciones
      if (filterKey === currentStep.id) return;

      relevantProducts = relevantProducts.filter((product) => {
        switch (filterKey) {
          case "categoria":
            return product.DMA_CATEGORIA === filterValue;
          case "aplicacion":
            return product.DMA_APLICACION === filterValue;
          case "clase":
            return product.DMA_CLASE === filterValue;
          case "clasificacion":
            return product.DMA_CLASIFICACION === filterValue;
          case "grupo":
            return product.DMA_GRUPO === filterValue;
          case "subgrupo":
            return product.DMA_SUBGRUPO === filterValue;
          case "subgrupo2":
            return product.DMA_SUBGRUPO2 === filterValue;
          case "tipo":
            return product.DMA_TIPO === filterValue;
          default:
            return true;
        }
      });
    });

    // Obtener valores únicos para el filtro actual
    const filterField = getFilterField(currentStep.id);
    const uniqueValues = [
      ...new Set(
        relevantProducts
          .map((product) => product[filterField])
          .filter((value) => value && value.trim() !== "")
      ),
    ];

    // Convertir a formato de opciones
    return uniqueValues.map((value) => ({
      value,
      label: String(value),
      description: getFilterDescription(currentStep.id, value),
      icon: getFilterIcon(currentStep.id),
      count: relevantProducts.filter(
        (product) => product[filterField] === value
      ).length,
    }));
  }, [currentStep, products, selectedLinea, selectedValues]);

  // Inicializar como completado (sin localStorage, solo URL)
  useEffect(() => {
    if (!isInitialized && products && products.length > 0) {
      setIsInitialized(true);
    }
  }, [isInitialized, products]);

  // Actualizar productos filtrados cuando cambien los filtros
  useEffect(() => {
    // Si no hay productos o no hay línea seleccionada, no filtrar
    if (!products || products.length === 0 || !selectedLinea) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products.filter(
      (product) => product.DMA_LINEANEGOCIO === selectedLinea
    );

    // Aplicar todos los filtros del flujo principal desde selectedValues
    Object.entries(selectedValues).forEach(([filterKey, filterValue]) => {
      const filterField = getFilterField(filterKey);
      if (filterField) {
        filtered = filtered.filter(
          (product) => product[filterField] === filterValue
        );
      }
    });

    // Aplicar filtros adicionales directamente de la URL
    const additionalFilters = getAdditionalFiltersFromURL();
    Object.entries(additionalFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(
          (product) => product[filterKey] === filterValue
        );
      }
    });

    // Aplicar búsqueda por texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((product) => {
        const name = (product.DMA_NOMBREITEM || "").toLowerCase();
        const brand = (product.DMA_MARCA || "").toLowerCase();
        const category = (product.DMA_CATEGORIA || "").toLowerCase();
        const description = (product.DMA_DESCRIPCION || "").toLowerCase();

        return (
          name.includes(query) ||
          brand.includes(query) ||
          category.includes(query) ||
          description.includes(query)
        );
      });
    }

    // Eliminar duplicados basándose en DMA_IDENTIFICADORITEM
    const uniqueProducts = filtered.reduce((acc, current) => {
      const identifier = current.DMA_IDENTIFICADORITEM;
      if (
        !acc.find((product) => product.DMA_IDENTIFICADORITEM === identifier)
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

    setFilteredProducts(uniqueProducts);
  }, [
    products,
    selectedLinea,
    selectedValues,
    searchQuery,
    getAdditionalFiltersFromURL,
  ]);

  // Funciones de navegación
  // NOTA: selectLinea ya no actualiza estado local, solo se mantiene para compatibilidad
  // La línea ahora se lee directamente de la URL
  const selectLinea = (linea) => {
    // Esta función ya no hace nada porque selectedLinea se lee de la URL
    // Se mantiene solo para compatibilidad, pero debería eliminarse del uso
    // En su lugar, se debe usar urlCatalog.setLinea() directamente
    if (linea === null) {
      setCurrentStepIndex(0);
      setSelectedValues({});
      setFilteredProducts([]);
      setEditingFilter(null);
    } else {
      setCurrentStepIndex(0);
      setSelectedValues({});
      setFilteredProducts([]);
      setEditingFilter(null);
    }
  };

  const selectFilterValue = (value) => {
    if (!currentStep || !flowConfig) return;

    const newSelectedValues = {
      ...selectedValues,
      [currentStep.id]: value,
    };

    setSelectedValues(newSelectedValues);
    setEditingFilter(null); // Limpiar el estado de edición

    // Avanzar al siguiente paso si existe
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < flowConfig.steps.length) {
      setCurrentStepIndex(nextStepIndex);
    }
  };

  const goToNextStep = () => {
    if (!currentStep || !currentStep.nextStep) return;

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < flowConfig.steps.length) {
      setCurrentStepIndex(nextStepIndex);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const newStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(newStepIndex);

      // Limpiar el filtro del paso actual y posteriores
      const newSelectedValues = { ...selectedValues };
      if (currentStep) {
        delete newSelectedValues[currentStep.id];
      }

      // Limpiar filtros posteriores
      if (flowConfig) {
        for (let i = newStepIndex + 1; i < flowConfig.steps.length; i++) {
          const step = flowConfig.steps[i];
          delete newSelectedValues[step.id];
        }
      }

      setSelectedValues(newSelectedValues);
    } else {
      // Si estamos en el primer paso, volver a la selección de línea

      setCurrentStepIndex(0);
      setSelectedValues({});
    }
  };

  const goToFilterStep = (filterId) => {
    if (!flowConfig) {
      return;
    }

    const stepIndex = flowConfig.steps.findIndex(
      (step) => step.id === filterId
    );

    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
      setEditingFilter(filterId); // Marcar que estamos editando este filtro

      // Limpiar el filtro actual y todos los filtros posteriores del flujo principal
      const newSelectedValues = { ...selectedValues };
      for (let i = stepIndex; i < flowConfig.steps.length; i++) {
        const step = flowConfig.steps[i];
        delete newSelectedValues[step.id];
      }

      // También limpiar TODOS los filtros adicionales (campos DMA_*) cuando navegamos a un paso anterior
      Object.keys(newSelectedValues).forEach((key) => {
        if (key.startsWith("DMA_")) {
          delete newSelectedValues[key];
        }
      });

      setSelectedValues(newSelectedValues);
    }
  };

  const canGoNext = useCallback(() => {
    return currentStep && selectedValues[currentStep.id];
  }, [currentStep, selectedValues]);

  const isAtProductView = useCallback(() => {
    // Si no hay pasos configurados, mostrar directamente el catálogo
    if (!flowConfig || !flowConfig.steps || flowConfig.steps.length === 0) {
      return true;
    }

    // Estamos en la vista de productos cuando:
    // 1. Hay un paso actual
    // 2. El paso actual NO tiene siguiente paso (es el último)
    // 3. El paso actual YA tiene un valor seleccionado
    // 4. NO estamos editando un filtro específico
    return (
      currentStep &&
      !currentStep.nextStep &&
      selectedValues[currentStep.id] &&
      !editingFilter
    );
  }, [currentStep, selectedValues, editingFilter, flowConfig]);

  // Obtener filtros adicionales disponibles para el sidebar
  const additionalFilters = useMemo(() => {
    if (!selectedLinea || !isAtProductView()) return [];

    const filterMap = {
      LLANTAS: [
        "DMA_MARCA",
        "DMA_ANCHO",
        "DMA_SERIE",
        "DMA_RIN",
        "DMA_CATEGORIA",
        "DMA_APLICACION",
        "DMA_EJE",
      ],
      "LLANTAS MOTO": [
        "DMA_MARCA",
        "DMA_ANCHO",
        "DMA_SERIE",
        "DMA_RIN",
        "DMA_CATEGORIA",
        "DMA_APLICACION",
        "DMA_EJE",
      ],
      LUBRICANTES: [
        "DMA_MARCA",
        "DMA_SAE",
        "DMA_ISOVG",
        "DMA_TIPO",
        "DMA_MODELO",
      ],
      HERRAMIENTAS: [
        "DMA_MARCA",
        "DMA_GRUPO",
        "DMA_SUBGRUPO",
        "DMA_SUBGRUPO2",
        "DMA_TIPO",
      ],
    };

    const filters = filterMap[selectedLinea] || [];
    const additionalFilterOptions = [];

    // Obtener filtros adicionales de la URL
    const additionalFiltersFromURL = getAdditionalFiltersFromURL();

    // Obtener productos base filtrados solo por el flujo principal (sin filtros adicionales)
    let baseFilteredProducts = products.filter(
      (product) => product.DMA_LINEANEGOCIO === selectedLinea
    );

    // Aplicar solo los filtros del flujo principal (no los adicionales)
    Object.entries(selectedValues).forEach(([filterKey, filterValue]) => {
      const filterField = getFilterField(filterKey);
      if (filterField) {
        baseFilteredProducts = baseFilteredProducts.filter(
          (product) => product[filterField] === filterValue
        );
      }
    });

    filters.forEach((filterField) => {
      // Crear una copia base para aplicar todos los filtros excepto el actual
      let baseForUniqueValues = [...baseFilteredProducts];

      // Aplicar TODOS los filtros adicionales ya seleccionados de la URL (excepto el actual)
      Object.entries(additionalFiltersFromURL).forEach(
        ([otherFilterKey, otherFilterValue]) => {
          if (
            otherFilterKey.startsWith("DMA_") &&
            otherFilterKey !== filterField &&
            otherFilterValue
          ) {
            baseForUniqueValues = baseForUniqueValues.filter(
              (product) => product[otherFilterKey] === otherFilterValue
            );
          }
        }
      );

      // Aplicar búsqueda por texto si existe (igual que en filteredProducts)
      if (searchQuery && searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        baseForUniqueValues = baseForUniqueValues.filter((product) => {
          const name = (product.DMA_NOMBREITEM || "").toLowerCase();
          const brand = (product.DMA_MARCA || "").toLowerCase();
          const category = (product.DMA_CATEGORIA || "").toLowerCase();
          const description = (product.DMA_DESCRIPCION || "").toLowerCase();

          return (
            name.includes(query) ||
            brand.includes(query) ||
            category.includes(query) ||
            description.includes(query)
          );
        });
      }

      // Eliminar duplicados de baseForUniqueValues (igual que en filteredProducts)
      const uniqueBaseProducts = baseForUniqueValues.reduce((acc, current) => {
        const identifier = current.DMA_IDENTIFICADORITEM;
        if (
          !acc.find((product) => product.DMA_IDENTIFICADORITEM === identifier)
        ) {
          acc.push(current);
        }
        return acc;
      }, []);

      // Obtener valores únicos para este campo DESPUÉS de aplicar todos los filtros y eliminar duplicados
      const uniqueValues = [
        ...new Set(
          uniqueBaseProducts
            .map((product) => product[filterField])
            .filter((value) => value && String(value).trim() !== "")
        ),
      ];

      if (uniqueValues.length > 1) {
        // Solo mostrar si hay más de una opción
        const options = uniqueValues.map((value) => {
          // Crear una copia de los productos ya filtrados (con todos los filtros excepto el actual)
          let filteredForCount = [...uniqueBaseProducts];

          // Aplicar el filtro del valor actual para contar
          filteredForCount = filteredForCount.filter(
            (product) => product[filterField] === value
          );

          // El conteo es el número de productos únicos que tienen este valor
          const count = filteredForCount.length;

          return {
            value,
            label: String(value),
            count,
            disabled: count === 0,
          };
        });

        // Ordenar opciones de menor a mayor (por valor, intentando numérico si es posible)
        const sortedOptions = options.sort((a, b) => {
          // Intentar comparación numérica primero
          const numA = parseFloat(a.value);
          const numB = parseFloat(b.value);

          if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
          }

          // Si no son numéricos, comparación alfabética
          return String(a.value).localeCompare(String(b.value), undefined, {
            numeric: true,
            sensitivity: "base",
          });
        });

        additionalFilterOptions.push({
          id: filterField,
          name: getFilterDisplayName(filterField),
          options: sortedOptions,
        });
      }
    });

    return additionalFilterOptions;
  }, [
    selectedLinea,
    products,
    selectedValues,
    searchQuery,
    isAtProductView,
    getAdditionalFiltersFromURL,
  ]);

  // Función para aplicar filtros adicionales
  const applyAdditionalFilter = (filterId, value) => {
    const newSelectedValues = {
      ...selectedValues,
      [filterId]: value,
    };
    setSelectedValues(newSelectedValues);
  };

  // Función para limpiar filtro adicional
  const clearAdditionalFilter = (filterId) => {
    const newSelectedValues = { ...selectedValues };
    delete newSelectedValues[filterId];
    setSelectedValues(newSelectedValues);
  };

  // Función para navegar a un filtro adicional desde el breadcrumb
  const goToAdditionalFilter = (filterId) => {
    // Solo limpiar ese filtro específico, mantener los demás
    const newSelectedValues = { ...selectedValues };
    delete newSelectedValues[filterId];
    setSelectedValues(newSelectedValues);

    // No cambiar el currentStepIndex ya que seguimos en la vista de productos
    setEditingFilter(null);
  };

  // Función para manejar búsqueda
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Función para inicializar desde URL con sistema p1, p2, p3
  const initializeFromURL = useCallback(
    (urlParams) => {
      if (!selectedLinea || !flowConfig || isInitialized) return;

      setIsInitialized(true);

      // Mapear p1, p2, p3 a los filtros correspondientes
      const filters = {};
      flowConfig.steps.forEach((step, index) => {
        const paramValue = urlParams[`p${index + 1}`];
        if (paramValue) {
          filters[step.id] = paramValue;
        }
      });

      setSelectedValues(filters);

      // Determinar el paso actual
      const completedSteps = flowConfig.steps.filter(
        (step) => filters[step.id]
      );

      if (completedSteps.length < flowConfig.steps.length) {
        setCurrentStepIndex(completedSteps.length);
      } else {
        setCurrentStepIndex(flowConfig.steps.length - 1);
      }
    },
    [selectedLinea, flowConfig, isInitialized]
  );

  // Función para generar URL con sistema p1, p2, p3
  const generateURL = useCallback(
    (linea, filters) => {
      const params = new URLSearchParams();

      if (linea) {
        params.set("linea", linea.toLowerCase().replace(" ", "-"));

        // Convertir filtros a p1, p2, p3
        if (flowConfig) {
          flowConfig.steps.forEach((step, index) => {
            const filterValue = filters[step.id];
            if (filterValue) {
              params.set(`p${index + 1}`, filterValue);
            }
          });
        }
      }

      return params;
    },
    [flowConfig]
  );

  return {
    // Estado
    selectedLinea,
    currentStepIndex,
    currentStep,
    selectedValues,
    filteredProducts,
    currentStepOptions,
    loading,
    availableLines,
    additionalFilters,
    searchQuery,

    // Funciones
    selectLinea,
    selectFilterValue,
    goToNextStep,
    goToPreviousStep,
    goToFilterStep,
    canGoNext: canGoNext(),
    isAtProductView: isAtProductView(),
    applyAdditionalFilter,
    clearAdditionalFilter,
    goToAdditionalFilter,
    initializeFromURL,
    generateURL,
    isInitialized,
    setSelectedValues,
    setCurrentStepIndex,
    handleSearchChange,

    // Configuración
    flowConfig,
  };
};

export default useCatalogFlow;
