const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { projectRollups, projectTasks } = require('../.shared-build/project-rollups');

test('project rollups have independent counts and effort', () => {
  const rows = projectRollups(fresh());
  assert.equal(rows[0].total, 6);
  assert.equal(rows[1].total, 6);
  assert.equal(rows[0].completed, 1);
  assert.equal(rows[1].completed, 1);
  assert.equal(rows[0].effort.remaining, 24);
});
test('empty projects produce zero progress and no owners', () => {
  const state = apply(fresh(), 'project.save', {
    values: { name: 'Documentation', description: 'Guides', color: '#123456' }
  });
  const row = projectRollups(state)[2];
  assert.equal(row.progress, 0);
  assert.deepEqual(row.members, []);
});
test('archived project work is opt-in for detail queries', () => {
  const state = fresh();
  state.tasks[2].archived = true;
  assert.equal(projectTasks(state, 'platform').length, 5);
  assert.equal(projectTasks(state, 'platform', true).length, 6);
});
