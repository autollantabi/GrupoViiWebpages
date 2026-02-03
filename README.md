# Grupo VII — Páginas Web Multi-Empresa

Sistema de sitios web corporativos para las marcas del Grupo VII (sector automotriz: llantas, lubricantes, herramientas). Un único código base sirve a múltiples empresas mediante build-time configuration y variable de entorno.

## Descripción general

**Grupo VII** es un grupo empresarial que opera varias marcas en Ecuador. Este repositorio es un **monorepo de páginas web** que despliega sitios para:

- **Ikonix** — Herramientas profesionales (Uyustools)
- **Autollanta** — Llantas (Fortune, Maxtrek)
- **Maxximundo** — Llantas, llantas moto, lubricantes (Shell, Pennzoil, Maxxis, Roadcruza, Aplus, Haohua, CST, Keystone). Incluye políticas de privacidad
- **Stox** — Llantas (Farroad, Antares, CST, Wonderland)
- **Automax** — Llantas y llantas moto (configurado en `empresas.js`, sin script de build propio)

## Problema que resuelve

- Centraliza la información corporativa, catálogo de productos, marcas, contacto y cotización en un único código base
- Evita mantener repositorios separados por empresa
- Permite personalización por empresa (colores, textos, logos, rutas) mediante configuración

## Tipo de aplicación

- **Web SPA (Single Page Application)** renderizada en cliente
- Despliegue como sitio estático (Vercel)

## Stack tecnológico

| Tecnología        | Uso principal                          |
|-------------------|----------------------------------------|
| React 19          | UI y componentes                       |
| React Router DOM 7| Navegación SPA                         |
| Styled Components | Estilos CSS-in-JS y tema por empresa   |
| React Icons       | Iconografía                            |
| Vite 6            | Build, dev server, HMR                 |
| PropTypes         | Validación de props                    |

## Casos de uso principales

1. **Consultar catálogo** — Filtrar productos por línea de negocio, marca, medidas y atributos
2. **Ver detalle de producto** — Ficha técnica, especificaciones y solicitud de cotización
3. **Explorar marcas** — Listado de marcas por línea con acceso al catálogo filtrado
4. **Contactar** — Formulario de consulta enviado vía API
5. **Solicitar cotización** — Desde la ficha de producto (nombre, email, ciudad, etc.)
6. **Consultar políticas de privacidad** — Solo en el sitio de Maxximundo

## Guía rápida de ejecución

```bash
npm install
npm run dev
```

La aplicación se ejecuta por defecto en `http://localhost:3100`.

**Configuración detallada** (variables de entorno, errores comunes): ver [docs/setup.md](docs/setup.md).

## Documentación completa

Índice de documentos con propósito y orden de lectura recomendado: **[docs/indice.md](docs/indice.md)**

## Scripts disponibles

| Script            | Descripción                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Desarrollo (usa `VITE_EMPRESA_NOMBRE` del `.env`)|
| `npm run dev:ikonix`    | Desarrollo con empresa Ikonix                    |
| `npm run dev:autollanta`| Desarrollo con empresa Autollanta                |
| `npm run dev:maxximundo`| Desarrollo con empresa Maxximundo                |
| `npm run dev:stox`      | Desarrollo con empresa Stox                      |
| `npm run build`   | Build para producción                            |
| `npm run build:ikonix`  | Build para Ikonix (y equivalentes por empresa)   |
| `npm run preview` | Preview del build local                          |
| `npm run lint`    | Ejecutar ESLint                                  |

## Dominios de producción

- autollanta.com
- maxximundo.com
- ikonix.ec
- stox.com.ec

---

Desarrollado por [Diego Barbecho](https://github.com/diegobarpdev)
