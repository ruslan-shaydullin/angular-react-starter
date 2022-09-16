const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');


test('duplicates reset work history without sharing mutable collections',()=>{const state=freeze(fresh());const next=apply(state,'task.duplicate',{id:'T-106'});const copy=next.tasks[12];assert.equal(copy.status,'backlog');assert.equal(copy.checklist[0].done,false);assert.notEqual(copy.checklist,state.tasks[5].checklist);assert.notEqual(copy.tags,state.tasks[5].tags);assert.deepEqual(copy.dependsOn,[]);assert.deepEqual(copy.timeEntries,[]);});
test('copy title respects maximum length',()=>{const state=fresh();state.tasks[0].title='x'.repeat(120);const next=apply(state,'task.duplicate',{id:'T-101'});assert.equal(next.tasks[12].title.length,120);});
test('missing originals are rejected atomically',()=>{reject(fresh(),'task.duplicate',{id:'missing'});});
