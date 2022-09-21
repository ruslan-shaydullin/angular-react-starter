const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {boardColumns}=require('../.shared-build/grouping');const {adjacentStatus,boardLimitWarning}=require('../.shared-build/board');

test('board partitions every active task exactly once',()=>{const state=fresh();state.tasks[0].archived=true;const columns=boardColumns(freeze(state.tasks));const ids=columns.flatMap(column=>column.tasks.map(task=>task.id));assert.equal(ids.length,11);assert.equal(new Set(ids).size,11);assert.equal(columns.length,5);});
test('movement respects workflow edges and completion rules',()=>{assert.equal(adjacentStatus('backlog',-1),null);assert.equal(adjacentStatus('done',1),null);reject(fresh(),'task.move',{id:'T-101',direction:1},/checklist/);const next=apply(fresh(),'task.move',{id:'T-103',direction:1});assert.equal(next.tasks[2].status,'doing');});
test('work-in-progress warning appears only over the limit',()=>{const state=fresh();assert.equal(boardLimitWarning(state,'doing',2),'');assert.match(boardLimitWarning(state,'doing',1),/exceed/);});
