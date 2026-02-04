import apiService from "./apiService";
import { API_ENDPOINTS } from "../config/api";

class ProductService {
  /**
   * Obtiene todos los productos de una empresa específica
   * @param {string} empresaNombre - Nombre de la empresa
   * @returns {Promise<Array>} Array de productos
   */
  async getProductsByCompany(empresaNombre) {
    try {
      const response = await apiService.get(API_ENDPOINTS.PRODUCTOS, {
        empresa: empresaNombre,
      });

      // Verificar que la respuesta tenga la estructura esperada
      if (!response || typeof response !== "object") {
        console.warn("Respuesta de la API no válida:", response);
        return [];
      }

      // Extraer el campo 'data' de la respuesta
      const responseData = response.data || response;

      // Retornar directamente la data sin transformar, pero agregando DMA_ID
      let products = [];

      // Si responseData es un array, usarlo directamente
      if (Array.isArray(responseData)) {
        products = responseData;
      }
      // Si responseData es un objeto, convertirlo a array
      else if (responseData && typeof responseData === "object") {
        // Si es un objeto con propiedades DMA_*, convertirlo a array
        if (responseData.DMA_NOMBREITEM) {
          products = [responseData];
        }
        // Si es un objeto con múltiples productos, extraerlos
        else {
          products = Object.values(responseData).filter(Boolean);
        }
      }

      // Agregar DMA_ID único a cada producto si no lo tiene
      products = products.map((product, index) => {
        if (!product.DMA_IDENTIFICADORITEM) {
          // Crear ID único basado en DMA_NOMBREITEM + índice, o solo índice si no hay nombre
          const baseId = product.DMA_NOMBREITEM
            ? `${product.DMA_NOMBREITEM.replace(/[^a-zA-Z0-9]/g, "")}_${index}`
            : `product_${index}`;
          product.DMA_IDENTIFICADORITEM = baseId;
        }
        return product;
      });

      return products;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw new Error(`No se pudieron obtener los productos: ${error.message}`);
    }
  }

  /**
   * Obtiene un producto por código usando el endpoint directo (sin cargar todo el catálogo).
   * Endpoint: GET /productos/getProductoByCodigo/{value}/{empresaId}
   * Si falla, hace fallback a getProductById.
   * @param {string|number} productId - Código o ID del producto
   * @param {string} empresaNombre - Nombre/ID de la empresa
   * @returns {Promise<Object>} Producto encontrado
   */
  async getProductByIdOnly(productId, empresaNombre) {
    try {
      const response = await apiService.get(
        API_ENDPOINTS.PRODUCTO_BY_CODIGO,
        { value: String(productId), empresaId: empresaNombre }
      );

      const product = response?.data ?? response;
      if (product && typeof product === "object" && (product.DMA_IDENTIFICADORITEM || product.DMA_NOMBREITEM || product.DMA_CODIGO)) {
        if (!product.DMA_IDENTIFICADORITEM) {
          product.DMA_IDENTIFICADORITEM = String(product.DMA_CODIGO ?? productId);
        }
        return product;
      }
      throw new Error("Respuesta de producto inválida");
    } catch (err) {
      return this.getProductById(productId, empresaNombre);
    }
  }

  /**
   * Obtiene un producto específico por ID (carga todo el catálogo y filtra).
   * @param {string|number} productId - ID del producto
   * @param {string} empresaNombre - Nombre de la empresa
   * @returns {Promise<Object>} Producto encontrado
   */
  async getProductById(productId, empresaNombre) {
    try {
      const products = await this.getProductsByCompany(empresaNombre);

      let product;
      const productIdStr = String(productId);
      if (typeof productId === "number" && productId >= 0 && productId < products.length) {
        product = products[productId];
      } else {
        product = products.find(
          (p) =>
            p.DMA_IDENTIFICADORITEM === productId ||
            p.DMA_IDENTIFICADORITEM === productIdStr ||
            String(p.DMA_IDENTIFICADORITEM) === productIdStr ||
            p.DMA_CODIGO === productId ||
            String(p.DMA_CODIGO) === productIdStr
        );
      }

      if (!product) {
        throw new Error(`Producto con ID ${productId} no encontrado`);
      }

      return product;
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      throw error;
    }
  }

