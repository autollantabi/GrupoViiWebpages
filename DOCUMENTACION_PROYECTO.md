# Documentación del Proyecto — GrupoVii Webpages

Documentación técnica completa del sitio web multi-empresa del Grupo VII. Este documento describe arquitectura, estructura, páginas, estilos, lógica, integraciones, configuración y guía para desarrolladores.

---

## 1. Descripción general del proyecto

### 1.1 Qué es GrupoVii

Grupo VII es un grupo empresarial que opera varias marcas en el sector automotriz (llantas, lubricantes, herramientas). Este repositorio es un **monorepo de páginas web** que sirve a múltiples empresas con un mismo código base, diferenciado por variable de entorno y configuración por empresa.

Las empresas soportadas son:

- **Ikonix** — Herramientas profesionales (Uyustools).
- **Autollanta** — Llantas (Fortune, Maxtrek).
- **Maxximundo** — Llantas, llantas moto y lubricantes (Shell, Pennzoil, Maxxis, Roadcruza, Aplus, Haohua, CST, Keystone). Incluye páginas de políticas de privacidad (general y ShellMaxx).
- **Stox** — Llantas (Farroad, Antares, CST, Wonderland).
- **Automax** — Llantas y llantas moto (Maxtrek, Austone, Maxxis, Sunfull, Aplus, CST). Configurado en `empresas.js` pero sin script de build específico en `package.json`.

### 1.2 Objetivo de las páginas web

- Mostrar **catálogo de productos** (llantas, lubricantes, herramientas) con filtros por línea de negocio y atributos.
- Dar a conocer **marcas** representadas y enlazar al catálogo filtrado.
- Ofrecer **información de contacto**, formulario de consulta y ubicación (mapa embebido).
- Permitir **solicitud de cotización** desde la ficha de producto.
- Para Maxximundo: exponer **políticas de privacidad** (sitio y app ShellMaxx).

### 1.3 Público objetivo

- Clientes finales y profesionales que buscan llantas, lubricantes o herramientas.
- Usuarios que quieren cotizar o contactar a la empresa.
- Enlaces desde el sitio corporativo a **viicommerce.com** (mayoristas).

---

## 2. Arquitectura del proyecto

### 2.1 Tipo de sitio

- **SPA (Single Page Application)** con React.
- Contenido renderizado en cliente; una única entrada HTML (`index.html`) y rutas manejadas por React Router.
- Deploy como sitio estático (Vercel); rewrites en `vercel.json` envían todas las rutas no-API a `index.html` para que el router funcione correctamente.

### 2.2 Tecnologías utilizadas

| Tecnología        | Versión   | Uso principal                          |
|-------------------|-----------|----------------------------------------|
| React             | ^19.0.0   | UI y componentes                       |
| React DOM         | ^19.0.0   | Renderizado                            |
| React Router DOM  | ^7.5.2    | Navegación y rutas                     |
| Styled Components | ^6.1.17   | Estilos (CSS-in-JS) y tema             |
| React Icons       | ^5.5.0    | Iconos (FaIcons)                       |
| PropTypes         | ^15.8.1   | Validación de props                    |
| Vite              | ^6.3.1    | Build y dev server                     |
| @vitejs/plugin-react-swc | ^3.8.0 | Compilación React con SWC        |
| cross-env         | ^7.0.3    | Variables de entorno multiplataforma   |
| ESLint            | ^9.22.0   | Linting                                |

### 2.3 Flujo general de navegación

