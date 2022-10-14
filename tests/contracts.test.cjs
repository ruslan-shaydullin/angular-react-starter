const { assert, fresh, now, apply, test } = require('./helpers.cjs');
const { exportSnapshot } = require('../.shared-build/snapshot-export');
const { importSnapshot } = require('../.shared-build/snapshot-import');
test('representative command sequence stays reloadable after every successful step', () => {
  let state = fresh();
  const steps = [
    ['task.edit', { id: 'T-103', values: { title: 'Review queue telemetry' } }],
    ['checklist.toggle', { id: 'T-101', itemId: 'T-101-check-1' }],
    ['task.status', { id: 'T-101', status: 'done' }],
    ['checklist.toggle', { id: 'T-102', itemId: 'T-102-check-1' }],
    ['task.status', { id: 'T-102', status: 'done' }],
    ['comment.add', { id: 'T-103', text: 'Recovery review is complete.', author: 'maya' }],
    ['time.add', { id: 'T-103', minutes: 45, note: 'Review', date: '2022-07-08' }],
    ['capacity.set', { id: 'maya', capacity: 20 }],
    ['preferences.set', { density: 'compact' }],
    ['task.tags', { id: 'T-103', tags: ['observability', 'operations'] }]
  ];
  for (const [type, payload] of steps) {
    state = apply(state, type, payload);
    const restored = importSnapshot(exportSnapshot(state, now), fresh());
    assert.equal(restored.ok, true, type + ': ' + restored.errors.join('; '));
    assert.deepEqual(restored.value, state);
  }
});
test('independent fixtures have no shared editable nested arrays', () => {
  const first = fresh(),
    second = fresh();
  first.tasks[0].checklist[0].done = true;
  first.tasks[0].tags.push('changed');
  assert.equal(second.tasks[0].checklist[0].done, false);
  assert.deepEqual(second.tasks[0].tags, ['operations']);
});
