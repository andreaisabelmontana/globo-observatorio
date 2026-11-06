import {jsPDF} from 'jspdf';
import {availableYears,cutoffYear,format,group,monthNames,periodLabel} from './cooperation.ts';
import type {Filters,Interaction} from './cooperation.ts';
import {executiveSummary} from './executive.ts';
import type {Indicator} from './indicators.ts';

type ReportOptions={rows:Interaction[];filters:Filters;page:string;tab:string;indicators:Indicator[]};

/** A local, vector PDF report. No screenshots, remote service, or institutional data. */
export function buildReportPdf({rows,filters,page,tab,indicators}:ReportOptions){
 const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
 const width=297,height=210,margin=14,bodyWidth=width-margin*2;
 const summary=executiveSummary(rows,filters.year);
 const title=page==='review'?'Bandeja de revisión':page==='interactions'?'Gestión de interacciones':page==='reports'?'Informe de cooperación':tab==='indicators'?'Catálogo de indicadores':tab==='management'?'Seguimiento de la gestión':'Resumen ejecutivo';
 const scope=`${periodLabel(filters.year)}${filters.year?'':' (2024-2026)'} | ${filters.sector||'Todos los sectores'} | ${filters.country||'Todos los países'}`;
 let y=0;
 function newPage(first=false){
  if(!first)doc.addPage();
  doc.setFillColor(14,35,56);doc.rect(0,0,width,29,'F');
  doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(17);doc.text(`GLOBO | ${title}`,margin,13);
  doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text('VISTA INTERNA DE DEMOSTRACIÓN - DATOS FICTICIOS',margin,21);
  doc.setTextColor(40,55,70);doc.setFontSize(9);doc.text(scope,margin,37);y=44;
 }
 function space(h:number){if(y+h>height-18)newPage();}
 function paragraph(text:string,size=9){doc.setFont('helvetica','normal');doc.setFontSize(size);doc.setTextColor(55,65,78);const lines=doc.splitTextToSize(text,bodyWidth);space(lines.length*4.6+4);doc.text(lines,margin,y);y+=lines.length*4.6+4;}
 function heading(text:string,rows=1){space(22+Math.min(rows*8,110));doc.setTextColor(14,35,56);doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text(text,margin,y+3);y+=10;}
 function table(headers:string[],items:(string|number)[][],columnWidths:number[]){
  const header=()=>{space(10);doc.setFillColor(231,237,242);doc.rect(margin,y,bodyWidth,8,'F');doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(14,35,56);let x=margin;headers.forEach((h,i)=>{doc.text(h,x+3,y+5.4);x+=columnWidths[i]});y+=8;};header();
  if(!items.length){paragraph('Sin registros para los filtros seleccionados.');return;}
  items.forEach((row,n)=>{doc.setFont('helvetica','normal');doc.setFontSize(8.5);const cells=row.map((v,i)=>doc.splitTextToSize(String(v),columnWidths[i]-6));const rowHeight=Math.max(8,...cells.map(c=>c.length*4.2+3));if(y+rowHeight>height-18){newPage();header();}doc.setFillColor(...(n%2?[246,248,250]:[255,255,255]) as [number,number,number]);doc.rect(margin,y,bodyWidth,rowHeight,'F');doc.setTextColor(35,48,61);let x=margin;cells.forEach((cell,i)=>{doc.text(cell,x+3,y+5.3);x+=columnWidths[i]});y+=rowHeight;});y+=7;
 }
 newPage(true);
 paragraph('Informe descargado desde el prototipo independiente. No está conectado al sistema institucional y ninguna cifra es un resultado oficial. Los filtros y la población se indican en cada sección.');
 if(page!=='dashboard'){
  const selected=page==='review'?rows.filter(r=>r.status!=='Aprobada'):rows;
  heading(`${selected.length} registros de demostración`);
  paragraph(page==='review'?'Solo registros pendientes de aprobación.':'Incluye registros aprobados y en trámite de la vista interna. Los recursos oficiales no deben confundirse con valores aún en revisión.');
  table(['ID','Sector / país','Instrumento','Estado','M COP'],selected.map(r=>[r.id,`${r.sector} / ${r.country}`,r.type,r.status,format(r.financial+r.nonMonetary)]),[42,76,58,58,35]);
 }else if(tab==='indicators'){
  paragraph('Series sintéticas independientes del registro de cooperación. Aquí solo aplica la vigencia; sector y país no filtran los indicadores. Fórmulas y fuentes sujetas a validación institucional.');
  table(['#','Indicador propuesto','Valor ilustrativo','Fuente por verificar'],indicators.map(i=>[i.id,i.name,!filters.year?'Seleccione un año':`${format(i.id===13?i.values[filters.year]/61*100:i.values[filters.year])} ${i.id===13?'%':i.unit}`,i.source]),[12,105,47,105]);
  paragraph('Todos los años no suma usuarios únicos, tasas ni estados. Las cifras faltantes no prueban que la fuente no exista en GLOBO.');
 }else{
  heading('Resumen de cooperación aprobada');
  table(['Medida','Resultado','Alcance'],[
   ['Cooperación movilizada',`${format(summary.financial+summary.nonMonetary)} M COP`,'Aporte financiero + no monetario valorado'],
   ['Interacciones aprobadas',summary.approved.length,'Identificadores únicos del modelo de demostración'],
   ['Países / cooperantes / entidades',`${summary.countries.length} / ${summary.partners.length} / ${summary.entities.length}`,'Participantes distintos con cooperación aprobada'],
   ['Instrumentos vigentes',summary.activeInstruments,`Convenios y memorandos al 31/10/${cutoffYear(filters.year)}`],
   ['Interacciones pendientes',summary.pending,'Seguimiento interno; excluidas de recursos aprobados'],
   ['Plan y premios','Sin cifra verificada','Fuentes, metas y metodologías por confirmar']
  ],[80,59,130]);
  paragraph('Cobertura de prueba: enero a octubre de cada vigencia. Los meses no incluidos no equivalen a cero. Los estados de instrumentos usan el corte de la última vigencia al consultar todos los años.');
  newPage();heading('Tendencia mensual de cooperación movilizada');
  paragraph('Millones de COP de interacciones aprobadas. La clasificación mensual del modelo es sintética; la fecha que gobernará la serie institucional debe acordarse.');
  const series=(filters.year?[filters.year]:availableYears.slice().reverse()).flatMap(year=>monthNames.map((month,index)=>{const r=summary.approved.filter(row=>row.year===year&&row.month===index+1);return {label:`${month} ${year}`,value:r.reduce((n,row)=>n+row.financial+row.nonMonetary,0),count:r.length}}));
  const chartY=y,chartHeight=26,barWidth=bodyWidth/series.length,max=Math.max(...series.map(p=>p.value),1);
  doc.setDrawColor(178,192,204);doc.line(margin,chartY+chartHeight,margin+bodyWidth,chartY+chartHeight);
  series.forEach((point,index)=>{const h=point.value/max*(chartHeight-4);doc.setFillColor(36,110,151);doc.rect(margin+index*barWidth+1,chartY+chartHeight-h,Math.max(barWidth-2,1),h,'F');});y+=chartHeight+8;
  doc.setFontSize(8);doc.setTextColor(55,65,78);doc.text(series[0].label,margin,y-3);doc.text(series[series.length-1].label,width-margin,y-3,{align:'right'});
  if(filters.year){table(['Mes','Interacciones aprobadas','Cooperación (M COP)'],series.map(p=>[p.label,p.count,format(p.value)]),[89,90,90]);}
  else {const years=availableYears.slice().reverse();table(['Mes',...years.flatMap(year=>[`${year}: registros`,`${year}: M COP`])],monthNames.map((month,index)=>[month,...years.flatMap((year,yi)=>{const point=series[yi*monthNames.length+index];return [point.count,format(point.value)]})]),[29,...years.flatMap(()=>[40,40])]);}
  newPage();heading('Distribución de la cooperación aprobada');
  table(['Cooperante','Cooperación (M COP)'],summary.partners.map(p=>[p.name,format(p.value)]),[190,79]);
  heading('Sectores',summary.sectors.length);table(['Sector','Cooperación (M COP)'],summary.sectors.map(p=>[p.name,format(p.value)]),[190,79]);
  heading('Países',summary.countries.length);table(['País','Interacciones aprobadas'],summary.countries.map(p=>[p.name,p.value]),[190,79]);
  heading('Entidades',summary.entities.length);table(['Entidad','Interacciones aprobadas'],summary.entities.map(p=>[p.name,p.value]),[190,79]);
  heading('Estado de instrumentos',4);table(['Estado','Convenios y memorandos aprobados'],summary.states.map(p=>[p.name,p.value]),[190,79]);
  heading('Asociación con ODS',summary.goals.length);table(['ODS','Interacciones aprobadas'],group(summary.approved,'ods','count').map(p=>[`ODS ${p.name}`,p.value]),[190,79]);
  paragraph('La asociación con un ODS no demuestra impacto causal. No se calcula cumplimiento del Plan ni premios sin una fuente validada.');
 }
 const pages=doc.getNumberOfPages();for(let n=1;n<=pages;n++){doc.setPage(n);doc.setTextColor(83,96,108);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.text('DATOS FICTICIOS | No conectado a GLOBO institucional | Sin autenticación',margin,height-8);doc.text(`${n} / ${pages}`,width-margin,height-8,{align:'right'});}
 doc.setProperties({title:`GLOBO - ${title} - demostración`,subject:scope,creator:'Prototipo GLOBO'});
 return doc;
}
