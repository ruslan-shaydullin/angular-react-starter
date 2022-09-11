const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');


test('creates distinct ids without mutating frozen fixtures',()=>{const state=freeze(fresh());const first=apply(state,'task.create',{...state.tasks[0],title:'Create recovery exercise'});const second=apply(first,'task.create',{...state.tasks[0],title:'Create second exercise'});assert.equal(new Set(second.tasks.map(task=>task.id)).size,14);assert.equal(state.tasks.length,12);assert.equal(second.tasks[13].createdAt,now);});
test('ignores imported ids and nested details in create form',()=>{const state=fresh();const next=apply(state,'task.create',{...state.tasks[0],id:'T-101',comments:[{text:'injected'}]});const task=next.tasks[next.tasks.length-1];assert.notEqual(task.id,'T-101');assert.deepEqual(task.comments,[]);assert.deepEqual(task.dependsOn,[]);});
test('invalid creation is atomic and does not emit activity',()=>{const state=fresh();reject(state,'task.create',{title:''});assert.equal(state.activity.length,0);assert.equal(state.revision,0);});
