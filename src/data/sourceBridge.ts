/** Read-only reconciliation contract derived from workbook headers. No backend connection. */
export type SourceName='GLOBO'|'CMR'|'RUTA_BP';
export type SourceRow=Record<string,unknown>;
export interface Snapshot {source:SourceName; revision:string; rows:SourceRow[]}
export interface Evidence {source:SourceName;revision:string;row:number;values:SourceRow}
export const resultField='resultado valor agregado para Bogotá que importa y que exporta en buenas practicas ';
const copy=(v:SourceRow):SourceRow=>structuredClone(v);
const serialize=(v:unknown)=>JSON.stringify(v);
export function reconcileSnapshots(snapshots:Snapshot[]) {
 const groups=new Map<string,Evidence[]>();const rejected:{source:SourceName;row:number;reason:string}[]=[];
 snapshots.forEach(s=>s.rows.forEach((r,i)=>{
  // Never infer IDs from titles, row number or another snapshot.
  if(typeof r.id!=='string'||!r.id.trim()||r.id!==r.id.trim()){rejected.push({source:s.source,row:i+2,reason:'ID ausente, no textual o con espacios: requiere validación'});return;}
  const group=groups.get(r.id)||[];group.push({source:s.source,revision:s.revision,row:i+2,values:copy(r)});groups.set(r.id,group);
 }));
 const records=[...groups].map(([id,evidence])=>{
  const sources=[...new Set(evidence.map(e=>e.source))];
  const duplicateSources=sources.filter(source=>evidence.filter(e=>e.source===source).length>1);
  const fields=[...new Set(evidence.flatMap(e=>Object.keys(e.values)))].filter(k=>k!=='id'&&k!==resultField);
  const conflicts=fields.flatMap(field=>{
   const candidates=evidence.filter(e=>Object.hasOwn(e.values,field)).map(e=>({source:e.source,revision:e.revision,row:e.row,value:e.values[field]}));
   return new Set(candidates.map(c=>serialize(c.value))).size>1?[{field,candidates}]:[];
  });
  const annotations=evidence.filter(e=>Object.hasOwn(e.values,resultField)).map(e=>({source:e.source,revision:e.revision,row:e.row,value:e.values[resultField]}));
  return {id,sources,evidence,conflicts,annotations,duplicateSources,status:duplicateSources.length?'ID_DUPLICADO_EN_FUENTE':conflicts.length?'REQUIERE_REVISION':sources.length===1?'SIN_CORRESPONDENCIA':'VINCULO_POR_ID',hasGlobo:sources.includes('GLOBO')};
 });
 return {records,rejected,summary:{inputRows:snapshots.reduce((n,s)=>n+s.rows.length,0),uniqueIds:records.length,linkedIds:records.filter(r=>r.sources.length>1).length,reviewIds:records.filter(r=>r.conflicts.length||r.duplicateSources.length).length,unmatchedIds:records.filter(r=>r.sources.length===1).length}};
}
// Purpose-built fictitious fixture; NEVER copied or derived from institutional rows.
export const syntheticSnapshots:Snapshot[]=[
 {source:'GLOBO',revision:'DEMO-v1',rows:[{id:'DEMO-BRIDGE-001',nombreInteraccion:'Ejemplo inventado A',valorTotal:100,estado:'Ejemplo sin validar'},{id:'DEMO-BRIDGE-002',nombreInteraccion:'Ejemplo inventado B',valorTotal:200},{id:'DEMO-BRIDGE-004',nombreInteraccion:'Solo matriz de ejemplo',valorTotal:0}]},
 {source:'CMR',revision:'DEMO-v1',rows:[{id:'DEMO-BRIDGE-001',nombreInteraccion:'Ejemplo inventado A',valorTotal:100,[resultField]:'Nota sintética de CMR'},{id:'DEMO-BRIDGE-002',nombreInteraccion:'Ejemplo inventado B',valorTotal:2,[resultField]:'Nota sintética sin validación'},{id:'DEMO-BRIDGE-003',nombreInteraccion:'Solo ruta de ejemplo',valorTotal:0}]},
 {source:'RUTA_BP',revision:'DEMO-v1',rows:[{id:'DEMO-BRIDGE-001',nombreInteraccion:'Ejemplo inventado A',valorTotal:100,[resultField]:'Anotación sintética diferente de Ruta BP'},{id:'DEMO-BRIDGE-002',nombreInteraccion:'Ejemplo inventado B',valorTotal:200}]}
];
