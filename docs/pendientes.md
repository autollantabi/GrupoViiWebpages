# Pendientes y mejoras sugeridas

Mejoras técnicas, deuda técnica detectada y suposiciones o partes no claras del proyecto.

## Mejoras técnicas sugeridas

### 1. Tests

- **Estado**: No hay tests en el repositorio.
- **Sugerencia**: Añadir tests unitarios para:
  - Hooks: `useCatalogFlow`, `useCatalogURL`, `useProducts`
  - Servicios: `emailService`, `productService`
  - Validaciones de formularios (Contact, cotización)

### 2. Migración a TypeScript

- **Estado**: Proyecto en JavaScript con PropTypes.
- **Sugerencia**: Migrar gradualmente a TypeScript para mejor tipado y detección de errores en desarrollo.

### 3. Lazy loading de rutas

- **Estado**: Todas las páginas se cargan en el bundle inicial.
- **Sugerencia**: Usar `React.lazy` y `Suspense` para cargar páginas bajo demanda y reducir el bundle inicial.

### 4. Sitemap dinámico

- **Estado**: `sitemap.xml` es estático; no incluye URLs de productos.
- **Sugerencia**: Generar sitemap dinámico en build (script que consulte la API o un JSON local) para incluir URLs de productos y mejorar indexación.

### 5. Imágenes responsivas

- **Estado**: Imágenes de productos con `loading="lazy"` pero sin `srcset` ni tamaños adaptativos.
- **Sugerencia**: Añadir `srcset` o componentes que sirvan diferentes resoluciones según viewport.

### 6. Accesibilidad

- **Estado**: Estructura semántica básica; algunos estilos de focus pueden estar desactivados o poco visibles.
- **Sugerencia**: Revisar contraste, focus visible, orden de tabulación y mensajes de error accesibles.

---

## Deuda técnica detectada

### 1. Favicon inexistente

- **Problema**: `index.html` referencia `/brands/iconikonix.png`, pero en `public/brands/` existe `iso_ikonix.png`, no `iconikonix.png`.
- **Acción**: Corregir la ruta en `index.html` o añadir el archivo `iconikonix.png`.

### 2. Construcción de URL en API

- **Problema**: En `buildApiUrl`, la concatenación `BASE_URL` + `endpoint` puede generar URLs incorrectas si `BASE_URL` no termina en `/` y el endpoint no empieza con `/`.
- **Acción**: Revisar y normalizar la construcción de URLs (p. ej. asegurar barra entre base y endpoint).

### 3. ProductDetail.jsx extenso

- **Problema**: El archivo es grande; mezcla presentación, formulario de cotización, especificaciones y productos relacionados.
- **Sugerencia**: Extraer subcomponentes (FormCotizacion, EspecificacionesProducto, ProductosRelacionados) o hooks para mejorar mantenibilidad.

### 4. Nombres de tema inconsistentes

- **Problema**: Algunos componentes usan `primaryLight`, `primaryDark`, `background`, `border`, `text.disabled` que no están definidos en todas las empresas de `empresas.js`.
- **Sugerencia**: Unificar el esquema de colores en todas las configuraciones de empresa o definir fallbacks en el tema base.

### 5. Automax sin scripts de build

- **Estado**: Automax está en `empresas.js` pero no tiene `dev:automax` ni `build:automax` en `package.json`.
- **Acción**: Añadir scripts si se va a desplegar Automax.

---

## Suposiciones o partes no claras

### 1. Formato exacto de la API de productos

- **Suposición**: La API devuelve un objeto con `data` o un array; los productos tienen campos `DMA_*`.
- **Pendiente**: Documentar contrato exacto de la API (schema, ejemplos) si está disponible.

### 2. CORS en desarrollo

- **Suposición**: La API permite CORS desde `http://localhost:3100`.
- **Pendiente**: Si hay problemas, verificar configuración CORS del backend.

### 3. Dominios y builds en Vercel

- **Suposición**: Cada dominio tiene su propio proyecto o configuración en Vercel con la variable de empresa correspondiente.
- **Pendiente**: Documentar el proceso exacto de deploy por dominio si hay pasos manuales específicos.

### 4. CatalogFlow steps vacíos

- **Estado**: `catalogFlow.json` tiene `steps: []` para todas las líneas. Los pasos de filtro se derivan en runtime de los datos de productos.
- **Suposición**: El diseño pretende que los pasos se generen dinámicamente según los atributos disponibles.
- **Pendiente**: Confirmar si en el futuro se configurarán steps explícitos en el JSON.

### 5. API de imágenes

- **Suposición**: `DMA_RUTAIMAGEN` contiene una ruta relativa o absoluta que se concatena con `VITE_API_IMAGES_URL`.
- **Pendiente**: Verificar el formato real de las rutas que devuelve la API.
