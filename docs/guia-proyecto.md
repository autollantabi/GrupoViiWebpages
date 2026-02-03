# Guía de proyecto — Onboarding rápido

Resumen para incorporación de nuevos desarrolladores: qué es el proyecto, cómo empezar, dónde está cada cosa y flujo típico para añadir funcionalidad.

## Qué es el proyecto

Grupo VII Webpages es un **monorepo de sitios web corporativos** para las marcas del Grupo VII (sector automotriz). Un único código base sirve a varias empresas (Ikonix, Autollanta, Maxximundo, Stox, Automax) mediante:

- Variable de entorno `VITE_EMPRESA_NOMBRE` en tiempo de build
- Configuración por empresa en `src/config/empresas.js`
- Tema dinámico (colores, textos, logos) según la empresa

Cada dominio (autollanta.com, maxximundo.com, ikonix.ec, stox.com.ec) corresponde típicamente a un build con su empresa asignada.

## Cómo empezar

1. **Leer** [docs/indice.md](indice.md) para el orden de lectura recomendado.
2. **Instalar** siguiendo [docs/setup.md](setup.md).
3. **Ejecutar** `npm run dev` y explorar la aplicación.
4. **Revisar** [docs/arquitectura.md](arquitectura.md) para entender la estructura.

## Dónde está cada cosa

| Necesito… | Ubicación |
|-----------|-----------|
| Cambiar colores, textos o marcas de una empresa | `src/config/empresas.js` |
| Cambiar pasos del catálogo por línea | `src/config/catalogFlow.json` y `useCatalogFlow.js` |
| Cambiar URLs de la API | `.env` (`VITE_API_BASE_URL`, `VITE_API_IMAGES_URL`) |
| Añadir o modificar una página | `src/pages/`, rutas en `App.jsx` |
| Componentes reutilizables | `src/components/ui/` |
| Componentes del catálogo | `src/components/catalog/` |
| Llamadas a API | `src/api/services/` |
| Notificaciones (toasts) | `src/context/NotificationContext.jsx` |
| Tema y estilos globales | `src/theme/` |
| Logos e imágenes estáticas | `public/brands/` |
| SEO (meta, sitemap) | `src/components/seo/SEO.jsx`, `public/sitemap.xml`, `public/robots.txt` |

## APIs e integraciones (resumen)

- **API de productos**: `GET web/productos/{empresa}` — lista de productos.
- **API de email**: `POST email/cotizacion`, `POST email/comentario`.
- **Terceros**: Google Fonts, Google Maps (iframes), viicommerce.com (enlace mayoristas).

Detalle en [docs/apis.md](apis.md).

## Flujo típico para añadir una pantalla o funcionalidad

### Nueva página

1. Crear `src/pages/NuevaPagina.jsx`.
2. Añadir `<Route path="/ruta" element={<NuevaPagina />} />` en `App.jsx`.
3. Añadir enlace en Header/Footer si aplica.
4. Actualizar sitemap si es ruta pública.

### Nueva empresa

1. Añadir objeto en `empresasConfig` en `src/config/empresas.js`.
2. Crear scripts `dev:nombre` y `build:nombre` en `package.json`.
3. Añadir logos en `public/brands/` si hace falta.

### Nuevo endpoint de API

1. Definir endpoint en `src/api/config/api.js`.
2. Crear método en el servicio correspondiente o en uno nuevo.
3. Consumir desde el componente o hook.

### Cambio de copy o diseño por empresa

1. Editar `src/config/empresas.js` en la sección de la empresa.
2. Para estilos globales, revisar `src/theme/` y `GlobalStyle.js`.

## Decisiones históricas y código relevante

- **URL como fuente de verdad del catálogo**: El estado del catálogo (línea, filtros, página, orden, búsqueda) vive en la URL. No cambiar la convención de query params sin actualizar `useCatalogURL` y `useCatalogFlow`.
- **Caché de productos**: 5 minutos en memoria en `useProducts`; no hay persistencia en localStorage.
- **Automax**: Está en `empresas.js` pero no tiene scripts propios en `package.json`; si se despliega, hay que añadirlos.
- **Políticas de privacidad**: Solo existen para Maxximundo; la condición está en `App.jsx`.
- **productService.getProductById**: Obtiene todos los productos y filtra por ID; no hay endpoint específico por producto.

## Contacto o autor

- Desarrollador: [Diego Barbecho](https://github.com/diegobarpdev)
- Soporte técnico: tecnologia2@autollanta.com (según README original)
