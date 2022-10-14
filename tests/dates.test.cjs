const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { validDate } = require('../.shared-build/validation');
const { dayDistance, dueState, shiftDate } = require('../.shared-build/dates');

test('validates calendar dates without local timezone drift', () => {
  assert.equal(validDate('2020-02-29'), true);
  assert.equal(validDate('2022-02-29'), false);
  assert.equal(validDate('2022-13-01'), false);
  assert.equal(validDate('2022-7-8'), false);
  assert.equal(dayDistance('2022-03-26', '2022-03-28'), 2);
});
test('classifies deadlines at exact boundaries', () => {
  const task = fresh().tasks[0];
  for (const [dueDate, want] of [
    ['', 'none'],
    ['2022-07-07', 'overdue'],
    ['2022-07-08', 'today'],
    ['2022-07-15', 'soon'],
    ['2022-07-16', 'later']
  ])
    assert.equal(dueState({ ...task, dueDate }, '2022-07-08'), want);
  assert.equal(dueState({ ...task, status: 'done', dueDate: '2022-07-01' }, '2022-07-08'), 'done');
});
test('shifts across month and year boundaries', () => {
  assert.equal(shiftDate('2022-12-31', 1), '2023-01-01');
  assert.equal(shiftDate('2020-03-01', -1), '2020-02-29');
  assert.equal(shiftDate('invalid', 1), '');
});
