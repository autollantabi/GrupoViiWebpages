import { useState, useEffect, useCallback } from "react";
import productService from "../services/productService";
import { getEmpresaNombre } from "../config/company";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los productos de la empresa
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const empresaNombre = getEmpresaNombre();
      const data = await productService.getProductsByCompany(empresaNombre);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error en useProducts.fetchProducts:", err);
      // En caso de error, establecer productos como array vacíoF
      setProducts([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos por categoría
  const fetchProductsByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);

      const empresaNombre = getEmpresaNombre();
      const data = await productService.getProductsByCategory(
        category,
        empresaNombre
      );

      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error en useProducts.fetchProductsByCategory:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener un producto específico por ID
  const fetchProductById = useCallback(async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const empresaNombre = getEmpresaNombre();
      const data = await productService.getProductById(
        productId,
        empresaNombre
      );

      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error en useProducts.fetchProductById:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener productos relacionados
  const fetchRelatedProducts = useCallback(async (product, limit = 3) => {
    try {
      setError(null);

      const empresaNombre = getEmpresaNombre();
      const data = await productService.getRelatedProducts(
        product,
        empresaNombre,
        limit
      );

      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error en useProducts.fetchRelatedProducts:", err);
      return [];
    }
  }, []);

  // Filtrar productos localmente (para búsquedas rápidas)
  const filterProducts = useCallback(
    (filters = {}) => {
      // Asegurar que products sea un array válido
      if (!Array.isArray(products) || products.length === 0) {
        return [];
      }

      let filtered = [...products];

      // Filtro por categoría
      if (filters.category) {
        filtered = filtered.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Filtro por marca
      if (filters.brand) {
        filtered = filtered.filter(
          (p) =>
            p.brand &&
            p.brand.toLowerCase().includes(filters.brand.toLowerCase())
        );
      }

      // Filtro por nombre
      if (filters.name) {
        filtered = filtered.filter(
          (p) =>
            p.name && p.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      // Filtros específicos para neumáticos
      if (filters.rin) {
        filtered = filtered.filter((p) => p.rin == filters.rin);
      }
      if (filters.ancho) {
        filtered = filtered.filter((p) => p.ancho == filters.ancho);
      }
      if (filters.alto) {
        filtered = filtered.filter((p) => p.alto == filters.alto);
      }

      // Filtros específicos para lubricantes
      if (filters.lubricantCategory) {
        filtered = filtered.filter(
          (p) => p.lubricantCategory === filters.lubricantCategory
        );
      }
      if (filters.group) {
        filtered = filtered.filter((p) => p.group === filters.group);
      }

      return filtered;
    },
    [products]
  );

  // Limpiar errores
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    fetchRelatedProducts,
    filterProducts,
    clearError,
  };
};
