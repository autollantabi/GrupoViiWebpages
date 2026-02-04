# Seguridad

Resumen de las medidas de seguridad implementadas y recomendaciones para el proyecto.

## Headers de seguridad (vercel.json)

El proyecto configura los siguientes headers HTTP para todas las rutas:

| Header | Valor | Propósito |
|--------|-------|-----------|
| **X-Frame-Options** | SAMEORIGIN | Evita clickjacking; solo permite embeber el sitio en el mismo origen |
| **X-Content-Type-Options** | nosniff | Impide que el navegador infiera tipos MIME |
| **Referrer-Policy** | strict-origin-when-cross-origin | Controla qué información de referrer se envía |
| **Permissions-Policy** | camera=(), microphone=(), geolocation=(self) | Deshabilita APIs no usadas (cámara, micrófono) |
| **Strict-Transport-Security** | max-age=31536000; includeSubDomains; preload | Fuerza HTTPS (HSTS) |
| **Content-Security-Policy** | Ver abajo | Restringe orígenes de scripts, estilos, imágenes, etc. |

### Content-Security-Policy (CSP)

- **default-src 'self'**: Solo el propio origen por defecto
- **script-src 'self'**: Scripts solo desde el propio origen
- **style-src 'self' 'unsafe-inline' https://fonts.googleapis.com**: Estilos propios, inline (styled-components) y Google Fonts
- **font-src 'self' https://fonts.gstatic.com**: Fuentes propias y Google Fonts
- **img-src 'self' data: blob: https:***: Imágenes propias, data URLs, blobs y HTTPS (productos desde API)
- **connect-src 'self' https:***: Llamadas fetch/XHR al mismo origen y HTTPS
- **frame-src https://www.google.com https://maps.google.com *.google.com**: Iframes de Google Maps
- **frame-ancestors 'self'**: Solo el propio sitio puede embeber la página
- **base-uri 'self'**: Restringe el elemento base
- **form-action 'self'**: Formularios solo al mismo origen

**Nota:** Si la API se usa por HTTP en desarrollo (ej. 192.168.x.x), puede ser necesario ajustar `connect-src` o desactivar temporalmente CSP en local.

## Meta tags (index.html)

- **lang="es"**: Idioma principal
- **X-UA-Compatible**: Modo de compatibilidad IE
- **referrer**: Refuerza la política de referrer

## Formularios

### Sanitización y límites (emailService.js)

- Eliminación de caracteres de control (0x00-0x1F, 0x7F)
- Límites de longitud por campo:
  - nombre, ciudad, provincia, asunto: 100-200 caracteres
  - correo: 254
  - telefono: 20
  - mensaje: 2000
  - empresa: 50

### maxLength en inputs

Los formularios de Contact y cotización (ProductDetail) usan `maxLength` para limitar la entrada desde el cliente.

## API

### buildApiUrl (api.js)

- Los valores de parámetros se validan con una expresión regular (caracteres alfanuméricos, guiones, puntos)
- Uso de `encodeURIComponent` para parámetros en la URL
- Construcción correcta de la URL con barra entre base y path

### Variables de entorno

- Solo se usan variables con prefijo `VITE_` (expuestas al cliente)
- No incluir credenciales ni secretos en variables `VITE_`
- La API debe manejar autenticación/autorización en el backend si aplica

## Recomendaciones adicionales

### Backend

- **Rate limiting**: Limitar peticiones por IP en endpoints de email para evitar spam
- **Validación**: Revalidar y sanitizar todos los datos en el servidor
- **CORS**: Restringir orígenes permitidos a los dominios de producción y, en desarrollo, a localhost

### Producción

- Usar siempre HTTPS para la API (`VITE_API_BASE_URL`)
- Evitar el valor por defecto `http://192.168.3.68:3700` en producción; configurar la URL real

### Dependencias

- Ejecutar `npm audit` periódicamente
- Actualizar dependencias con vulnerabilidades conocidas
