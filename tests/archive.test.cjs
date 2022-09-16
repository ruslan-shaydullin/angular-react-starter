const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');


test('archive and restore preserve all task content',()=>{const state=fresh();const archived=apply(state,'task.archive',{id:'T-103',archived:true});const restored=apply(archived,'task.archive',{id:'T-103',archived:false});assert.equal(restored.tasks[2].title,state.tasks[2].title);assert.deepEqual(restored.tasks[2].checklist,state.tasks[2].checklist);assert.equal(restored.tasks[2].archived,false);});
test('cannot hide an unfinished prerequisite of active work',()=>{reject(fresh(),'task.archive',{id:'T-101',archived:true},/depends/);});
test('archived tasks reject status changes but can be duplicated',()=>{let state=apply(fresh(),'task.archive',{id:'T-103',archived:true});reject(state,'task.status',{id:'T-103',status:'doing'},/Restore/);state=apply(state,'task.duplicate',{id:'T-103'});assert.equal(state.tasks[state.tasks.length-1].archived,false);});
