const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');

test('retains identity and nested records after an edit', () => {
  const state = freeze(fresh());
  const next = apply(state, 'task.edit', {
    id: 'T-103',
    values: { title: 'Review queue dashboard' }
  });
  assert.equal(next.tasks[2].title, 'Review queue dashboard');
  assert.equal(next.tasks[2].createdAt, state.tasks[2].createdAt);
  assert.equal(next.tasks[2].checklist, state.tasks[2].checklist);
});
test('guards project moves that would invalidate release membership', () => {
  const state = fresh();
  reject(state, 'task.edit', { id: 'T-101', values: { projectId: 'portal' } }, /milestone/);
  const next = apply(state, 'task.edit', { id: 'T-103', values: { projectId: 'portal' } });
  assert.equal(next.tasks[2].projectId, 'portal');
});
test('requires explicit workflow commands for status changes', () => {
  reject(fresh(), 'task.edit', { id: 'T-103', values: { status: 'done' } }, /status action/);
});
test('does not edit missing or archived tasks', () => {
  reject(fresh(), 'task.edit', { id: 'missing', values: { title: 'Valid title' } });
  const state = apply(fresh(), 'task.archive', { id: 'T-103', archived: true });
  reject(state, 'task.edit', { id: 'T-103', values: { title: 'Valid title' } }, /Restore/);
});
