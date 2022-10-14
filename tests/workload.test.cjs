const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { memberWorkload, unassignedWork } = require('../.shared-build/workload');

test('workload counts unfinished active points rather than task count', () => {
  const state = fresh();
  const rows = memberWorkload(state);
  assert.equal(rows.find((member) => member.id === 'liam').points, 16);
  assert.equal(rows.find((member) => member.id === 'noor').points, 10);
});
test('unassigned work is reported separately', () => {
  const result = unassignedWork(fresh());
  assert.equal(result.points, 2);
  assert.deepEqual(
    result.tasks.map((task) => task.id),
    ['T-109']
  );
});
test('zero capacity reports overload without infinite utilization', () => {
  const state = fresh();
  state.members[0].capacity = 0;
  const row = memberWorkload(state)[0];
  assert.equal(row.available, 0);
  assert.ok(row.overBy > 0);
  assert.equal(row.utilization, 100);
});
