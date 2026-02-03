# Guía de instalación y configuración

Requisitos, variables de entorno, pasos para ejecutar el proyecto localmente y resolución de errores comunes.

## Requisitos del sistema

- **Node.js**: v18 o superior (recomendado v20+)
- **npm**: v9 o superior (incluido con Node.js)
- **Git**: para clonar el repositorio

### Verificar instalación

```bash
node -v   # Debe mostrar v18.x o superior
npm -v    # Debe mostrar v9.x o superior
```

## Variables de entorno

El proyecto usa variables de entorno con prefijo `VITE_` (Vite las expone al cliente). Crear un archivo `.env` en la raíz del proyecto.

### Variables requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_EMPRESA_NOMBRE` | Empresa activa. Define tema, textos y datos mostrados. Valores: `ikonix`, `autollanta`, `maxximundo`, `stox` | `ikonix` |
| `VITE_API_BASE_URL` | URL base de la API (productos y email) | `https://api.example.com` |
| `VITE_API_IMAGES_URL` | URL base para imágenes de productos | `https://api.example.com/images` |

### Variables opcionales

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_TIMEOUT` | Timeout de peticiones HTTP (ms) | `10000` |
| `VITE_MAYORISTA_URL` | URL del portal mayoristas (botón en ficha de producto) | — |

### Ejemplo de `.env`

```env
VITE_EMPRESA_NOMBRE=ikonix
VITE_API_BASE_URL=https://api.ejemplo.com
VITE_API_IMAGES_URL=https://api.ejemplo.com/images
VITE_MAYORISTA_URL=https://viicommerce.com
```

**Nota:** El archivo `.env` está en `.gitignore` y no se versiona. No incluir credenciales sensibles; si la API requiere auth, configurarlo en el backend.

## Pasos para ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd GrupoViiWebpages
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear y configurar `.env`

```bash
# Crear archivo .env en la raíz
touch .env
# Editar con las variables indicadas arriba
```

### 4. Iniciar servidor de desarrollo

```bash
# Desarrollo con la empresa definida en .env
npm run dev

# O por empresa específica (sobrescribe VITE_EMPRESA_NOMBRE)
npm run dev:ikonix
npm run dev:autollanta
npm run dev:maxximundo
npm run dev:stox
```

La aplicación se ejecuta en **http://localhost:3100**.

### 5. Verificar funcionamiento

- Abrir http://localhost:3100
- Comprobar que la página de inicio carga con el tema de la empresa configurada
- Navegar a Catálogo y verificar que los productos se cargan (si la API está disponible)

## Errores comunes y resolución

### La página muestra "Cargando..." o blanco

- **Causa:** Posible error de JavaScript o falta de configuración.
- **Solución:** Abrir la consola del navegador (F12) y revisar errores. Verificar que `VITE_EMPRESA_NOMBRE` esté definido y sea un valor válido (ikonix, autollanta, maxximundo, stox).

### Los productos no se cargan / Error de red

- **Causa:** `VITE_API_BASE_URL` incorrecta, API caída o CORS.
- **Solución:**
  - Comprobar que la URL de la API sea accesible desde el navegador.
  - Verificar que el backend permita CORS desde `http://localhost:3100` en desarrollo.
  - Revisar en la pestaña Network si la petición falla (404, 500, timeout).

### Puerto 3100 ya en uso

- **Causa:** Otra aplicación usa el puerto 3100.
- **Solución:** Vite está configurado con `strictPort: false`, por lo que usará otro puerto automáticamente. O matar el proceso en 3100:
  ```bash
  # macOS/Linux
  lsof -ti:3100 | xargs kill
  ```

### Las imágenes de productos no se ven

- **Causa:** `VITE_API_IMAGES_URL` incorrecta o imágenes no disponibles.
- **Solución:** Verificar la URL base y que las rutas de imágenes en la API coincidan (campo `DMA_RUTAIMAGEN` del producto).

### Build falla con "EMPRESA_NOMBRE no está configurado"

- **Causa:** `VITE_EMPRESA_NOMBRE` no definida al ejecutar `npm run build`.
- **Solución:** Usar los scripts por empresa: `npm run build:ikonix`, etc., o definir `VITE_EMPRESA_NOMBRE` en el entorno antes del build.

### Favicon 404

- **Causa:** `index.html` referencia `/brands/iconikonix.png` que puede no existir.
- **Solución:** Ver [docs/pendientes.md](pendientes.md). Ajustar la ruta en `index.html` o añadir el archivo en `public/brands/`.

## Próximos pasos

Tras una instalación correcta, consultar:

- [docs/arquitectura.md](arquitectura.md) — Estructura del proyecto
- [docs/guia-proyecto.md](guia-proyecto.md) — Onboarding y flujos de trabajo
