import {test} from 'node:test';
import assert from 'node:assert/strict';
import {interactions,filterRows} from '../src/data/cooperation.ts';
import {executiveSummary,goals} from '../src/data/executive.ts';
test('executive instruments exclude assistance and partitions reconcile',()=>{const s=executiveSummary(filterRows(interactions,{year:2026,sector:'',country:''}),2026);assert.ok(s.instruments.every(r=>['Convenio','Memorando'].includes(r.type)));assert.equal(s.states.reduce((n,s)=>n+s.value,0),s.instruments.length);assert.equal(s.activeInstruments,s.states[0].value+s.states[1].value);});
test('all executive approved summaries share the active filters',()=>{const rows=filterRows(interactions,{year:2025,sector:'Ambiente',country:'España'});const s=executiveSummary(rows,2025);assert.ok(s.countries.every(c=>c.name==='España'));assert.ok(s.sectors.every(c=>c.name==='Ambiente'));assert.equal(s.goals.reduce((n,g)=>n+g.value,0),s.approved.length);assert.ok(s.goals.every(g=>goals[Number(g.name)]));});
test('empty executive view is finite and safe',()=>{const s=executiveSummary([],2026);assert.equal(s.financial,0);assert.equal(s.activeInstruments,0);assert.equal(s.pending,0);assert.equal(s.states.reduce((n,s)=>n+s.value,0),0);});
