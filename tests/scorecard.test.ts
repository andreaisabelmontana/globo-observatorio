import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scorecardData} from '../src/data/scorecard.ts';
import {interactions,filterRows} from '../src/data/cooperation.ts';
test('strategic scenario displays growth as a rate and adoption against its denominator',()=>{
 const d=scorecardData(interactions,2026);
 assert.equal(d.growth(11),43.75);
 assert.equal(d.adoption,44/61*100);
 assert.equal(d.value(7),86);
});
test('all-year strategic snapshots use latest year instead of adding rates and users',()=>{
 const d=scorecardData(interactions,0);
 assert.equal(d.period,2026);assert.equal(d.value(5),3120);assert.equal(d.value(17),68);
});
test('scorecard resources respect approved filtered rows, independent of scenario values',()=>{
 const rows=filterRows(interactions,{year:2025,sector:'Salud',country:''});
 const d=scorecardData(rows,2025);
 assert.equal(d.resources,rows.filter(r=>r.status==='Aprobada').reduce((n,r)=>n+r.financial+r.nonMonetary,0));
 assert.equal(scorecardData([],2024).growth(11),null);
});
