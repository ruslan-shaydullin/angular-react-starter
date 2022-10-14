const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { weekDates } = require('../.shared-build/timeline');

test('schedules followups with fresh checklist state and shifted dates', () => {
  const state = fresh();
  const next = apply(state, 'task.repeat', { id: 'T-106', days: 7 });
  const copy = next.tasks[12];
  assert.equal(copy.title, state.tasks[5].title);
  assert.equal(copy.dueDate, '2022-07-12');
  assert.equal(copy.status, 'backlog');
  assert.equal(copy.checklist[0].done, false);
});
test('requires a date and a bounded whole day interval', () => {
  for (const days of [0, -1, 366, 1.5]) reject(fresh(), 'task.repeat', { id: 'T-103', days });
  const state = fresh();
  state.tasks[2].dueDate = '';
  reject(state, 'task.repeat', { id: 'T-103', days: 7 }, /due date/);
});
test('week generation respects configured start day', () => {
  assert.deepEqual(weekDates('2022-07-08', 1), [
    '2022-07-04',
    '2022-07-05',
    '2022-07-06',
    '2022-07-07',
    '2022-07-08',
    '2022-07-09',
    '2022-07-10'
  ]);
  assert.equal(weekDates('2022-07-08', 0)[0], '2022-07-03');
});
