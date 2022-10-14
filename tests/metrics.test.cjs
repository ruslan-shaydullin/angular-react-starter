const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { workspaceMetrics } = require('../.shared-build/metrics');

test('fixture metrics describe open completed overdue and blocked work', () => {
  const metrics = workspaceMetrics(fresh(), '2022-07-08');
  assert.equal(metrics.total, 12);
  assert.equal(metrics.done, 2);
  assert.equal(metrics.open, 10);
  assert.equal(metrics.overdue, 1);
  assert.equal(metrics.blocked, 4);
  assert.equal(metrics.unassigned, 1);
});
test('archived completed work is excluded from numerator and denominator', () => {
  const state = fresh();
  state.tasks[5].archived = true;
  const metrics = workspaceMetrics(state, '2022-07-08');
  assert.equal(metrics.total, 11);
  assert.equal(metrics.done, 1);
});
test('empty workspaces avoid division by zero', () => {
  const state = fresh();
  state.tasks = [];
  const metrics = workspaceMetrics(state, '2022-07-08');
  assert.equal(metrics.completion, 0);
  assert.equal(metrics.effort.percent, 0);
});
