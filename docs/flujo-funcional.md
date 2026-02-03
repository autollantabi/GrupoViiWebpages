# Flujos funcionales principales

Descripción paso a paso de los flujos principales del sistema. No existe autenticación ni autorización de usuarios; el acceso es público.

## Flujo 1: Navegación inicial y selección de empresa

1. El usuario accede a la URL del sitio (ej: maxximundo.com, ikonix.ec).
2. El servidor (Vercel) sirve `index.html` para cualquier ruta (rewrites en `vercel.json`).
3. El navegador carga `main.jsx` y monta `App`.
4. `useEmpresa()` lee `VITE_EMPRESA_NOMBRE` del entorno (definido en build).
5. El tema y textos se obtienen de `empresas.js` según el nombre de la empresa.
6. El usuario ve la página de inicio (Home) con el diseño y copy de esa empresa.

**Nota:** La empresa no se cambia en runtime; está fijada en el build. Cada dominio suele corresponder a un build con su propia `VITE_EMPRESA_NOMBRE`.

---

## Flujo 2: Explorar el catálogo

### 2.1 Pantalla de bienvenida (sin línea seleccionada)

1. Usuario navega a `/catalogo`.
2. `Catalog.jsx` usa `useCatalogFlow` y `useCatalogURL`.
3. Si no hay query param `linea` en la URL, se muestra la pantalla de bienvenida con cards de líneas de negocio (según `lineasNegocio` de la empresa).
4. El usuario hace clic en una línea (ej: "Llantas").

### 2.2 Selección de filtros en cascada

1. Al seleccionar una línea, `useCatalogURL.setLinea()` actualiza la URL con `?linea=llantas`.
2. `useCatalogFlow` obtiene los pasos de filtro (derivados de los datos de productos y `catalogFlow.json`).
3. Se muestran `FilterCards` con los pasos (p1, p2, p3… según la estructura de datos).
4. El usuario selecciona valores en cada paso; la URL se actualiza con `p1`, `p2`, etc.
5. Los productos se filtran en cliente según los valores seleccionados.

### 2.3 Vista de resultados

1. Cuando hay suficientes filtros o se llega al final del flujo, se muestra la vista de productos.
2. Componentes: `AdditionalFilters` (sidebar/modal), `ProductGridView`, `CatalogBreadcrumb`.
3. `AdditionalFilters` permite filtros adicionales (DMA_MARCA, DMA_RIN, etc.) y búsqueda; todo se refleja en la URL.
4. Paginación, orden y "por página" también están en la URL (`page`, `sort`, `perPage`).
5. `useProducts` carga los productos (con caché de 5 min); `useCatalogFlow` filtra en memoria.

### 2.4 Volver al catálogo desde un producto

1. Al hacer clic en un producto, se guarda en `sessionStorage`: `previousCatalogUrl` y `selectedProductId`.
2. Al volver desde `ProductPage` al catálogo, se restaura la URL y opcionalmente el scroll al ítem seleccionado.

---

## Flujo 3: Ver detalle de producto y solicitar cotización

### 3.1 Ver detalle

1. Usuario hace clic en un producto (en Home, Catálogo o Marcas).
2. Navegación a `/producto/{DMA_IDENTIFICADORITEM}`.
3. `ProductPage.jsx` obtiene el `id` de la ruta, usa `useProducts.fetchProductById(id)`.
4. Si no existe el producto, redirige al catálogo.
5. Se muestra `ProductDetail` con imagen, especificaciones, descripción y formulario de cotización.

### 3.2 Solicitar cotización

1. Usuario completa el formulario: nombre, correo, teléfono, ciudad, provincia.
2. Debe aceptar la política de datos (checkbox).
3. Al enviar, se llama a `emailService.enviarCotizacion()` con: nombre, correo, telefono, ciudad, provincia, codigoProducto (del producto), empresa.
4. Si la petición es exitosa, se muestra notificación de éxito.
5. Si falla, se muestra notificación de error con el mensaje.

---

## Flujo 4: Formulario de contacto

1. Usuario navega a `/contacto`.
2. Rellena: nombre, correo, teléfono, asunto, mensaje.
3. Al enviar, `Contact.jsx` llama a `emailService.enviarComentario()` con esos campos + empresa.
4. Se valida formato de email y campos requeridos antes de enviar.
5. Se muestra notificación de éxito o error.

---

## Flujo 5: Explorar marcas

1. Usuario navega a `/marcas`.
2. `Brands.jsx` muestra las marcas agrupadas por línea de negocio (según `empresas.js`).
3. Cada marca tiene un botón "Ver productos".
4. Al hacer clic, se navega a `/catalogo?linea=xxx&DMA_MARCA=yyy` (o equivalente según la estructura de filtros).
5. El catálogo se abre ya filtrado por esa marca.

---

## Flujo 6: Políticas de privacidad (solo Maxximundo)

1. Rutas `/politicas-privacidad` y `/politicas-privacidad-shellmaxx` solo existen si la empresa es Maxximundo.
2. `App.jsx` comprueba `empresa?.toUpperCase() === "MAXXIMUNDO"` para renderizar esas rutas.
3. Los enlaces están en el footer solo para Maxximundo.
4. El contenido es estático (legal).

---

## Autenticación, autorización y permisos

- **No hay autenticación de usuario.** Todas las rutas son públicas.
- **No hay roles ni permisos.** Cualquier visitante puede ver el catálogo, contactar y solicitar cotización.
- La única restricción es que las rutas de políticas de privacidad solo se muestran en el build de Maxximundo (condición de código, no de sesión).
