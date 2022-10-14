const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { totalMinutes, formatMinutes } = require('../.shared-build/time-logs');

test('sums independent time entries in minutes', () => {
  let state = apply(fresh(), 'time.add', {
    id: 'T-103',
    minutes: 45,
    note: 'Review',
    date: '2022-07-08'
  });
  state = apply(state, 'time.add', {
    id: 'T-103',
    minutes: 90,
    note: 'Implement',
    date: '2022-07-09'
  });
  assert.equal(totalMinutes(state.tasks[2]), 135);
  assert.equal(formatMinutes(135), '2h 15m');
});
test('rejects invalid elapsed time and impossible work dates', () => {
  for (const minutes of [0, -1, 1.5, 1441, NaN])
    reject(fresh(), 'time.add', { id: 'T-103', minutes, note: '', date: '2022-07-08' });
  reject(fresh(), 'time.add', { id: 'T-103', minutes: 30, note: '', date: '2022-02-30' });
});
test('time notes are trimmed and limited', () => {
  const state = apply(fresh(), 'time.add', {
    id: 'T-103',
    minutes: 1,
    note: '  Drill  ',
    date: '2022-07-08'
  });
  assert.equal(state.tasks[2].timeEntries[0].note, 'Drill');
  reject(state, 'time.add', { id: 'T-103', minutes: 1, note: 'x'.repeat(301), date: '2022-07-08' });
});
