# Índice de documentación

Índice de todos los documentos del proyecto con propósito, cuándo usarlos y orden de lectura recomendado.

## Tabla de documentos

| Documento | Propósito | Cuándo usarlo |
|-----------|-----------|---------------|
| [setup.md](setup.md) | Instalación, variables de entorno, ejecución local, errores comunes | Primera vez que clonas el repo o configuras un entorno nuevo |
| [arquitectura.md](arquitectura.md) | Estructura del proyecto, carpetas, responsabilidades, patrones | Entender la organización del código y dónde añadir cambios |
| [apis.md](apis.md) | APIs consumidas, endpoints, payloads, variables de entorno | Integrar o modificar llamadas a la API, diagnosticar fallos de red |
| [flujo-funcional.md](flujo-funcional.md) | Flujos principales del sistema paso a paso | Entender el comportamiento de usuario y la lógica de negocio |
| [guia-proyecto.md](guia-proyecto.md) | Onboarding: qué es el proyecto, dónde está cada cosa, flujos típicos | Incorporación rápida de un nuevo desarrollador |
| [decisiones-tecnicas.md](decisiones-tecnicas.md) | Justificación de tecnologías, alternativas, trade-offs | Comprender el "por qué" del diseño actual |
| [despliegue.md](despliegue.md) | Build, ambientes, Vercel, consideraciones de producción | Hacer deploy o configurar un nuevo ambiente |
| [pendientes.md](pendientes.md) | Mejoras sugeridas, deuda técnica, suposiciones | Planificar mejoras o resolver incógnitas del proyecto |
| [indice.md](indice.md) | Este documento: índice y orden de lectura | Punto de entrada a la documentación |

---

## Orden de lectura recomendado para un desarrollador nuevo

1. **[guia-proyecto.md](guia-proyecto.md)** — Vista general y onboarding.
2. **[setup.md](setup.md)** — Configurar y ejecutar el proyecto.
3. **[arquitectura.md](arquitectura.md)** — Estructura y organización del código.
4. **[flujo-funcional.md](flujo-funcional.md)** — Cómo funcionan los flujos principales.
5. **[apis.md](apis.md)** — Si vas a trabajar con integraciones o datos externos.
6. **[despliegue.md](despliegue.md)** — Cuando tengas que desplegar o configurar ambientes.
7. **[decisiones-tecnicas.md](decisiones-tecnicas.md)** — Para entender el contexto de las decisiones.
8. **[pendientes.md](pendientes.md)** — Al planificar mejoras o abordar deuda técnica.

---

## Uso como plantilla

Esta estructura de documentación puede replicarse en otro repositorio:

```
docs/
├── setup.md
├── arquitectura.md
├── apis.md
├── flujo-funcional.md
├── guia-proyecto.md
├── decisiones-tecnicas.md
├── despliegue.md
├── pendientes.md
└── indice.md
```

**Recomendaciones:**

- Mantener el README en la raíz con enlace al índice.
- Actualizar la documentación cuando cambien arquitectura, APIs o flujos.
- No duplicar información entre documentos; usar referencias cruzadas.
- Usar español neutro y tono técnico para facilitar el mantenimiento por equipos diversos.
