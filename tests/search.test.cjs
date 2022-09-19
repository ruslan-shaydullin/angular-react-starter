const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {taskMatches,normalizeSearch,searchTasks}=require('../.shared-build/search');

test('search matches every token regardless of case or diacritics',()=>{const task={...fresh().tasks[0],title:'Café recovery review'};assert.equal(taskMatches(task,'CAFE review'),true);assert.equal(taskMatches(task,'cafe missing'),false);assert.equal(normalizeSearch('  RÉSUMÉ  '),'resume');});
test('search covers owners and project names',()=>{const state=fresh();assert.ok(searchTasks(state,'Maya platform').every(task=>task.assignee==='maya'&&task.projectId==='platform'));assert.ok(searchTasks(state,'Maya platform').length>0);});
test('blank searches preserve source order and do not mutate fixtures',()=>{const state=freeze(fresh());assert.deepEqual(searchTasks(state,'   '),state.tasks);assert.equal(taskMatches(state.tasks[0],'[.*]'),false);});
