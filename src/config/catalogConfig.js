/**
 * Configuración centralizada para el catálogo de productos
 */

export const catalogConfig = {
  // Configuración general
  general: {
    productsPerPage: 8,
    defaultSorting: "relevance",
    sortOptions: [
      { value: "relevance", label: "Relevancia" },
      { value: "name-asc", label: "Nombre: A-Z" },
      { value: "name-desc", label: "Nombre: Z-A" },
      { value: "brand-asc", label: "Marca: A-Z" },
      { value: "brand-desc", label: "Marca: Z-A" },
    ],
    productsPerPageOptions: [
      { value: 9, label: "9 por página" },
      { value: 12, label: "12 por página" },
      { value: 21, label: "21 por página" },
      { value: 42, label: "42 por página" },
    ],
    pageTitle: "Catálogo de Productos",
    pageDescription:
      "Explore nuestro catálogo completo de neumáticos",
  },

  // Líneas de negocio disponibles
  categories: [
   
    {
      id: "herramientas",
      label: "Herramientas",
      icon: "hammer",
      description: "Productos para trabajos (por defecto)",
    },
  ],

  // Etiquetas legibles para campos
  fieldLabels: {
    DMA_RIN: "Rin",
    DMA_SERIE: "Alto",
    DMA_ANCHO: "Ancho",
    DMA_CATEGORIA: "Categoría",
    DMA_APLICACION: "Aplicación",
    DMA_EJE: "Eje",
    DMA_MARCA: "Marca",
    DMA_CLASE: "Clase",
    DMA_CLASIFICACION: "Clasificación",
    DMA_TIPO: "Tipo",
    DMA_MODELO: "Modelo",
    DMA_GRUPO: "Grupo",
    DMA_SUBGRUPO: "Subgrupo",
  },

  // URLs para parámetros
  urlParams: {
    lineBusiness: "linea",
    DMA_RIN: "rin",
    DMA_SERIE: "alto",
    DMA_ANCHO: "ancho",
    DMA_CATEGORIA: "categoria",
    DMA_APLICACION: "aplicacion",
    DMA_EJE: "eje",
    DMA_MARCA: "marca",
    DMA_CLASE: "clase",
    DMA_CLASIFICACION: "clasificacion",
    DMA_TIPO: "tipo",
    DMA_MODELO: "modelo",
    DMA_GRUPO: "grupo",
    DMA_SUBGRUPO: "subgrupo",
    search: "buscar",
    productsPerPage: "ver",
  },
};
