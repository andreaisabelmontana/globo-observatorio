# GLOBO 2.0 · Mock del dashboard

Prototipo de revisión que recrea la interfaz observada de GLOBO 2.0: cabecera blanca, menú lateral, tablero oscuro, banda de cinco KPIs y cuadrícula de widgets. **No es el código fuente original de GLOBO**, no es un portal oficial y no se conecta a sistemas institucionales.

## Abrir en VS Code

Requisitos: Git y Node.js 22.18 o posterior.

```bash
git clone https://github.com/andreaisabelmontana/globo-observatorio.git
cd globo-observatorio
npm ci
npm run dev
```

Abrir la URL local que muestra Vite. `npm run build` verifica TypeScript y genera `docs/`. `npm run test` comprueba filtros, agregaciones, IDs únicos y variaciones sin base. `npm run preview` sirve la compilación.

## Stack

React 19, TypeScript, Vite, CSS, Recharts, Lucide, d3-geo y topojson-client. Cartografía de Natural Earth mediante world-atlas.

## Estructura

- `src/App.tsx`: dashboard, filtros, audiencias, seguimiento, navegación y fichas.
- `src/components/`: cabecera/menú, widgets, gráficos, mapa y diálogos.
- `src/data/cooperation.ts`: registros sintéticos y funciones de cálculo.
- `src/data/indicators.ts`: catálogo de los 17 indicadores del documento facilitado; fórmulas operativas propuestas.
- `src/styles.css`: apariencia de GLOBO 2.0 y adaptación móvil/impresión.
- `tests/metrics.test.ts`: comprobaciones de los cálculos.
- `docs/`: compilación para GitHub Pages. Se versiona para publicar desde main /docs.

## Vistas

- Pública: `?vista=publica` · agregados aprobados y 10 indicadores propuestos para publicación.
- Interna de demostración: `?vista=interna` · alertas, trámites, seguimiento y los 17 indicadores.

**Las dos URLs son públicas. Cambiar de vista no es autenticación. Nunca incluir datos reales reservados, credenciales ni información personal.** El mock interno solo sirve para revisar el diseño.

## Funcionalidad

- Filtros de vigencia, sector y país aplicados conjuntamente a registros y exportaciones de cooperación.
- Indicadores de uso y adopción con escenarios por vigencia independientes de los registros de cooperación; así se evita atribuirles filtros no soportados.
- Recursos aprobados separados en financieros y no monetarios; actualización de un registro no crea una nueva interacción.
- Mapa geográfico y listado accesible para filtrar países; rankings, tendencia y ODS asociados.
- Estado de instrumentos por fecha: categorías excluyentes al corte del 31 de octubre.
- Personalización y reordenamiento de widgets guardados solo en el navegador.
- Fichas de definición, fórmula, fuente necesaria y limitaciones; búsqueda y filtro por dimensión.
- Descarga CSV e impresión/PDF de la vista activa.
- Reportes, interacciones y bandeja de revisión como vistas de consulta de registros ficticios; no editan ni envían información.

## Fuentes y límites

Referencia visual: GLOBO 2.0 observado en navegador. Referencia conceptual: documento «Análisis de Indicadores Reto Globo» facilitado por la usuaria y guías de operación. No se distribuyen los documentos originales ni registros institucionales.

Los criterios metodológicos requieren aprobación institucional. La clasificación pública/interna es una propuesta. Las métricas de visitas, consultas, satisfacción, uso de evidencia y metas necesitan fuentes adicionales que no se han verificado en GLOBO. Las cifras de indicadores estratégicos son escenarios sintéticos; las del tablero de cooperación se calculan a partir del conjunto ficticio local. Los nombres de aliados y entidades son ficticios.

