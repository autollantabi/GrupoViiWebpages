# Despliegue

Proceso de build, configuración de ambientes y consideraciones para producción.

## Proceso de build

### Comando estándar

```bash
npm run build
```

Usa `VITE_EMPRESA_NOMBRE` del entorno (o de `.env` si existe). Si no está definida, `company.js` usa `IKONIX` por defecto.

### Build por empresa

```bash
npm run build:ikonix
npm run build:autollanta
npm run build:maxximundo
npm run build:stox
```

Cada script establece `VITE_EMPRESA_NOMBRE` con `cross-env` y ejecuta `vite build`.

### Salida

- **Directorio**: `dist/`
- **Contenido**: `index.html` y carpeta `static/` con JS, CSS y assets (nombres con hash para cache busting)
- **Source maps**: Desactivados en `vite.config.js` (`sourcemap: false`)

### Configuración de Vite

Archivo: `vite.config.js`

- `base: "/"` — Las rutas de assets son absolutas desde la raíz
- `outDir: "dist"`
- `assetsDir: "static"`

---

## Configuración de ambientes

### Desarrollo

- Variables desde `.env` (o desde el sistema si se usan scripts `dev:empresa`)
- API puede apuntar a servidor local o staging mediante `VITE_API_BASE_URL`

### Producción

- Variables de entorno en la plataforma de deploy (Vercel u otra)
- Para Vercel: configurar en Project Settings → Environment Variables
- Variables necesarias:
  - `VITE_EMPRESA_NOMBRE`
  - `VITE_API_BASE_URL`
  - `VITE_API_IMAGES_URL`
  - Opcional: `VITE_API_TIMEOUT`, `VITE_MAYORISTA_URL`

**Importante:** En Vite, solo las variables con prefijo `VITE_` se exponen al cliente. No usar variables sensibles (secretos, keys) con ese prefijo.

---

## Despliegue en Vercel

### Configuración

Archivo: `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

- **Rewrites**: Cualquier ruta que no empiece por `api/` se sirve con `index.html` (SPA).
- **Headers**: Assets en `/static/*` con caché larga (1 año) para mejor rendimiento.

### Deploy por dominio/empresa

Cada dominio (autollanta.com, maxximundo.com, ikonix.ec, stox.com.ec) suele corresponder a:

1. Un proyecto o branch en Vercel
2. Variables de entorno con `VITE_EMPRESA_NOMBRE` correcta
3. Dominio configurado en Vercel

O bien varios proyectos Vercel que comparten el repo y difieren solo en las variables de entorno.

---

## Consideraciones para producción

### CORS

La API debe permitir peticiones desde los dominios de producción. Configurar CORS en el backend para:

- autollanta.com
- maxximundo.com
- ikonix.ec
- stox.com.ec

### URLs de API

- Usar HTTPS en producción
- `VITE_API_BASE_URL` y `VITE_API_IMAGES_URL` deben ser accesibles públicamente

### SEO

- `sitemap.xml` y `robots.txt` están en `public/` y se sirven en la raíz
- El sitemap actual lista los cuatro dominios; verificar que las URLs sean correctas para cada deploy
- Cada sitio tiene su propio `sitemap` referenciado en `robots.txt`

### Favicon

`index.html` referencia `/brands/iconikonix.png`. Si ese archivo no existe, puede producir 404. Ver [docs/pendientes.md](pendientes.md).

### Analytics y scripts de terceros

No hay Google Analytics ni scripts de tracking documentados en el código. Si se añaden, hacerlo en `index.html` o mediante un componente de analytics.
