const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { validateTask } = require('../.shared-build/validation');

test('reports multiple field errors together', () => {
  const result = validateTask(
    { title: 'x', status: 'unknown', priority: 'bad', estimate: -1 },
    fresh()
  );
  assert.equal(result.ok, false);
  assert.ok(result.errors.length >= 4);
});
test('trims valid form values and accepts unassigned work', () => {
  const state = fresh();
  const result = validateTask(
    { ...state.tasks[0], title: '  Review recovery  ', assignee: '' },
    state
  );
  assert.equal(result.ok, true);
  assert.equal(result.value.title, 'Review recovery');
  assert.equal(result.value.assignee, '');
});
test('rejects nonexistent people and projects', () => {
  const state = fresh();
  for (const patch of [
    { assignee: 'ghost' },
    { projectId: 'missing' },
    { dueDate: '2022-02-29' },
    { estimate: 1.5 }
  ])
    assert.equal(validateTask({ ...state.tasks[0], ...patch }, state).ok, false);
});
test('handles an absent input without throwing', () => {
  assert.equal(validateTask(null, fresh()).ok, false);
  assert.equal(validateTask([], fresh()).ok, false);
});
