import {test}from'node:test';import assert from'node:assert/strict';import{interactions,filterRows,summarize,variation,group,monthlySeries}from'../src/data/cooperation.ts';
test('filters jointly restrict year, sector and country',()=>{const rows=filterRows(interactions,{year:2026,sector:'Ambiente',country:'España'});assert.ok(rows.length);assert.ok(rows.every(r=>r.year===2026&&r.sector==='Ambiente'&&r.country==='España'));});
test('public totals include only approved contributions',()=>{const rows=filterRows(interactions,{year:2026,sector:'',country:''});const s=summarize(rows);assert.ok(s.approved.length<rows.length);assert.equal(s.financial,s.approved.reduce((n,r)=>n+r.financial,0));assert.equal(s.countries,new Set(s.approved.map(r=>r.country)).size);assert.equal(group(s.approved,'sector','count').reduce((n,r)=>n+r.value,0),s.approved.length);});
test('growth handles a missing baseline without Infinity',()=>{assert.equal(variation(20,0),null);assert.equal(variation(20,10),100);});
test('unique interaction ids and empty filtered results',()=>{assert.equal(new Set(interactions.map(r=>r.id)).size,interactions.length);assert.deepEqual(summarize([]).approved,[]);assert.equal(summarize([]).financial,0);});

test('all years preserves filters and approved totals without collapsing the timeline',()=>{
 const f={year:0,sector:'Ambiente',country:''};
 const rows=filterRows(interactions,f);
 assert.deepEqual([...new Set(rows.map(r=>r.year))],[2024,2025,2026]);
 assert.ok(rows.every(r=>r.sector==='Ambiente'));
 const series=monthlySeries(rows,0);
 assert.equal(series.length,30);
 assert.equal(series[0].name,'Ene 2024');
 assert.equal(series[29].name,'Oct 2026');
 assert.equal(series.reduce((n,r)=>n+r.value,0),summarize(rows).approved.length);
});
