const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');

test('rejects direct and transitive cycles', () => {
  const state = fresh();
  reject(state, 'task.dependencies', { id: 'T-101', ids: ['T-101'] }, /cycle/);
  reject(state, 'task.dependencies', { id: 'T-101', ids: ['T-105'] }, /cycle/);
});
test('deduplicates valid dependency selections', () => {
  const state = apply(fresh(), 'task.dependencies', { id: 'T-103', ids: ['T-106', 'T-106'] });
  assert.deepEqual(state.tasks[2].dependsOn, ['T-106']);
});
test('guards missing dependencies and done work', () => {
  reject(fresh(), 'task.dependencies', { id: 'T-103', ids: ['missing'] });
  reject(fresh(), 'task.dependencies', { id: 'T-106', ids: ['T-101'] }, /Reopen/);
});
test('clears dependencies without changing unrelated tasks', () => {
  const state = freeze(fresh());
  const next = apply(state, 'task.dependencies', { id: 'T-102', ids: [] });
  assert.deepEqual(next.tasks[1].dependsOn, []);
  assert.equal(next.tasks[2], state.tasks[2]);
});
