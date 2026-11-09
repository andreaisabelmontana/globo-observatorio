import {palette} from './palette.ts';
import {group, summarize, cutoffYear} from './cooperation.ts';
import type {Interaction} from './cooperation.ts';

// Official SDG hues. These are topic labels, not modified UN emblems or icons.
export const goals: Record<number,{name:string;color:string;image:string}> = {
 3:{image:'S-WEB-Goal-03_1.png',name:'Salud y bienestar',color:'#4C9F38'},4:{image:'S-WEB-Goal-04.png',name:'Educación de calidad',color:'#C5192D'},
 5:{image:'S-WEB-Goal-05.png',name:'Igualdad de género',color:'#FF3A21'},11:{image:'S-WEB-Goal-11.png',name:'Ciudades y comunidades sostenibles',color:'#FD9D24'},
 13:{image:'S-WEB-Goal-13_0.png',name:'Acción por el clima',color:'#3F7E44'},16:{image:'S-WEB-Goal-16.png',name:'Paz, justicia e instituciones sólidas',color:'#00689D'},
 17:{image:'S-WEB-Goal-17.png',name:'Alianzas para lograr los objetivos',color:'#19486A'}
};
export function executiveSummary(rows:Interaction[],year:number) {
 const summary=summarize(rows),approved=summary.approved;
 const referenceYear=cutoffYear(year);
 const cutoff=`${referenceYear}-10-31`,deadline=`${referenceYear}-11-30`;
 const instruments=approved.filter(r=>r.type==='Convenio'||r.type==='Memorando');
 const states=[
 {name:'Vigentes · más de 30 días',short:'Vigentes',color:palette.green,value:instruments.filter(r=>r.endDate>deadline).length},
 {name:'Por vencer · 30 días',short:'Por vencer',color:palette.amber,value:instruments.filter(r=>r.endDate>=cutoff&&r.endDate<=deadline).length},
 {name:'Vencidos',short:'Vencidos',color:palette.red,value:instruments.filter(r=>r.endDate&&r.endDate<cutoff).length},
 {name:'Sin fecha de cierre',short:'Sin fecha',color:palette.gray,value:instruments.filter(r=>!r.endDate).length}
 ];
 return {...summary,instruments,states,activeInstruments:states[0].value+states[1].value,pending:rows.filter(r=>r.status!=='Aprobada').length,goals:group(approved,'ods','count'),countries:group(approved,'country','count'),partners:group(approved,'partner'),entities:group(approved,'entity','count'),sectors:group(approved,'sector')};
}
