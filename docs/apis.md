# Integraciones y APIs

Documentación de las APIs externas consumidas por el proyecto: cliente HTTP, configuración, endpoints y dependencias.

## Cliente HTTP

El proyecto usa un único cliente HTTP definido en `src/api/services/apiService.js`:

- **Implementación**: `fetch` nativo de JavaScript
- **Timeout**: Configurable vía `VITE_API_TIMEOUT` (por defecto 10 segundos)
- **Cabeceras por defecto**: `Content-Type: application/json`, `Accept: application/json`
- **Métodos**: `get`, `post`, `put`, `delete`
- **Manejo de errores**: `AbortController` para timeout; lanza error si `!response.ok`

### Configuración de la API

Archivo: `src/api/config/api.js`

| Variable / Constante | Origen | Valor por defecto |
|---------------------|--------|-------------------|
| `BASE_URL` | `VITE_API_BASE_URL` | `http://192.168.3.68:3700` |
| `TIMEOUT` | `VITE_API_TIMEOUT` | `10000` |
| `HEADERS` | Fijo | `Content-Type`, `Accept` |

**Nota:** La función `buildApiUrl` concatena `BASE_URL` + endpoint. Si `BASE_URL` no termina en `/`, asegurarse de que el endpoint incluya la barra inicial o que la URL resultante sea válida para el servidor.

## API de productos

### Base URL y entorno

- **Variable**: `VITE_API_BASE_URL`
- **Valor por defecto en código**: `http://192.168.3.68:3700`
- **Uso**: Productos y envío de email

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `web/productos/{empresa}` | Listado de todos los productos de la empresa |
| GET | `web/productos/getProductoByCodigo/{value}/{empresaId}` | Detalle de un producto por código (value = código/ID, empresaId = empresa) |

### Servicios que la usan

- `productService.getProductsByCompany(empresaNombre)`
- `useProducts` (hook que usa `productService`)

### Formato de respuesta esperado

- Objeto con campo `data` (array o objeto) o array directo
- Cada producto debe tener campos `DMA_*` (ej: `DMA_NOMBREITEM`, `DMA_LINEANEGOCIO`, `DMA_RUTAIMAGEN`, `DMA_MARCA`, etc.)
- Si falta `DMA_IDENTIFICADORITEM`, el servicio lo genera a partir de `DMA_NOMBREITEM` + índice

### Riesgos y dependencias

- La API debe ser accesible desde el navegador (CORS configurado para el origen del frontend)
- Timeout de 10 s; si el catálogo es grande, considerar paginación o endpoints optimizados
- Las imágenes usan `VITE_API_IMAGES_URL` + `DMA_RUTAIMAGEN`; la API puede devolver rutas relativas o absolutas

---

## API de email

### Base URL

- Misma que productos: `VITE_API_BASE_URL`

### Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `email/cotizacion` | Envío de solicitud de cotización |
| POST | `email/comentario` | Envío de comentario/consulta desde contacto |

### Servicios que la usan

- `emailService.enviarCotizacion()`
- `emailService.enviarComentario()`

### Cabeceras

- `Content-Type: application/json`
- `Accept: application/json`

### Payload de cotización

| Campo | Tipo | Requerido |
|-------|------|-----------|
| nombre | string | Sí |
| correo | string | Sí (formato email) |
| telefono | string | Sí |
| ciudad | string | Sí |
| provincia | string | Sí |
| codigoProducto | string | Sí |
| empresa | string | Sí |

### Payload de comentario

| Campo | Tipo | Requerido |
|-------|------|-----------|
| nombre | string | Sí |
| correo | string | Sí (formato email) |
| telefono | string | Sí |
| asunto | string | Sí |
| mensaje | string | Sí |
| empresa | string | Sí |

### Riesgos y dependencias

- El backend debe implementar estos endpoints y enviar correos
- No hay autenticación en las peticiones; protección contra spam debe estar en el backend
- Errores de red o timeout se muestran al usuario vía notificaciones

---

## Resumen de variables de entorno

| Variable | Uso |
|----------|-----|
| `VITE_API_BASE_URL` | Origen de la API (productos + email) |
| `VITE_API_IMAGES_URL` | Base para URLs de imágenes de productos |
| `VITE_API_TIMEOUT` | Timeout de peticiones HTTP (ms) |

---

## Integraciones de terceros (no API REST)

| Servicio | Uso |
|----------|-----|
| Google Fonts | Fuente Raleway (link en `index.html`) |
| Google Maps | Iframes embebidos en Contact y LocationSection; URLs en `config.textos.ubicacion.map` por empresa |
| Google Site Verification | Meta tag en `index.html` |
| viicommerce.com | Enlace "Mayoristas" en Header; URL configurable con `VITE_MAYORISTA_URL` |
