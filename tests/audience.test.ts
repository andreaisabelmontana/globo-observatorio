import test from 'node:test';
import assert from 'node:assert/strict';
import {indicators,indicatorAudience,visibleIndicators} from '../src/data/indicators.ts';
test('all 17 indicators have a reasoned publication classification',()=>{
 assert.equal(indicators.length,17);
 for(const i of indicators){assert.ok(indicatorAudience[i.id]?.reason);}
 assert.equal(visibleIndicators(true).length,17);
});
test('public selection excludes operational and unvalidated publication indicators',()=>{
 assert.deepEqual(visibleIndicators(false).map(i=>i.id),[1,2,3,4,6,8,16]);
 for(const i of visibleIndicators(false))assert.equal(indicatorAudience[i.id].audience,'public');
});
