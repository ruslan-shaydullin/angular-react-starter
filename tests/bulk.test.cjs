const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');


test('completion of selected prerequisites does not depend on selection order',()=>{let state=fresh();for(const id of ['T-101','T-102'])state=apply(state,'checklist.toggle',{id,itemId:id+'-check-1'});const a=apply(state,'bulk.status',{ids:['T-102','T-101'],status:'done'});const b=apply(state,'bulk.status',{ids:['T-101','T-102'],status:'done'});assert.deepEqual(a.tasks,b.tasks);assert.equal(a.tasks[1].status,'done');});
test('rolls back valid changes when another selected task fails',()=>{const state=fresh();reject(state,'bulk.status',{ids:['T-103','missing'],status:'doing'});assert.equal(state.tasks[2].status,'ready');});
test('assigns unique selected work and permits unassignment',()=>{const state=apply(fresh(),'bulk.assign',{ids:['T-101','T-102','T-101'],assignee:''});assert.equal(state.tasks[0].assignee,'');assert.equal(state.tasks[1].assignee,'');assert.equal(state.tasks[2].assignee,'noor');});
test('empty selections and nonexistent owners are errors',()=>{reject(fresh(),'bulk.status',{ids:[],status:'ready'});reject(fresh(),'bulk.assign',{ids:['T-101'],assignee:'ghost'});});