Guías de referencia consultadas: [GOV.CO](https://cdn.www.gov.co/v4/), [Observatorio de Movilidad](https://observatorio.movilidadbogota.gov.co/indicadores-planes-y-politicas/plan-distrital-de-desarrollo), [SaluData](https://saludata.saludcapital.gov.co/osb/listado-de-indicadores/). Se prioriza el estilo del aplicativo GLOBO existente; no se declara cumplimiento normativo ni autorización de marca.

## Publicar cambios

1. Ejecutar `npm ci`, `npm test` y `npm run build`.
2. Versionar tanto `src/` como `docs/` y subir a `main`.
3. GitHub Pages debe usar **Deploy from a branch → main → /docs**.

No hay servidor, base de datos ni cuentas. Para producción privada se debe integrar el backend autorizado de GLOBO y su control de acceso.

## Tablero ejecutivo · actualización noviembre de 2026

La página inicial incorpora una vista ejecutiva con mapa, cooperación por mes, rankings, sectores, estados de instrumentos, ODS y alertas. «Vista para captura» oculta la navegación; Escape restaura la vista normal. PDF usa impresión en formato horizontal. «Explorar cooperación» mantiene los filtros, personalización y widgets anteriores, junto a seguimiento, indicadores y tablas.

El resumen ejecutivo calcula instrumentos únicamente para convenios y memorandos aprobados. La versión anterior de exploración mantiene su definición de registros por fecha. Los valores siguen en millones de COP: no se inventa conversión a USD. Las metas del Plan Distrital de Desarrollo y los premios aparecen como pendientes de fuente, no como avances verificados.

### Referencias visuales y uso de marca

- [Manual de Marca Ciudad Bogotá, octubre de 2024](https://bogota.gov.co/bog/manual-de-marca-bogota.pdf): amarillo #F9D248 y rojo #E3272A. El azul oscuro es un fondo de interfaz propio, no un color oficial de Bogotá. Se usa una identificación tipográfica y no un escudo ni una marca de campaña recreada.
- [Objetivos de Desarrollo Sostenible, Naciones Unidas](https://sdgs.un.org/es/goals): los siete archivos de `public/sdg/` son iconos oficiales en español, sin emblema de la ONU, conservados completos y sin alterar. Colores y pictogramas se usan solo para los ODS correspondientes.
- [Guía de uso ODS](https://unsdg.un.org/download/7777/497) y [material de comunicación](https://www.un.org/sustainabledevelopment/news/communications-material/). Los iconos no implican el aval de Naciones Unidas. Este prototipo no es un sitio oficial del Distrito ni de Naciones Unidas.

Los documentos e imágenes originales recibidos para orientar el diseño no se incluyen en este repositorio ni en la publicación. No se agregó información institucional real. No hay integración con autenticación, bases de datos ni servicios originales de GLOBO.

## Briefing ejecutivo y mapa ampliado

La primera vista usa cuatro KPIs y prioriza tendencia, alcance geográfico, sectores y alertas. Una barra reúne vigencia, audiencia, filtros, PDF y CSV. Los rankings, ODS, estado de instrumentos y Plan Distrital se consultan en un detalle desplegable; las herramientas operativas tienen una entrada secundaria con etiquetas explicativas.

El mapa se amplía en un diálogo con selector de país, zoom, aportes financieros/no monetarios, cooperantes, entidades, ODS y estados de instrumentos. El CSV del mapa usa su selección local. Aplicar al resumen conserva el filtro de país en el tablero.

Los 17 indicadores propuestos permanecen en el catálogo interno, agrupados por dimensión (10 en la selección pública propuesta). El catálogo abre con internacionalización para evitar 17 gráficos simultáneos. Los indicadores estratégicos siguen usando series ilustrativas independientes de las interacciones; no se afirma que sean mediciones oficiales.

La identidad de Bogotá proviene del sitio oficial de Secretaría General; GLOBO conserva su rótulo tipográfico porque no se verificó un símbolo oficial independiente. Fuentes en public/brand/SOURCES.md. Se aplicó la guía Apple Design de Emil Kowalski para jerarquía, contención y tipografía; no se redistribuye el skill.