1. **Entrada:** `index.html` carga `src/main.jsx` → monta `<App />` con `StrictMode`.
2. **App:** Envuelve la app en `ThemeProvider` (tema por empresa), `GlobalStyle`, `DynamicTitle`, `Router`, `ScrollToTop` y `Layout` (Header + Main + Footer). `Layout` incluye `NotificationProvider` y el componente que muestra notificaciones.
3. **Rutas:** Definidas en un componente interno que usa `useEmpresa()`. Rutas comunes: `/`, `/marcas`, `/catalogo`, `/producto/:id`, `/contacto`. Para empresa Maxximundo se añaden `/politicas-privacidad` y `/politicas-privacidad-shellmaxx`.
4. **Empresa:** La empresa activa se define en build con `VITE_EMPRESA_NOMBRE`; el tema y textos se leen de `src/config/empresas.js`.
5. **Catálogo:** Estado del catálogo (línea, filtros, página, orden, búsqueda) se refleja en la URL (query params); al volver de un producto se restaura la vista y opcionalmente el scroll al ítem.

---

## 3. Estructura de carpetas

### 3.1 Raíz del proyecto

| Archivo / Carpeta   | Descripción |
|---------------------|-------------|
| `package.json`     | Nombre del proyecto (`vite-webpage-ikonix`), scripts y dependencias. |
| `vite.config.js`    | Configuración Vite: plugin React SWC, `base: "/"`, `outDir: "dist"`, `assetsDir: "static"`, server en puerto 3100, host 0.0.0.0. |
| `vercel.json`      | Rewrites para SPA (todo excepto `api/` → `index.html`), headers de caché para `/static/*`. |
| `index.html`        | Punto de entrada: meta, fuentes Google (Raleway), `#root`, script a `src/main.jsx`. |
| `eslint.config.js`  | ESLint flat config: JS/JSX, react-hooks, react-refresh, reglas recomendadas. |
| `.gitignore`        | Excluye `node_modules`, `dist`, `.env`, logs, etc. |
| `.vercelignore`     | Excluye `node_modules`, `.env.*`, logs para deploy. |
| `README.md`         | Guía rápida del catálogo (características, instalación, configuración). |

### 3.2 `public/`

- **`robots.txt`:** Permite todo; referencia sitemaps de autollanta.com, maxximundo.com, ikonix.ec, stox.com.ec; `Crawl-delay: 1`; prohíbe `/admin/`, `/api/`, `/_vercel/`.
- **`sitemap.xml`:** URLs estáticas por dominio (inicio, marcas, catálogo, contacto) para los cuatro dominios anteriores.
- **`brands/`:** Logos e isotipos por empresa y marca (png): ikonix, autollanta, maxximundo, stox, automax, marcas de producto (shell, maxxis, etc.). El favicon en `index.html` apunta a `/brands/iconikonix.png` (ver nota en sección 9 si falta el archivo).
- **`vite.svg`:** Icono por defecto de Vite.

### 3.3 `src/`

| Carpeta / Archivo   | Descripción |
|---------------------|-------------|
| **`main.jsx`**      | Punto de entrada: `createRoot`, `StrictMode`, `<App />`. |
| **`App.jsx`**       | `ThemeProvider`, `GlobalStyle`, `DynamicTitle`, `Router`, `ScrollToTop`, `Layout` y definición de rutas según empresa. |
| **`api/`**         | Configuración de API, servicios (productos, email) y hook `useProducts`. |
| **`config/`**       | Datos por empresa (`empresas.js`) y flujo del catálogo por línea (`catalogFlow.json`). |
| **`context/`**     | `NotificationContext` para notificaciones globales. |
| **`hooks/`**       | `useEmpresa`, `useCatalogFlow`, `useCatalogURL`. |
| **`theme/`**       | Tema por empresa y estilos globales (`GlobalStyle`). |
| **`components/`**   | Componentes por dominio: layout, secciones, catálogo, UI, SEO, utilidades. |
| **`pages/`**       | Páginas por ruta. |
| **`assets/`**      | `react.svg` (no usado de forma relevante en la doc). |

### 3.4 `src/api/`

