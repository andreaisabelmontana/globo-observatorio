# GLOBO · Propuesta de tablero ejecutivo

Prototipo independiente para revisar la organización y visualización de información para el alcalde y la Consejería. **Todos los registros y series son ficticios. No se conecta a GLOBO institucional, no es un portal oficial y no se actualiza con sus interacciones reales.**

## Alcance

- Un único tablero ejecutivo con la composición visual de referencia: mapa, tendencia, cooperantes, entidades, sectores, instrumentos, ODS, Plan y alertas.
- Siete tarjetas de resumen; premios y cumplimiento del Plan se identifican como no disponibles cuando no existe una fuente validada.
- Catálogo de los 17 indicadores propuestos, agrupados en cinco dimensiones. Los conteos 4, 4, 2, 3 y 4 indican tamaño del catálogo, no desempeño.
- Filtros combinados de vigencia, sector y país para registros de cooperación. Las series estratégicas independientes se filtran por vigencia.
- Mapa ampliable con selección de país, zoom, composición financiera/no monetaria, cooperantes, entidades, ODS y CSV de la selección.
- Descarga CSV e impresión para guardar como PDF. Exploración complementaria de registros, revisión y calidad con datos ficticios.
- Diseño adaptable a pantallas pequeñas e impresión. Marca vectorial blanca y tratamiento blanco de la identidad de Bogotá.

No hay selector público/interno ni selección arbitraria de diez indicadores. Los enlaces antiguos con vista=publica o vista=interna abren el mismo tablero y se normalizan al cargar. No se ha implementado autenticación ni autorización. Las reglas de publicación y los permisos deben confirmarse con el equipo institucional.

## Ejecutar y verificar

Requisitos: Git y Node.js 22.18 o posterior.

```bash
git clone https://github.com/andreaisabelmontana/globo-observatorio.git
cd globo-observatorio
npm ci
npm run dev
```

`npm test` verifica cálculos, filtros, exclusión de registros sin aprobar, IDs únicos, partición de instrumentos y resultados vacíos. `npm run build` comprueba TypeScript y genera docs/ para GitHub Pages (main /docs).

## Implementación

React, TypeScript, Vite, CSS, Recharts, Lucide, d3-geo, topojson-client y cartografía world-atlas/Natural Earth. src/App.tsx coordina navegación, filtros y catálogo; components/ExecutiveDashboard.tsx contiene el resumen y components/MapDetail.tsx el detalle geográfico. data/cooperation.ts contiene los registros sintéticos; data/indicators.ts las 17 definiciones y series ilustrativas.

## Fuentes y límites

El documento «Análisis de Indicadores Reto Globo» orienta el catálogo. Fórmulas operativas, fuentes, metas y criterios adicionales son propuestas pendientes de validación. Recursos se informan en millones de COP; se separan aportes financieros y no monetarios. Asociación con ODS no prueba impacto causal. Las métricas de visitas, satisfacción, participación, decisiones y metas necesitan sus propias fuentes.

Identidad de Bogotá: fuente oficial documentada en public/brand/SOURCES.md. Iconos ODS: Naciones Unidas, conservados completos. Símbolo de GLOBO: vector Lucide de demostración, no presentado como marca oficial verificada. Guía visual: https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md.

Para producción falta integrar el backend autorizado, definir permisos, comprobar reglas de aprobación y publicación, acordar la frecuencia de actualización y validar las fuentes y metodologías. No se distribuyen registros institucionales, credenciales ni documentos originales de referencia.

## Ajustes solicitados por Arturo — 6 noviembre 2026

- `?vista=publica`: resumen de cooperación aprobada y tendencia mensual; sin bandejas de revisión ni alertas de trámite.
- `?vista=interna`: resumen ejecutivo, alertas, revisión y calidad. Ambas son vistas públicas de un prototipo con datos ficticios; el selector no constituye autenticación.
- “Todos los años” acumula recursos y registros de 2024–2026; mantiene países/cooperantes/entidades únicos. La tendencia conserva mes y año. No suma tasas ni usuarios entre vigencias.
- Estados de instrumentos al corte de la última vigencia disponible cuando se seleccionan todos los años.
- “Exportar PDF” abre la impresión del navegador: seleccionar “Guardar como PDF”. Conserva filtros, periodo y aviso de datos ficticios. No es una descarga directa automatizada.

### Fuentes por confirmar antes de integrar

| Medición | Validación necesaria |
| --- | --- |
| Interacciones, países, entidades, cooperantes, recursos e instrumentos | Confirmar campos, estados, duplicados, fechas y acceso a exportación/API de GLOBO. Los cálculos actuales usan únicamente el modelo sintético. |
| Visitas y uso | Confirmar si existen analítica o registros de acceso; no asumir que GLOBO carece de ellos. |
| Satisfacción/percepción | Confirmar encuesta, muestra y respuestas disponibles. |
| Avance de metas | Confirmar vínculos entre registros y metas, denominadores y ponderaciones aprobadas. |
| Premios/reconocimientos | Confirmar fuente y campos disponibles. |

Pendiente: contraste campo por campo con manual, ABC y documento de indicadores, y revisión de la distribución con Arturo. Esta tabla es una guía de validación, no un diagnóstico del backend institucional.
