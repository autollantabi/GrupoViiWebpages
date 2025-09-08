import { API_CONFIG, buildApiUrl } from '../config/api';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.defaultHeaders = API_CONFIG.HEADERS;
  }

  // Función para hacer peticiones HTTP con timeout
  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('La petición tardó demasiado tiempo');
      }
      
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}, options = {}) {
    const url = buildApiUrl(endpoint, params);
    
    try {
      const data = await this.fetchWithTimeout(url, {
        method: 'GET',
        ...options,
      });
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // POST request
  async post(endpoint, data = {}, params = {}, options = {}) {
    const url = buildApiUrl(endpoint, params);
    
    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...options,
      });
      
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // PUT request
  async put(endpoint, data = {}, params = {}, options = {}) {
    const url = buildApiUrl(endpoint, params);
    
    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...options,
      });
      
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // DELETE request
  async delete(endpoint, params = {}, options = {}) {
    const url = buildApiUrl(endpoint, params);
    
    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'DELETE',
        ...options,
      });
      
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}

// Crear una instancia única del servicio
const apiService = new ApiService();

export default apiService;