- **`index.js`:** Reexporta config, servicios y `useProducts`.
- **`config/api.js`:** `API_CONFIG` (BASE_URL, TIMEOUT, HEADERS), `API_ENDPOINTS` (productos, email cotización/comentario), `buildApiUrl`.
- **`config/company.js`:** `COMPANY_CONFIG` (EMPRESA_NOMBRE desde env), `getEmpresaNombre`, `validateEmpresaNombre`.
- **`services/apiService.js`:** Cliente HTTP (get/post/put/delete) con timeout y headers por defecto.
- **`services/emailService.js`:** `enviarCotizacion` y `enviarComentario` con validación de campos y formato email.
- **`services/productService.js`:** `getProductsByCompany`, `getProductById`, `getProductsByCategory`, `getRelatedProducts`; normaliza respuesta y asigna `DMA_IDENTIFICADORITEM` si falta.
- **`hooks/useProducts.js`:** Hook con caché en memoria (5 min), estado `products`/`loading`/`error`, `fetchProducts`, `fetchProductById`, `fetchRelatedProducts`, `filterProducts`, `clearError`; carga inicial si no hay caché válido.

### 3.5 `src/config/`

- **`empresas.js`:** Objeto `empresasConfig` por empresa (IKONIX, AUTOLLANTA, MAXXIMUNDO, STOX, AUTOMAX): nombre, títulos, descripción, imágenes (brand, favicon), `colores`, `lineasNegocio`, `marcas` (con logo, línea, descripción, features), `textos` (hero, marcas, catálogo, ubicación, footer, pageMarcas, pageContacto). Funciones `getEmpresaConfig(nombreEmpresa)` y `getEmpresaTheme(nombreEmpresa)`.
- **`catalogFlow.json`:** Por línea de negocio (LLANTAS, LLANTAS MOTO, LUBRICANTES, HERRAMIENTAS, ACCESORIOS) define `name`, `displayName` y `steps` (array de pasos de filtro; actualmente vacío en el JSON, los pasos se derivan de datos de productos en runtime).

### 3.6 `src/theme/`

- **`index.js`:** Tema por defecto (Ikonix) y `getDynamicTheme()` usando `VITE_EMPRESA_NOMBRE` y `getEmpresaTheme`. Exporta `theme` (objeto con colors, fonts, fontSizes, spacing, breakpoints, borderRadius, shadows).
- **`GlobalStyle.js`:** `createGlobalStyle` con reset básico, tipografía Raleway, scroll suave, scrollbar personalizada, estilos de enlaces/botones/inputs/img/listas/headings/p, focus, selection y clase `.scrollable`.

### 3.7 `src/context/`

- **`NotificationContext.jsx`:** Context con estado `notifications`, `addNotification`, `removeNotification`, `showSuccess`, `showError`, `showInfo`. Usado por formularios (contacto, cotización) para feedback.

### 3.8 `src/hooks/`

- **`useEmpresa.js`:** Lee `VITE_EMPRESA_NOMBRE`, devuelve `empresa`, `config` (getEmpresaConfig), `theme` (getEmpresaTheme).
- **`useCatalogFlow.js`:** Lógica del catálogo: línea desde URL (`linea`), filtros de flujo (p1, p2, p3…) y adicionales (DMA_*), búsqueda, pasos y opciones por línea, productos filtrados, navegación entre pasos, filtros adicionales por línea; usa `useProducts` y `catalogFlow.json`.
- **`useCatalogURL.js`:** Sincronización con URL: get/update de params (linea, page, sort, perPage, search, filtros p* y DMA_*), helpers `setLinea`, `setFlowFilters`, `setAdditionalFilter`, `clearAdditionalFilter`, `setPage`, `setSort`, `setPerPage`, `setSearch`, `clearCatalogParams`, etc.

### 3.9 `src/components/`

