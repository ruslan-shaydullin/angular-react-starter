const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { DEFAULT_FILTERS } = require('../.shared-build/types');
const { filterTasks, normalizeFilters, activeFilterCount } = require('../.shared-build/filters');

test('combines project, status, owner and tags conjunctively', () => {
  const state = fresh();
  const result = filterTasks(state, {
    ...DEFAULT_FILTERS,
    projectId: 'platform',
    status: 'ready',
    assignee: 'noor',
    tag: 'operations'
  });
  assert.deepEqual(
    result.map((task) => task.id),
    ['T-103']
  );
});
test('unassigned and archived views are explicit', () => {
  const state = fresh();
  state.tasks[2].archived = true;
  assert.equal(filterTasks(state, DEFAULT_FILTERS).length, 11);
  assert.deepEqual(
    filterTasks(state, { ...DEFAULT_FILTERS, archived: true }).map((task) => task.id),
    ['T-103']
  );
  assert.deepEqual(
    filterTasks(state, { ...DEFAULT_FILTERS, assignee: 'unassigned' }).map((task) => task.id),
    ['T-109']
  );
});
test('normalization rejects unsupported enumerations and nonboolean archive flags', () => {
  const filters = normalizeFilters({
    status: 'deleted',
    priority: 'critical',
    archived: 'true',
    text: 'x'.repeat(300)
  });
  assert.equal(filters.status, '');
  assert.equal(filters.priority, '');
  assert.equal(filters.archived, false);
  assert.equal(filters.text.length, 200);
  assert.equal(activeFilterCount({ ...DEFAULT_FILTERS, status: 'doing', archived: true }), 2);
});
