const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {execute}=require('../.shared-build/commands');

test('requires both checklist and dependencies to finish',()=>{let state=fresh();reject(state,'task.status',{id:'T-102',status:'done'},/dependencies/);reject(state,'task.status',{id:'T-101',status:'done'},/checklist/);state=apply(state,'checklist.toggle',{id:'T-101',itemId:'T-101-check-1'});state=apply(state,'task.status',{id:'T-101',status:'done'});assert.equal(state.tasks[0].status,'done');});
test('allows reopening completed work',()=>{const state=apply(fresh(),'task.status',{id:'T-106',status:'review'});assert.equal(state.tasks[5].status,'review');});
test('same status leaves state identity and revision unchanged',()=>{const state=fresh();const result=execute(state,{type:'task.status',payload:{id:'T-101',status:'review'}},now);assert.equal(result.value,state);});
test('rejects unknown statuses and tasks',()=>{reject(fresh(),'task.status',{id:'T-101',status:'closed'});reject(fresh(),'task.status',{id:'none',status:'ready'});});
