const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { notifications } = require('../.shared-build/notifications');
const { recordActivity } = require('../.shared-build/activity');

test('warnings precede ownership information and ids are stable', () => {
  const state = fresh();
  const first = notifications(state, '2022-07-08');
  assert.equal(first[0].severity, 'warning');
  assert.deepEqual(first, notifications(state, '2022-07-08'));
  assert.equal(new Set(first.map((item) => item.id)).size, first.length);
});
test('completed and archived work does not produce deadline notices', () => {
  const state = fresh();
  state.tasks.forEach((task) => {
    task.status = 'done';
  });
  assert.equal(notifications(state, '2022-07-30').length, 0);
});
test('activity keeps newest events first and caps retained history', () => {
  let state = fresh();
  for (let i = 0; i < 205; i++) state = recordActivity(state, 'Change ' + i, now);
  assert.equal(state.activity.length, 200);
  assert.equal(state.activity[0].text, 'Change 204');
  assert.equal(new Set(state.activity.map((item) => item.id)).size, 200);
});