  /**
   * Obtiene productos por categoría
   * @param {string} category - Categoría de productos
   * @param {string} empresaNombre - Nombre de la empresa
   * @returns {Promise<Array>} Array de productos filtrados por categoría
   */
  async getProductsByCategory(category, empresaNombre) {
    try {
      const products = await this.getProductsByCompany(empresaNombre);

      // Filtramos por línea de negocio usando DMA_LINEANEGOCIO
      let filteredProducts = [];

      if (category === "lubricantes") {
        filteredProducts = products.filter(
          (p) => p.DMA_LINEANEGOCIO === "LUBRICANTES"
        );
      } else if (category === "llantas") {
        filteredProducts = products.filter(
          (p) => p.DMA_LINEANEGOCIO === "LLANTAS"
        );
      } else if (category === "herramientas") {
        filteredProducts = products.filter(
          (p) => p.DMA_LINEANEGOCIO === "HERRAMIENTAS"
        );
      } else {
        // Fallback para categorías no reconocidas
        filteredProducts = products;
      }

      return filteredProducts;
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      throw error;
    }
  }

  /**
   * Obtiene productos relacionados basados en criterios específicos
   * @param {Object} product - Producto base para encontrar relacionados
   * @param {string} empresaNombre - Nombre de la empresa
   * @param {number} limit - Límite de productos relacionados (default: 3)
   * @returns {Promise<Array>} Array de productos relacionados
   */
  async getRelatedProducts(product, empresaNombre, limit = 3) {
    try {
      let related = [];

      // Determinar línea de negocio del producto
      const isLubricante = product.DMA_LINEANEGOCIO === "LUBRICANTES";
      const isHerramienta = product.DMA_LINEANEGOCIO === "HERRAMIENTAS";

      if (!isLubricante && !isHerramienta && product.DMA_RIN) {
        // Para llantas, filtrar por rin similar
        const products = await this.getProductsByCategory(
          "llantas",
          empresaNombre
        );
        related = products
          .filter(
            (p) => p.DMA_IDENTIFICADORITEM !== product.DMA_IDENTIFICADORITEM && p.DMA_RIN === product.DMA_RIN
          )
          .slice(0, limit);
      } else if (isLubricante && product.DMA_CLASE) {
        // Para lubricantes, filtrar por clase similar
        const products = await this.getProductsByCategory(
          "lubricantes",
          empresaNombre
        );
        related = products
          .filter(
            (p) =>
              p.DMA_IDENTIFICADORITEM !== product.DMA_IDENTIFICADORITEM && p.DMA_CLASE === product.DMA_CLASE
          )
          .slice(0, limit);
      } else if (isHerramienta && product.DMA_GRUPO) {
        // Para herramientas, filtrar por grupo similar
        const products = await this.getProductsByCategory(
          "herramientas",
          empresaNombre
        );
        related = products
          .filter(
            (p) =>
              p.DMA_IDENTIFICADORITEM !== product.DMA_IDENTIFICADORITEM && p.DMA_GRUPO === product.DMA_GRUPO
          )
          .slice(0, limit);
      } else {
        // Fallback general: productos de la misma línea de negocio
        let category;
        if (isLubricante) {
          category = "lubricantes";
        } else if (isHerramienta) {
          category = "herramientas";
        } else {
          category = "llantas";
        }
        
        const products = await this.getProductsByCategory(
          category,
          empresaNombre
        );
        related = products
          .filter((p) => p.DMA_IDENTIFICADORITEM !== product.DMA_IDENTIFICADORITEM)
          .slice(0, limit);
      }

      return related;
    } catch (error) {
      console.error("Error al obtener productos relacionados:", error);
      return []; // Retornar array vacío en caso de error
    }
  }
}

// Crear una instancia única del servicio
const productService = new ProductService();

export default productService;
