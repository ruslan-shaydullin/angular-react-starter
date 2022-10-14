const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { milestoneReadiness } = require('../.shared-build/readiness');

test('empty milestones cannot claim release readiness', () => {
  const state = fresh();
  assert.equal(
    milestoneReadiness(state, {
      id: 'empty',
      name: 'Empty',
      projectId: 'portal',
      dueDate: '2022-07-30',
      taskIds: []
    }).ready,
    false
  );
});
test('cross-project tasks and invalid dates are rejected', () => {
  reject(
    fresh(),
    'milestone.save',
    {
      values: {
        name: 'Portal beta',
        projectId: 'portal',
        dueDate: '2022-07-30',
        taskIds: ['T-101']
      }
    },
    /belong/
  );
  reject(fresh(), 'milestone.save', {
    values: { name: 'Portal beta', projectId: 'portal', dueDate: '2022-02-30', taskIds: [] }
  });
});
test('completed scope becomes ready and late open work is explained', () => {
  const state = fresh();
  const milestone = {
    id: 'beta',
    name: 'Beta',
    projectId: 'portal',
    dueDate: '2022-07-05',
    taskIds: ['T-106']
  };
  assert.equal(milestoneReadiness(state, milestone).ready, true);
  const report = milestoneReadiness(state, { ...milestone, taskIds: ['T-107'] });
  assert.equal(report.ready, false);
  assert.ok(report.reasons.some((reason) => reason.includes('due after')));
});
test('milestone ids remain unique and task ids deduplicate', () => {
  const state = apply(fresh(), 'milestone.save', {
    values: {
      name: 'Portal review',
      projectId: 'portal',
      dueDate: '2022-07-30',
      taskIds: ['T-106', 'T-106']
    }
  });
  assert.deepEqual(state.milestones[2].taskIds, ['T-106']);
});
