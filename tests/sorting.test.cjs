const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { sortTasks } = require('../.shared-build/sorting');

test('equal sort values retain source order', () => {
  const tasks = freeze(fresh().tasks.map((task) => ({ ...task, estimate: 3 })));
  assert.deepEqual(
    sortTasks(tasks, 'estimate', 'desc').map((task) => task.id),
    tasks.map((task) => task.id)
  );
});
test('sorts workflow and priority by domain rank', () => {
  const tasks = fresh().tasks;
  assert.equal(sortTasks(tasks, 'priority', 'desc')[0].priority, 'urgent');
  assert.equal(sortTasks(tasks, 'status', 'asc')[0].status, 'backlog');
});
test('missing dates sort last in either direction', () => {
  const tasks = [{ ...fresh().tasks[0], dueDate: '' }, ...fresh().tasks.slice(1, 4)];
  for (const direction of ['asc', 'desc'])
    assert.equal(sortTasks(tasks, 'dueDate', direction)[3].dueDate, '');
});
test('numeric identifiers sort naturally', () => {
  const tasks = fresh()
    .tasks.slice(0, 2)
    .map((task, index) => ({ ...task, id: index ? 'T-10' : 'T-2' }));
  assert.equal(sortTasks(tasks, 'id', 'asc')[0].id, 'T-2');
});
