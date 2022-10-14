const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { createHistory, commitCommand, undo, redo } = require('../.shared-build/history');
const { DEFAULT_FILTERS } = require('../.shared-build/types');
const { toggleSelection, reconcileSelection } = require('../.shared-build/selection');

test('undo and redo restore the entire workspace after commands', () => {
  const original = fresh();
  const history = createHistory(original);
  const result = commitCommand(
    history,
    { type: 'task.estimate', payload: { id: 'T-103', estimate: 8 } },
    now
  );
  assert.equal(result.ok, true);
  assert.equal(undo(result.value).present, original);
  assert.equal(redo(undo(result.value)).present.tasks[2].estimate, 8);
});
test('new commands after undo discard the redo branch', () => {
  let history = createHistory(fresh());
  history = commitCommand(
    history,
    { type: 'preferences.set', payload: { density: 'compact' } },
    now
  ).value;
  history = undo(history);
  history = commitCommand(
    history,
    { type: 'preferences.set', payload: { weekStartsOn: 0 } },
    now
  ).value;
  assert.equal(history.future.length, 0);
  assert.equal(history.present.preferences.density, 'comfortable');
});
test('history is bounded and rejected commands do not enter it', () => {
  let history = createHistory(fresh());
  for (let i = 0; i < 35; i++)
    history = commitCommand(
      history,
      { type: 'task.estimate', payload: { id: 'T-103', estimate: i } },
      now
    ).value;
  assert.equal(history.past.length, 30);
  const result = commitCommand(
    history,
    { type: 'task.estimate', payload: { id: 'T-103', estimate: -1 } },
    now
  );
  assert.equal(result.value, history);
});
test('saved views copy filters and validate names and preferences', () => {
  const state = fresh();
  const filters = { ...DEFAULT_FILTERS, status: 'doing' };
  const next = apply(state, 'view.save', { name: 'In progress', filters });
  filters.status = 'done';
  assert.equal(next.views[0].filters.status, 'doing');
  reject(next, 'view.save', { name: 'IN PROGRESS', filters });
  reject(next, 'preferences.set', { density: 'tiny' });
  const selected = toggleSelection(['T-101'], 'T-102');
  assert.deepEqual(reconcileSelection([...selected, 'ghost'], state.tasks), ['T-101', 'T-102']);
});
