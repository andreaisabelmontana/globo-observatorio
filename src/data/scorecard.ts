import {indicators} from './indicators.ts';
import {availableYears,variation} from './cooperation.ts';
import type {Interaction} from './cooperation.ts';
// Existing synthetic strategic scenarios; counts and rates are never summed
// across years. Resources alone come from the actively filtered demo records.
export function scorecardData(rows:Interaction[],year:number){
 const period=year||availableYears[0];
 const value=(id:number,y=period)=>indicators.find(i=>i.id===id)?.values[y]??null;
 const growth=(id:number)=>{const now=value(id),before=value(id,period-1);return now===null||before===null?null:variation(now,before)};
 const approved=rows.filter(r=>r.status==='Aprobada');
 const financial=approved.reduce((n,r)=>n+r.financial,0),nonMonetary=approved.reduce((n,r)=>n+r.nonMonetary,0);
 return {period,value,growth,financial,nonMonetary,resources:financial+nonMonetary,adoption:value(13)===null?null:value(13)!/61*100};
}
