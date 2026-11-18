import test from 'node:test';
import assert from 'node:assert/strict';
import {buildCsvExport,csvText} from '../src/data/csvExport.ts';
import {interactions,filterRows} from '../src/data/cooperation.ts';
import {indicators} from '../src/data/indicators.ts';
const filters={year:0,sector:'',country:''};
const options={rows:interactions,filters,page:'dashboard',tab:'executive',internal:true,indicators};
test('review CSV exports only the pending table, not approved sector totals',()=>{
 const result=buildCsvExport({...options,page:'review'});const expected=interactions.filter(r=>r.status!=='Aprobada');
 assert.deepEqual(result.rows.slice(1).map(r=>r[1]),expected.map(r=>r.id));assert.match(result.filename,/review_todos/);
});
test('table takes precedence over retained indicators tab and respects combined filters',()=>{
 const f={year:2025,sector:'Salud',country:'Francia'};const selected=filterRows(interactions,f);
 const result=buildCsvExport({...options,rows:selected,filters:f,page:'interactions',tab:'indicators'});
 assert.deepEqual(result.rows.slice(1).map(r=>r[1]),selected.map(r=>r.id));
});
test('public table never exports pending demo records even if review requested',()=>{
 const result=buildCsvExport({...options,page:'review',internal:false});
 assert.ok(result.rows.length>1);assert.ok(result.rows.slice(1).every(r=>r[7]==='Aprobada'));
});
test('empty results preserve schema without fabricated rows',()=>{
 const result=buildCsvExport({...options,rows:[],page:'interactions'});assert.equal(result.rows.length,1);assert.equal(result.rows[0][1],'id_demo');
});
test('indicator export leaves unverified values blank',()=>{
 const result=buildCsvExport({...options,tab:'indicators'});for(const r of result.rows.slice(1)) if(r[1]!==16) assert.equal(r[3],'');
});
test('CSV escapes delimiters quotes newlines and spreadsheet formulas',()=>{
 const csv=csvText([['=1+1',' a;"b"\nc',-5,' @SUM(A1)']]);
 assert.equal(csv,'\uFEFF"\'=1+1";" a;""b""\nc";"-5";"\' @SUM(A1)"');
});
