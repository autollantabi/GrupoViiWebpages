# 🛒 Catálogo de Productos - Grupo VII

Sistema de catálogo interactivo para productos automotrices (llantas, lubricantes, herramientas) con filtros avanzados, búsqueda y navegación intuitiva.

## ✨ Características

- **🔍 Catálogo Inteligente**: Sistema de filtros en cascada para llantas y lubricantes
- **📱 Diseño Responsive**: Optimizado para móvil, tablet y escritorio
- **🎯 Búsqueda Avanzada**: Filtros adicionales con búsqueda en tiempo real
- **📄 Paginación Inteligente**: Navegación fluida con scroll automático
- **🖼️ Galería de Productos**: Vista de grid y detalle con imágenes
- **🧭 Navegación Breadcrumb**: Rastro de navegación intuitivo
- **⚡ Performance**: Carga optimizada y lazy loading

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Styled Components** - CSS-in-JS
- **React Router** - Navegación SPA
- **React Icons** - Iconografía
- **PropTypes** - Validación de props

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://tu-api.com/api
VITE_API_IMAGES_URL=https://tu-api.com/images
```

### Configuración de Empresas

Editar `src/config/empresas.js` para configurar las empresas disponibles.

### Flujo del Catálogo

Configurar `src/config/catalogFlow.json` para personalizar los pasos del catálogo:

```json
{
  "steps": [
    {
      "id": "categoria",
      "name": "Categoría", 
      "displayName": "Selecciona una categoría",
      "description": "Elige el tipo de producto que necesitas",
      "nextStep": "aplicacion"
    }
  ]
}
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── catalog/           # Componentes del catálogo
│   │   ├── AdditionalFilters.jsx
│   │   ├── CatalogBreadcrumb.jsx
│   │   ├── FilterCards.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductGridView.jsx
│   ├── ui/               # Componentes reutilizables
│   ├── layout/           # Layout y navegación
│   └── seo/              # Componentes SEO
├── hooks/                # Hooks personalizados
├── api/                  # Servicios y configuración API
├── config/               # Configuraciones
├── theme/                # Tema y estilos globales
└── pages/                # Páginas de la aplicación
```

## 🎯 Uso

### Página de Catálogo

```jsx
import Catalog from './pages/Catalog';

// En tu router
<Route path="/catalogo" element={<Catalog />} />
```


## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build
```

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: 
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
- **Grid Adaptativo**: Se ajusta automáticamente al ancho disponible

## 🎨 Personalización

### Tema

Modificar `src/theme/index.js` para personalizar colores, tipografías y espaciados.

### Componentes

Todos los componentes están en `src/components/ui/` y son completamente personalizables.


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas, contactar a [tecnologia2@autollanta.com]

---

**Desarrollado con ❤️ por Grupo VII**