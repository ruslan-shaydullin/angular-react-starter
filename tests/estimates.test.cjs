const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {estimateSummary}=require('../.shared-build/estimates');

test('accepts zero and the upper estimate boundary',()=>{let state=apply(fresh(),'task.estimate',{id:'T-103',estimate:0});assert.equal(state.tasks[2].estimate,0);state=apply(state,'task.estimate',{id:'T-103',estimate:100});assert.equal(state.tasks[2].estimate,100);});
test('rejects fractional, negative, and nonfinite estimates',()=>{for(const estimate of [-1,101,1.5,NaN,Infinity])reject(fresh(),'task.estimate',{id:'T-103',estimate});});
test('summary excludes archived tasks and calculates weighted completion',()=>{const state=fresh();const tasks=[{...state.tasks[0],estimate:8,status:'done'},{...state.tasks[1],estimate:2,status:'doing'},{...state.tasks[2],estimate:100,archived:true}];assert.deepEqual(estimateSummary(tasks),{total:10,completed:8,remaining:2,unestimated:0,percent:80});});
