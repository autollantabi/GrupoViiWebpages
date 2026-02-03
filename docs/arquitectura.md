# Arquitectura del sistema

Descripción general de la arquitectura, carpetas principales, separación de responsabilidades y cómo añadir nuevas pantallas o funcionalidades.

## Arquitectura general

El proyecto es una **SPA (Single Page Application)** con React. El contenido se renderiza en cliente; existe una única entrada HTML (`index.html`) y las rutas son manejadas por React Router. El despliegue se realiza como sitio estático en Vercel, con rewrites que envían todas las rutas no-API a `index.html` para permitir la navegación SPA.

### Flujo de arranque

1. `index.html` carga `src/main.jsx`
2. `main.jsx` monta `<App />` con `StrictMode`
3. `App.jsx` envuelve la app en: `ThemeProvider` (tema por empresa), `GlobalStyle`, `DynamicTitle`, `Router`, `ScrollToTop`, `Layout`
4. `Layout` incluye `Header`, `Main` (contenido), `Footer`, `NotificationProvider` y el componente de notificaciones
5. Las rutas se resuelven según la ruta actual; la empresa activa viene de `VITE_EMPRESA_NOMBRE` y el tema/textos de `src/config/empresas.js`

## Árbol de carpetas relevante

```
GrupoViiWebpages/
├── index.html                 # Entrada HTML
├── package.json               # Dependencias y scripts
├── vite.config.js             # Configuración Vite
├── vercel.json                # Rewrites SPA, headers de caché
├── eslint.config.js           # Configuración ESLint
├── .gitignore
├── .vercelignore
├── public/
│   ├── robots.txt             # Directivas para crawlers
│   ├── sitemap.xml            # URLs estáticas por dominio
│   └── brands/                # Logos e isotipos (PNG)
├── docs/                      # Documentación técnica
└── src/
    ├── main.jsx               # Punto de entrada
    ├── App.jsx                # Composición, providers, rutas
    ├── api/                   # Configuración y servicios API
    │   ├── config/
    │   │   ├── api.js         # BASE_URL, ENDPOINTS, buildApiUrl
    │   │   └── company.js     # EMPRESA_NOMBRE, helpers
    │   ├── services/
    │   │   ├── apiService.js  # Cliente HTTP (get/post/put/delete)
    │   │   ├── emailService.js # Cotización y comentarios
    │   │   └── productService.js # Productos por empresa/ID/categoría/relacionados
    │   └── hooks/
    │       └── useProducts.js # Hook con caché, fetch productos
    ├── config/
    │   ├── empresas.js        # Config por empresa (colores, textos, marcas)
    │   └── catalogFlow.json   # Flujo del catálogo por línea de negocio
    ├── context/
    │   └── NotificationContext.jsx  # Estado global de notificaciones
    ├── hooks/
    │   ├── useEmpresa.js      # Empresa activa, config, tema
    │   ├── useCatalogFlow.js  # Lógica del catálogo, filtros, pasos
    │   └── useCatalogURL.js   # Sincronización URL ↔ estado del catálogo
    ├── theme/
    │   ├── index.js           # Tema dinámico por empresa
    │   └── GlobalStyle.js     # Estilos globales (reset, tipografía, etc.)
    ├── components/
    │   ├── layout/            # Header, Footer, Layout
    │   ├── sections/          # HeroSection, BrandsSection, CatalogSection, LocationSection
    │   ├── catalog/           # FilterCards, ProductGridView, ProductDetail, etc.
    │   ├── seo/               # SEO (meta tags, JSON-LD)
    │   ├── ui/                # Button, Card, Input, Loader, etc.
    │   └── utils/             # ScrollToTop, DynamicTitle
    └── pages/
        ├── Home.jsx
        ├── Brands.jsx
        ├── Catalog.jsx
        ├── ProductPage.jsx
        ├── Contact.jsx
        ├── PrivacyPolicy.jsx
        └── ShellMaxxPrivacyPolicy.jsx
```

## Separación de responsabilidades

| Capa | Responsabilidad |
|------|-----------------|
| **api/** | Configuración, cliente HTTP, servicios (productos, email), hook de productos |
| **config/** | Datos estáticos por empresa y flujo del catálogo |
| **context/** | Estado global (notificaciones) |
| **hooks/** | Lógica reutilizable: empresa, catálogo, URL |
| **theme/** | Tema y estilos globales |
| **components/** | UI reutilizable y bloques por dominio |
| **pages/** | Vistas por ruta |

## Módulos principales

### API

- **apiService.js**: Cliente HTTP con timeout, métodos `get`, `post`, `put`, `delete`
- **productService.js**: `getProductsByCompany`, `getProductById`, `getProductsByCategory`, `getRelatedProducts`
- **emailService.js**: `enviarCotizacion`, `enviarComentario`
- **useProducts.js**: Caché en memoria (5 min), carga inicial, estado loading/error

### Configuración por empresa

- **empresas.js**: `empresasConfig` por empresa (IKONIX, AUTOLLANTA, MAXXIMUNDO, STOX, AUTOMAX) con `nombre`, `titulo`, `colores`, `lineasNegocio`, `marcas`, `textos`
- **catalogFlow.json**: Por línea (LLANTAS, LLANTAS MOTO, LUBRICANTES, HERRAMIENTAS, ACCESORIOS) define `name`, `displayName`, `steps` (actualmente vacíos; los pasos se derivan en runtime)

### Catálogo

- **useCatalogFlow**: Línea desde URL, filtros de flujo (p1, p2, …) y adicionales (DMA_*), pasos y opciones por línea, productos filtrados
- **useCatalogURL**: Sincronización con query params (linea, page, sort, perPage, search, p*, DMA_*)

## Cómo añadir una nueva pantalla o funcionalidad

### Añadir una nueva página

1. Crear el componente en `src/pages/NuevaPagina.jsx`
2. Añadir la ruta en `App.jsx` dentro de `RouteHandler`:
   ```jsx
   <Route path="/nueva-ruta" element={<NuevaPagina />} />
   ```
3. Añadir enlace en `Header.jsx` o `Footer.jsx` si corresponde
4. Actualizar `public/sitemap.xml` y, si aplica, `robots.txt`

### Añadir una nueva empresa

1. Añadir la configuración en `src/config/empresas.js` dentro de `empresasConfig`
2. Crear scripts en `package.json`:
   ```json
   "dev:nuevaempresa": "cross-env VITE_EMPRESA_NOMBRE=nuevaempresa vite --port 3100",
   "build:nuevaempresa": "cross-env VITE_EMPRESA_NOMBRE=nuevaempresa vite build"
   ```
3. Añadir logos/isotipos en `public/brands/` si son necesarios

### Añadir un endpoint de API

1. Definir el endpoint en `src/api/config/api.js` en `API_ENDPOINTS`
2. Crear o extender un servicio en `src/api/services/`
3. Usar el servicio desde el componente o hook correspondiente

## Patrones de diseño utilizados

- **Singleton**: `apiService`, `emailService`, `productService` — instancia única exportada
- **Context**: `NotificationContext` para notificaciones globales
- **Custom hooks**: `useEmpresa`, `useCatalogFlow`, `useCatalogURL`, `useProducts` para encapsular lógica
- **Provider pattern**: `ThemeProvider` (styled-components), `NotificationProvider`, `Router`
- **Composición**: Layout (Header + Main + Footer), páginas que combinan secciones y componentes
