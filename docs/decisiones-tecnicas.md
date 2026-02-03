# Decisiones técnicas

Justificación de tecnologías elegidas, alternativas consideradas y trade-offs importantes.

## Stack tecnológico

### React + Vite

- **React 19**: Biblioteca de UI dominante, amplio ecosistema y documentación.
- **Vite**: Build tool rápido, HMR inmediato, configuración sencilla. Alternativa a Create React App (deprecado) y a Webpack directo.
- **SWC** (`@vitejs/plugin-react-swc`): Compilación más rápida que Babel para JSX/TS.

**Trade-off:** Vite requiere Node.js moderno; no soporta navegadores muy antiguos sin polyfills adicionales. En la práctica, el público objetivo usa navegadores actuales.

### Styled Components

- **CSS-in-JS** con soporte de tema (ThemeProvider).
- Permite colores dinámicos por empresa sin archivos CSS separados.
- Los componentes reciben `theme` vía props y pueden usar breakpoints, colores, espaciado centralizados.

**Alternativas consideradas (inferidas):** CSS Modules, Tailwind, Emotion. Styled Components ofrece buena integración con temas dinámicos y ya está integrado en el proyecto.

### React Router DOM v7

- Rutas declarativas, hooks (`useNavigate`, `useParams`, `useSearchParams`, `useLocation`).
- `useSearchParams` se usa para mantener el estado del catálogo en la URL.

### PropTypes (sin TypeScript)

- Validación de props en tiempo de ejecución.
- **Trade-off:** No hay verificación estática como en TypeScript; el proyecto es JavaScript puro. Migrar a TypeScript sería una mejora futura.

---

## Arquitectura multi-empresa

### Build-time configuration

La empresa se define en tiempo de build mediante `VITE_EMPRESA_NOMBRE`. Cada despliegue corresponde a una empresa.

**Ventajas:**
- Un solo código base.
- No hay lógica condicional compleja en runtime para "cambiar de empresa".
- Cada sitio es un bundle independiente, sin datos de otras empresas.

**Desventajas:**
- Se necesita un build por empresa/dominio.
- No es posible cambiar de empresa sin nuevo deploy.

**Alternativa no elegida:** Una SPA que permita seleccionar empresa en runtime. Aumentaría complejidad y tamaño del bundle (cargar config de todas las empresas).

---

## Estado del catálogo en la URL

El catálogo usa query params para línea, filtros (p1, p2, DMA_*), página, orden, búsqueda.

**Ventajas:**
- URLs compartibles y navegables (atrás/adelante).
- Estado persistente al recargar.
- Mejor para SEO en vistas de catálogo (aunque el contenido se carga en cliente).

**Trade-off:** URLs largas con muchos filtros; posible límite en algunos navegadores (en la práctica no suele ser problema).

---

## Cliente HTTP propio (fetch)

No se usa axios ni otra librería HTTP. El proyecto implementa un cliente con `fetch` y `AbortController` para timeout.

**Ventajas:**
- Sin dependencia extra.
- Código simple y suficiente para los casos de uso actuales.

**Desventajas:**
- Menos features out-of-the-box (interceptors, cancelación granular). Si se necesitan, habría que implementarlas o migrar a axios/fetch-wrapper.

---

## Caché de productos en memoria

`useProducts` mantiene un caché global de 5 minutos. No hay persistencia en localStorage ni sessionStorage.

**Ventajas:**
- Menos peticiones a la API durante la sesión.
- Respuesta rápida al cambiar de vista dentro del catálogo.

**Desventajas:**
- Al recargar la página se pierde el caché.
- Si los productos cambian con frecuencia, 5 min puede ser demasiado. Valor ajustable en código.

---

## Despliegue en Vercel

- Rewrites para SPA (todas las rutas → `index.html`).
- Headers de caché para `/static/*`.
- Deploy automático desde Git (si está configurado).

**Alternativas:** Netlify, Cloudflare Pages, hosting estático tradicional. Vercel está bien integrado con proyectos React/Vite.

---

## Sin tests

No hay tests unitarios ni de integración en el repositorio.

**Trade-off:** Desarrollo más rápido, pero mayor riesgo en refactors. Se recomienda añadir tests para hooks críticos (`useCatalogFlow`, `useCatalogURL`) y servicios (email, product).

---

## sitemap.xml estático

El sitemap incluye URLs estáticas (inicio, marcas, catálogo, contacto) por dominio. No incluye URLs dinámicas de productos.

**Trade-off:** Sencillo de mantener, pero los productos no están indexados vía sitemap. Los crawlers pueden descubrirlos por enlaces internos. Un sitemap dinámico requeriría un proceso de generación en build o un endpoint en el backend.
