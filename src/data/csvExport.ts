import {group, summarize} from './cooperation.ts';
import type {Filters, Interaction} from './cooperation.ts';
import type {Indicator} from './indicators.ts';
type Cell = string | number;
export function csvText(rows: Cell[][]): string {
 return '\uFEFF' + rows.map(row => row.map(value => {
  let text = String(value);
  if (typeof value === 'string' && (/^[\s]*[=+\-@]/.test(text) || /^[\t\r\n]/.test(text))) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
 }).join(';')).join('\r\n');
}
export function buildCsvExport({rows,filters,page,tab,internal,indicators}: {rows:Interaction[];filters:Filters;page:string;tab:string;internal:boolean;indicators:Indicator[]}) {
 const approved=summarize(rows).approved;
 const period=filters.year||'todos';
 let data:Cell[][]; let kind:string;
 // Table navigation takes precedence over a retained dashboard tab.
 if(page!=='dashboard') {
  const selected=internal?(page==='review'?rows.filter(r=>r.status!=='Aprobada'):rows):approved;
  kind=internal?page:'publica';
  data=[['datos','id_demo','vigencia','mes','sector','pais','instrumento','estado','financiero_millones_COP','no_monetario_millones_COP','total_millones_COP'],...selected.map(r=>['SINTETICOS',r.id,r.year,r.month,r.sector,r.country,r.type,r.status,r.financial,r.nonMonetary,r.financial+r.nonMonetary])];
 } else if(tab==='indicators') {
  kind='indicadores'; const summary=summarize(rows);
  data=[['datos','id','indicador','valor','unidad','estado','fuente'],...indicators.map(i=>['SINTETICOS',i.id,i.name,i.id===16?summary.financial+summary.nonMonetary:'',i.id===16?'millones COP':i.unit,i.id===16?'Calculado con registros demo':'Pendiente de fuente',i.source])];
 } else {
  kind='cooperacion'; data=[['datos','sector','interacciones_aprobadas','millones_COP'],...group(approved,'sector').map(g=>['SINTETICOS',g.name,approved.filter(r=>r.sector===g.name).length,g.value])];
 }
 return {filename:`GLOBO_DEMO_${kind}_${period}.csv`,rows:data,text:csvText(data)};
}
