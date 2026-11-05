export type Status = 'Aprobada' | 'Revisión CDRI' | 'Revisión administrativa' | 'En diligenciamiento';
export interface Interaction { id:string; year:number; month:number; sector:string; entity:string; country:string; countryId:string; partner:string; type:string; status:Status; financial:number; nonMonetary:number; ods:number; endDate:string; }
export const sectors = ['Ambiente','Cultura','Educación','Integración Social','Salud'];
export const partners = [
 {country:'Alemania',id:'276',name:'Aliado de demostración A'},
 {country:'España',id:'724',name:'Aliado de demostración B'},
 {country:'Estados Unidos',id:'840',name:'Aliado de demostración C'},
 {country:'Francia',id:'250',name:'Aliado de demostración D'},
 {country:'Japón',id:'392',name:'Aliado de demostración E'},
 {country:'Brasil',id:'076',name:'Aliado de demostración F'},
 {country:'Canadá',id:'124',name:'Aliado de demostración G'},
 {country:'México',id:'484',name:'Aliado de demostración H'}
];
export const interactions:Interaction[] = [2024,2025,2026].flatMap((year,yi)=>Array.from({length:80+yi*24},(_,i)=>{
 const p=partners[(i*3+Math.floor(i/5))%partners.length];
 return {id:`DEMO-${year}-${String(i+1).padStart(4,'0')}`,year,month:i%10+1,sector:sectors[(i+Math.floor(i/8))%5],entity:`Entidad de demostración ${1+(i%12)}`,country:p.country,countryId:p.id,partner:p.name,type:['Convenio','Memorando','Asistencia técnica','Intercambio de conocimiento'][i%4],status:(i%11===0?'En diligenciamiento':i%9===0?'Revisión administrativa':i%7===0?'Revisión CDRI':'Aprobada') as Status,financial:(i%4===2?0:((i*137)%900+60))*(1+yi*.12),nonMonetary:((i*53)%190+12)*(1+yi*.1),ods:[3,4,5,11,13,16,17][i%7],endDate:i%9===0?'':`${year}-${String(i%12+1).padStart(2,'0')}-28`};
}));
export interface Filters { year:number; sector:string; country:string; }
export function filterRows(rows:Interaction[],f:Filters){return rows.filter(r=>r.year===f.year&&(!f.sector||r.sector===f.sector)&&(!f.country||r.country===f.country));}
export function summarize(rows:Interaction[]){const approved=rows.filter(r=>r.status==='Aprobada');return {approved,total:rows.length,financial:approved.reduce((s,r)=>s+r.financial,0),nonMonetary:approved.reduce((s,r)=>s+r.nonMonetary,0),countries:new Set(approved.map(r=>r.country)).size,partners:new Set(approved.map(r=>r.partner)).size,entities:new Set(approved.map(r=>r.entity)).size};}
export function group(rows:Interaction[],key:'partner'|'sector'|'entity'|'country'|'type'|'ods',mode:'value'|'count'='value'){const map=new Map<string,number>();rows.forEach(r=>{const k=String(r[key]);map.set(k,(map.get(k)||0)+(mode==='count'?1:r.financial+r.nonMonetary));});return [...map].map(([name,value])=>({name,value:Math.round(value)})).sort((a,b)=>b.value-a.value);}
export function variation(current:number,previous:number){return previous>0?(current-previous)/previous*100:null;}
export const format=(n:number)=>new Intl.NumberFormat('es-CO',{maximumFractionDigits:1}).format(n);
export const monthNames=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct'];
