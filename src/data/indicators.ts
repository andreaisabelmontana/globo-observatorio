export interface Indicator {id:number;name:string;dim:number;type:string;purpose:string;formula:string;source:string;view:string;values:Record<string,number>;unit:string}
export const indicators: Indicator[] = [
  {
    "id": 1,
    "name": "Indicadores publicados para consulta pública",
    "dim": 0,
    "type": "conteo",
    "purpose": "Indicadores con ficha, fuente y dato público disponibles al corte.",
    "formula": "Conteo de identificadores únicos de indicadores publicados al cierre del periodo.",
    "source": "Inventario de publicaciones",
    "view": "Inventario y avance de publicación",
    "values": {
      "2024": 5,
      "2025": 8,
      "2026": 12
    },
    "unit": "indicadores"
  },
  {
    "id": 2,
    "name": "Conjuntos de datos abiertos disponibles",
    "dim": 0,
    "type": "conteo",
    "purpose": "Información pública reutilizable por terceros.",
    "formula": "Conteo de conjuntos únicos publicados y accesibles al cierre. No se suman versiones.",
    "source": "Catálogo de datos abiertos",
    "view": "Catálogo con fecha y formato",
    "values": {
      "2024": 2,
      "2025": 4,
      "2026": 6
    },
    "unit": "conjuntos"
  },
  {
    "id": 3,
    "name": "Visitas y consultas al portal público",
    "dim": 0,
    "type": "conteo",
    "purpose": "Demanda de información internacional del Distrito.",
    "formula": "Conteo de visitas y de consultas como eventos separados; no equivalen a personas únicas.",
    "source": "Analítica web con exclusión de tráfico automatizado",
    "view": "Tendencia mensual y comparación por evento",
    "values": {
      "2024": 9100,
      "2025": 14200,
      "2026": 18400
    },
    "unit": "visitas"
  },
  {
    "id": 4,
    "name": "Descargas de reportes, bases de datos y visualizaciones",
    "dim": 0,
    "type": "conteo",
    "purpose": "Aprovechamiento de la información publicada.",
    "formula": "Conteo de eventos de descarga por tipo de recurso; admite repetición por usuario.",
    "source": "Registro de eventos de descarga",
    "view": "Distribución por recurso y tendencia",
    "values": {
      "2024": 1230,
      "2025": 1980,
      "2026": 2760
    },
    "unit": "descargas"
  },
  {
    "id": 5,
    "name": "Ciudadanos, organizaciones, universidades y empresas usuarias",
    "dim": 1,
    "type": "conteo",
    "purpose": "Apropiación social de la información de internacionalización.",
    "formula": "Usuarios únicos identificados con mecanismo consentido y deduplicado; segmentación declarada voluntariamente. No inferir identidad a partir de visitas.",
    "source": "Analítica consentida y caracterización voluntaria",
    "view": "Usuarios únicos por tipo de actor",
    "values": {
      "2024": 1560,
      "2025": 2470,
      "2026": 3120
    },
    "unit": "usuarios"
  },
  {
    "id": 6,
    "name": "Ejercicios de participación, consultas o procesos colaborativos",
    "dim": 1,
    "type": "conteo",
    "purpose": "Interacción entre el Distrito y los grupos de interés.",
    "formula": "Conteo de ejercicios distintos realizados, con evidencia y fecha de cierre en la vigencia.",
    "source": "Registro de participación y evidencias",
    "view": "Conteo y distribución por modalidad",
    "values": {
      "2024": 6,
      "2025": 9,
      "2026": 14
    },
    "unit": "ejercicios"
  },
  {
    "id": 7,
    "name": "Satisfacción de usuarios externos",
    "dim": 1,
    "type": "porcentaje",
    "purpose": "Percepción de utilidad, facilidad de uso y calidad de la información.",
    "formula": "Respuestas de 4 o 5 sobre 5 / respuestas válidas × 100. Definición operativa propuesta, pendiente de validación.",
    "source": "Encuesta voluntaria; mostrar muestra y periodo",
    "view": "Distribución de respuestas, porcentaje y muestra",
    "values": {
      "2024": 76,
      "2025": 81,
      "2026": 86
    },
    "unit": "%"
  },
  {
    "id": 8,
    "name": "Propuestas, comentarios o aportes ciudadanos",
    "dim": 1,
    "type": "conteo",
    "purpose": "Capacidad de generar diálogo y colaboración.",
    "formula": "Conteo de aportes recibidos y deduplicados durante la vigencia; respuestas institucionales se cuentan aparte.",
    "source": "Registro de participación ciudadana",
    "view": "Distribución por tipo y seguimiento agregado",
    "values": {
      "2024": 61,
      "2025": 94,
      "2026": 128
    },
    "unit": "aportes"
  },
  {
    "id": 9,
    "name": "Tableros analíticos y reportes automatizados",
    "dim": 2,
    "type": "conteo",
    "purpose": "Capacidad de transformar datos en información útil para la gestión.",
    "formula": "Conteo de productos analíticos distintos en operación; versiones y ejecuciones no se cuentan como productos nuevos.",
    "source": "Inventario de productos analíticos",
    "view": "Inventario por tipo de producto",
    "values": {
      "2024": 3,
      "2025": 6,
      "2026": 9
    },
    "unit": "productos"
  },
  {
    "id": 10,
    "name": "Decisiones, proyectos o iniciativas sustentadas en GLOBO",
    "dim": 2,
    "type": "conteo",
    "purpose": "Uso documentado de evidencia en la gestión institucional.",
    "formula": "Conteo de decisiones o iniciativas únicas con referencia verificable a un producto o consulta de GLOBO. No implica causalidad.",
    "source": "Bitácora de decisiones con evidencia",
    "view": "Registro trazable de decisiones y fuente",
    "values": {
      "2024": 8,
      "2025": 14,
      "2026": 23
    },
    "unit": "iniciativas"
  },
  {
    "id": 11,
    "name": "Incremento de oportunidades identificadas mediante analítica",
    "dim": 3,
    "type": "variacion",
    "purpose": "Capacidad para identificar oportunidades de cooperación.",
    "formula": "(Oportunidades de la vigencia − oportunidades de la vigencia anterior) / oportunidades de la vigencia anterior × 100. Base cero: no calculable.",
    "source": "Registro de oportunidades con origen analítico",
    "view": "Comparación anual con base absoluta",
    "values": {
      "2024": 20,
      "2025": 32,
      "2026": 46
    },
    "unit": "oportunidades"
  },
  {
    "id": 12,
    "name": "Nuevos aliados internacionales identificados",
    "dim": 3,
    "type": "conteo",
    "purpose": "Expansión de la red internacional de Bogotá.",
    "formula": "Conteo de aliados únicos cuya primera identificación ocurrió en la vigencia. Identificado no equivale a alianza formalizada.",
    "source": "Maestro de aliados e historial de primera identificación",
    "view": "Nuevos aliados y evolución anual",
    "values": {
      "2024": 9,
      "2025": 13,
      "2026": 18
    },
    "unit": "aliados"
  },
  {
    "id": 13,
    "name": "Entidades distritales que usan activamente información y analítica",
    "dim": 3,
    "type": "porcentaje",
    "purpose": "Apropiación institucional de GLOBO.",
    "formula": "Entidades con al menos una consulta analítica registrada en los últimos 90 días al corte / universo de entidades aplicable × 100. Criterio propuesto; validar universo de 61 indicado en el documento.",
    "source": "Auditoría de uso institucional y maestro de entidades",
    "view": "Cobertura institucional y brecha de adopción",
    "values": {
      "2024": 24,
      "2025": 35,
      "2026": 44
    },
    "unit": "entidades"
  },
  {
    "id": 14,
    "name": "Incremento en relacionamientos registrados y analizados",
    "dim": 4,
    "type": "variacion",
    "purpose": "Evolución de las conexiones internacionales gestionadas.",
    "formula": "Variación anual de relacionamientos únicos con registro validado y evidencia de análisis; no contar actualizaciones como nuevos relacionamientos.",
    "source": "Interacciones validadas y bitácora de análisis",
    "view": "Serie anual y variación sobre base comparable",
    "values": {
      "2024": 101,
      "2025": 143,
      "2026": 184
    },
    "unit": "relacionamientos"
  },
  {
    "id": 15,
    "name": "Incremento en instrumentos gestionados con apoyo del sistema",
    "dim": 4,
    "type": "variacion",
    "purpose": "Evolución de instrumentos de cooperación apoyados por GLOBO.",
    "formula": "Variación anual del número de instrumentos únicos gestionados con evidencia de apoyo del sistema. No sumar registros repetidos del mismo instrumento.",
    "source": "Registro de instrumentos y trazabilidad",
    "view": "Comparación anual por número de instrumentos",
    "values": {
      "2024": 21,
      "2025": 29,
      "2026": 38
    },
    "unit": "instrumentos"
  },
  {
    "id": 16,
    "name": "Recursos de cooperación internacional movilizados",
    "dim": 4,
    "type": "moneda",
    "purpose": "Valor económico de la cooperación internacional movilizada.",
    "formula": "Suma de valores en COP sin doble conteo; separar aporte financiero de valoración no monetaria. Documentar fecha, tasa de cambio, vigencia y método de valoración.",
    "source": "Registros aprobados, soportes y reglas de conversión",
    "view": "Composición financiera y no monetaria; evolución",
    "values": {
      "2024": 15200,
      "2025": 19600,
      "2026": 24800
    },
    "unit": "millones COP"
  },
  {
    "id": 17,
    "name": "Cumplimiento de la Estrategia de Internacionalización 2024–2027",
    "dim": 4,
    "type": "porcentaje",
    "purpose": "Avance frente a objetivos estratégicos de ciudad.",
    "formula": "Avance físico validado / meta aprobada × 100 por objetivo. Un agregado requiere ponderaciones aprobadas. No inferir cumplimiento a partir del número de interacciones.",
    "source": "Matriz oficial de metas, evidencias y ponderaciones",
    "view": "Avance por objetivo frente a meta",
    "values": {
      "2024": 29,
      "2025": 49,
      "2026": 68
    },
    "unit": "%"
  }
];
export const dimensions = ['Transparencia y acceso a la información','Participación y apropiación','Decisiones basadas en evidencia','Eficiencia de la cooperación','Internacionalización de Bogotá'];
