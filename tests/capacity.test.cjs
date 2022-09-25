const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {capacityWarnings}=require('../.shared-build/capacity');

test('lower capacity warns without reassigning tasks',()=>{const state=fresh();const next=apply(state,'capacity.set',{id:'liam',capacity:5});assert.match(capacityWarnings(next).join(' '),/Liam Okafor is 11 points over capacity/);assert.equal(next.tasks,state.tasks);});
test('unestimated work is called out independently',()=>{const state=fresh();state.tasks[2].estimate=0;assert.match(capacityWarnings(state).join(' '),/Noor Haddad has 1 unestimated/);});
test('capacity validates member and numeric range',()=>{for(const capacity of [-1,101,2.5])reject(fresh(),'capacity.set',{id:'maya',capacity});reject(fresh(),'capacity.set',{id:'missing',capacity:10});});