- **layout/** — `Layout.jsx` (Header + Main + Footer, envuelve en NotificationProvider y NotificationDisplay), `Header.jsx` (logo, nav, menú móvil, enlace Mayoristas), `Footer.jsx` (logo, descripción, redes, enlaces rápidos, contacto; para Maxximundo enlaces a políticas de privacidad).
- **sections/** — `HeroSection`, `BrandsSection`, `CatalogSection` (productos destacados + botón al catálogo), `LocationSection` (texto + mapa iframe).
- **catalog/** — `FilterCards` (pasos de filtro en cascada), `CatalogBreadcrumb`, `AdditionalFilters` (sidebar/modal filtros + búsqueda), `ProductGridView` (grid, orden, paginación, por página), `ProductDetail` (ficha producto, especificaciones, formulario cotización, relacionados), `ProductDetailBreadcrumb`.
- **seo/** — `SEO.jsx`: actualiza title, meta description/keywords, favicon, Open Graph, Twitter Card, theme-color, canonical, JSON-LD Organization.
- **ui/** — `Button`, `Card`, `Dropdown`, `FilterControl`, `Icon`, `Input`, `Link`, `Loader`, `Notification`, `NotificationProvider` (display de notificaciones), `Text`.
- **utils/** — `ScrollToTop` (scroll a 0 en cambio de ruta), `DynamicTitle` (título por empresa si no hay SEO específico).

### 3.10 `src/pages/`

- **Home.jsx** — Hero, BrandsSection, CatalogSection (destacados), LocationSection; SEO Inicio.
- **Brands.jsx** — Listado de marcas por línea con cards y botón “Ver productos” que navega al catálogo con linea + DMA_MARCA.
- **Catalog.jsx** — Pantalla bienvenida (líneas), flujo de filtros (FilterCards) o vista de productos (AdditionalFilters + ProductGridView + CatalogBreadcrumb); estado en URL.
- **ProductPage.jsx** — Resuelve producto por `id` en ruta, breadcrumb, `<ProductDetail>`; redirige al catálogo si no hay producto.
- **Contact.jsx** — Formulario (nombre, email, teléfono, asunto, mensaje) y bloque de información + mapa + horarios; usa `emailService.enviarComentario` y notificaciones.
- **PrivacyPolicy.jsx** — Políticas de privacidad Maxximundo (solo ruta disponible si empresa es Maxximundo).
- **ShellMaxxPrivacyPolicy.jsx** — Políticas de privacidad app ShellMaxx (idem).

### 3.11 Convenciones de nombres

- Componentes y páginas: **PascalCase** (ej. `ProductDetail.jsx`, `CatalogBreadcrumb.jsx`).
- Hooks: **use** + PascalCase (ej. `useEmpresa.js`, `useCatalogURL.js`).
- Servicios: **camelCase** (ej. `apiService.js`, `productService.js`).
- Configuración: **camelCase** o **UPPER_SNAKE** para constantes (ej. `empresas.js`, `API_CONFIG`).
- Styled components: PascalCase con prefijo descriptivo (ej. `ProductDetailContainer`, `FilterCard`).
- Rutas: minúsculas y kebab-case (ej. `/politicas-privacidad-shellmaxx`).

---

## 4. Páginas y secciones

### 4.1 Listado de páginas

| Ruta | Página | Condición |
|------|--------|-----------|
| `/` | Home | Siempre |
| `/marcas` | Brands | Siempre |
| `/catalogo` | Catalog | Siempre |
| `/producto/:id` | ProductPage | Siempre |
| `/contacto` | Contact | Siempre |
| `/politicas-privacidad` | PrivacyPolicy | Solo empresa Maxximundo |
| `/politicas-privacidad-shellmaxx` | ShellMaxxPrivacyPolicy | Solo empresa Maxximundo |

### 4.2 Función de cada página

- **Home:** Presentación de la empresa, marcas, productos destacados (CatalogSection) y ubicación. CTA “Ver Catálogo”.
- **Brands:** Agrupación por línea de negocio; cada marca tiene card con descripción y “Ver productos” → catálogo con `linea` y opcionalmente `DMA_MARCA`.
- **Catalog:** Tres modos: (1) sin `linea`: bienvenida y cards de líneas; (2) con línea y pasos: FilterCards para elegir filtros en cascada; (3) con filtros completos: AdditionalFilters (sidebar/modal) + ProductGridView + CatalogBreadcrumb. Búsqueda y filtros adicionales (DMA_*) en URL.
- **ProductPage:** Detalle de producto por ID (codificado en URL), breadcrumb (línea → Productos → nombre), ProductDetail con especificaciones, cotización y relacionados.
- **Contact:** Formulario de contacto y datos + mapa + horarios; envía comentario vía API.
- **PrivacyPolicy / ShellMaxxPrivacyPolicy:** Contenido legal estático; enlaces en footer solo para Maxximundo.

### 4.3 Componentes reutilizables

- **Layout:** Header, Main, Footer, NotificationProvider y contenedor de notificaciones.
- **SEO:** Meta tags y JSON-LD por página.
- **Button, Link, Input, Card, Icon, Text, Dropdown, FilterControl, Loader:** UI base.
- **Notification + NotificationProvider:** Toasts success/error/info.
- **ScrollToTop, DynamicTitle:** Comportamiento global.
- **CatalogBreadcrumb / ProductDetailBreadcrumb:** Navegación contextual en catálogo y ficha.

---

## 5. Estilos y diseño

### 5.1 Organización del CSS

- **Global:** `GlobalStyle.js` (styled-components) aplica reset, tipografía, scrollbar, focus, selection y clase `.scrollable`.
- **Tema:** `src/theme/index.js` y colores por empresa en `empresas.js`; el tema incluye `colors`, `fonts`, `fontSizes`, `spacing`, `breakpoints`, `borderRadius`, `shadows`.
- **Componentes:** Estilos con styled-components en el mismo archivo del componente o en archivos de sección/página; uso de `theme` vía props.

### 5.2 Responsive design

- Breakpoints en tema: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
- Header: menú hamburguesa en `< md`, enlaces en desktop.
- Catalog: AdditionalFilters como sidebar en `lg` y modal en móvil; ProductGridView se adapta con grid responsivo.
- Footer y secciones: columnas que colapsan y apilan en pantallas pequeñas.
- ProductDetail: disposición en columna en móvil y en fila en `md+`.

### 5.3 Variables, temas y convenciones visuales

- Colores por empresa: `primary`, `secondary`, `accent`, `white`, `light`, `dark`, `gray`, `lightGray`, `text.primary/secondary/light`. Algunos componentes usan `primaryLight`, `primaryDark`, `background`, `border` o `text.disabled` que no están en todas las definiciones de empresa; pueden heredar de tema por defecto o quedar undefined (revisar si hay fallos visuales).
- Tipografía: Raleway (Google Fonts) como fuente principal.
- Botones: variantes `primary`, `secondary`, `outline`, `text`; tamaños `sm`, `md`, `lg`.
- Cards: sombras y bordes al hover; uso de `theme.borderRadius` y `theme.shadows`.

---

## 6. JavaScript y lógica

### 6.1 Scripts principales

- **main.jsx:** Montaje de la app.
- **App.jsx:** Composición de providers, rutas y Layout; rutas condicionadas por `isMaxximundo`.
- **Catalog.jsx:** Orquestación de useCatalogFlow y useCatalogURL; sincronización URL ↔ filtros y búsqueda; handlers de línea, filtros, producto seleccionado y sessionStorage para “volver al catálogo” y scroll al ítem.

### 6.2 Eventos y comportamientos dinámicos

- Navegación: React Router (Link, NavLink, useNavigate, useParams, useLocation, useSearchParams).
- Formularios: Contact (validación local, `enviarComentario`), ProductDetail (cotización con checkbox política, `enviarCotizacion`); ambos usan notificaciones.
- Catálogo: selección de línea y filtros actualiza URL; búsqueda con debounce; paginación y orden en URL; al elegir producto se guarda `previousCatalogUrl` y `selectedProductId` en sessionStorage para restaurar vista y scroll al volver.
- Header: toggle menú móvil; cierre al navegar.
- AdditionalFilters: acordeones, búsqueda por filtro, modal en móvil.

### 6.3 Validaciones y estados

- **Contact:** Campos requeridos, formato email, longitud mínima del mensaje; errores por campo.
- **Cotización (ProductDetail):** Campos requeridos, email válido, aceptación de política de datos.
- **emailService:** Validación de campos obligatorios y formato email antes de enviar.
- **useProducts:** Estado `loading`/`error`; caché con TTL 5 min; reintentos implícitos vía llamadas desde componentes.

---

## 7. Integraciones externas

### 7.1 Formularios

- **Contacto:** POST a `API_ENDPOINTS.EMAIL.COMENTARIO` con nombre, correo, teléfono, asunto, mensaje, empresa.
- **Cotización:** POST a `API_ENDPOINTS.EMAIL.COTIZACION` con nombre, correo, teléfono, ciudad, provincia, codigoProducto, empresa; checkbox de aceptación de política.

### 7.2 Servicios de terceros

- **Google Fonts:** Raleway (link en `index.html`).
- **Google Maps:** Iframes embebidos en Contact y LocationSection; URLs en `config.textos.ubicacion.map` por empresa.
- **Google Site Verification:** Meta en `index.html` (`google-site-verification`).
- **Enlace mayoristas:** Botón “Mayoristas” en Header → `https://viicommerce.com`.
- No hay analytics ni scripts de terceros documentados en el código revisado.

### 7.3 APIs

- **Base URL:** `VITE_API_BASE_URL` (por defecto `http://192.168.3.68:3700`).
- **Endpoints:**
  - `GET web/productos/{empresaNombre}` — Listado de productos.
  - `POST email/cotizacion` — Envío de cotización.
  - `POST email/comentario` — Envío de comentario/contacto.
- **Imágenes de productos:** `VITE_API_IMAGES_URL` + `DMA_RUTAIMAGEN` del producto.

---

## 8. Configuraciones importantes

### 8.1 Variables de entorno

Usadas con `import.meta.env` (Vite); prefijo `VITE_` para exponer al cliente:

| Variable | Uso |
|----------|-----|
| `VITE_EMPRESA_NOMBRE` | Empresa activa (ikonix, autollanta, maxximundo, stox). Define tema y textos. |
| `VITE_API_BASE_URL` | Origen de la API (productos y email). |
| `VITE_API_IMAGES_URL` | Base URL para imágenes de productos. |
| `VITE_API_TIMEOUT` | Timeout de peticiones (opcional). |
| `VITE_MAYORISTA_URL` | URL del portal mayoristas (referenciada en ProductDetail). |

No hay `.env` en el repo (está en `.gitignore`); se asume `.env` o variables en entorno de build.

### 8.2 Proceso de build

- **Comando estándar:** `npm run build` (usa `VITE_EMPRESA_NOMBRE` del entorno).
- **Por empresa:** `npm run build:ikonix`, `build:autollanta`, `build:maxximundo`, `build:stox` (cross-env + Vite build).
- **Salida:** `dist/` con `index.html` y `static/` (assets con hash).
- **Source maps:** Desactivados en `vite.config.js`.

### 8.3 Proceso de deploy

- **Plataforma:** Vercel (implícito por `vercel.json`).
- **Rewrites:** Cualquier ruta que no sea `api/` se sirve con `index.html` (SPA).
- **Headers:** `/static/*` con `Cache-Control: public, max-age=31536000, immutable`.
- Cada dominio (autollanta.com, maxximundo.com, ikonix.ec, stox.com.ec) suele corresponder a un build con su `VITE_EMPRESA_NOMBRE`.

### 8.4 Dominios y hosting

- Dominios referenciados en `robots.txt` y `sitemap.xml`: autollanta.com, maxximundo.com, ikonix.ec, stox.com.ec.
- Hosting estático (Vercel); API y correo en servidor externo (BASE_URL y endpoints configurados por env).

---

## 9. Buenas prácticas actuales del proyecto

- **Organización:** Separación clara entre api, config, hooks, context, theme, components (layout/sections/catalog/ui/seo/utils) y pages; configuración por empresa centralizada en `empresas.js`.
- **Rendimiento:** Caché de productos en useProducts, lazy loading de imágenes (`loading="lazy"`), build con Vite y SWC; assets estáticos con caché largo en Vercel.
- **SEO:** Componente SEO por página (title, description, keywords, OG, Twitter, canonical, JSON-LD); sitemap y robots.txt; títulos dinámicos por empresa.
- **Accesibilidad:** Uso de semántica (nav, main, footer), labels en formularios, `alt` en imágenes; algunos estilos de focus comentados en GlobalStyle; se puede mejorar contraste y foco visible.

**Nota:** En `index.html` el favicon apunta a `/brands/iconikonix.png`. En `public/brands/` aparece `iso_ikonix.png` pero no `iconikonix.png`; conviene alinear nombre del archivo o ruta para evitar 404.

---

## 10. Puntos de mejora futura

- **Escalabilidad:** Extraer más strings y opciones a config o i18n; considerar rutas o builds adicionales para Automax si se despliega.
- **Mantenibilidad:** Reducir tamaño de `ProductDetail.jsx` (extraer formulario de cotización, bloque de especificaciones y relacionados a subcomponentes o hooks); unificar nombres de tema (primaryLight, primaryDark, background, border) en todas las empresas.
- **Optimización:** Lazy loading de rutas (React.lazy + Suspense); revisar si conviene generar sitemap dinámico con URLs de productos; imágenes con tamaños responsivos o srcset.
- **Testing:** No hay tests en el repo; añadir tests unitarios para hooks (useCatalogURL, useCatalogFlow) y servicios (email, product).
- **Accesibilidad y UX:** Revisar contraste, focus visible y orden de tabulación; mensajes de error accesibles y coherentes.

---

## 11. Guía rápida para nuevos desarrolladores

### 11.1 Cómo correr el proyecto

```bash
# Instalación
npm install

# Variables (crear .env en raíz)
# VITE_EMPRESA_NOMBRE=ikonix
# VITE_API_BASE_URL=https://...
# VITE_API_IMAGES_URL=https://...

# Desarrollo (puerto 3100)
npm run dev

# Por empresa
npm run dev:ikonix
npm run dev:autollanta
npm run dev:maxximundo
npm run dev:stox

# Build
npm run build
npm run build:ikonix   # etc.

# Preview del build
npm run preview
```

### 11.2 Flujo de trabajo recomendado

1. Definir empresa con `VITE_EMPRESA_NOMBRE` y opcionalmente API URLs en `.env`.
2. Para textos/colores/imágenes de una empresa: editar `src/config/empresas.js`.
3. Para pasos del catálogo por línea: revisar `src/config/catalogFlow.json` y la lógica en `useCatalogFlow.js` (los steps pueden derivarse de datos).
4. Para nuevas rutas: añadirlas en el componente de rutas dentro de `App.jsx` y, si aplica, en sitemap/robots.
5. Lint: `npm run lint`.

### 11.3 Qué tocar y qué evitar

- **Tocar:** `src/config/empresas.js` para nuevas empresas o cambios de copy/colores; `public/brands/` para logos; `src/pages/` y `src/components/` para funcionalidad y UI; `src/api/config/` y `.env` para endpoints y empresa.
- **Evitar:** Modificar rewrites de `vercel.json` sin necesidad; romper la convención de query params del catálogo (linea, p1, p2, DMA_*, page, sort, perPage, search) porque la URL es fuente de verdad; hardcodear empresa en código (usar siempre `useEmpresa()` o env).

---

**Desarrollado por:** [Diego Barbecho](https://github.com/diegobarpdev)
