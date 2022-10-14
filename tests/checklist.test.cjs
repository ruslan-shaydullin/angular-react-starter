const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');

test('new checklist ids remain unique after repeated additions', () => {
  let state = fresh();
  state = apply(state, 'checklist.add', { id: 'T-103', text: '  Review the empty state  ' });
  state = apply(state, 'checklist.add', { id: 'T-103', text: 'Review loading state' });
  const items = state.tasks[2].checklist;
  assert.equal(new Set(items.map((item) => item.id)).size, 3);
  assert.equal(items[1].text, 'Review the empty state');
});
test('toggle changes only the chosen item', () => {
  const state = freeze(fresh());
  const next = apply(state, 'checklist.toggle', { id: 'T-103', itemId: 'T-103-check-1' });
  assert.equal(next.tasks[2].checklist[0].done, true);
  assert.equal(state.tasks[2].checklist[0].done, false);
});
test('rejects blank items, missing items, and changes to done tasks', () => {
  reject(fresh(), 'checklist.add', { id: 'T-103', text: ' ' });
  reject(fresh(), 'checklist.toggle', { id: 'T-103', itemId: 'missing' });
  reject(fresh(), 'checklist.add', { id: 'T-106', text: 'More work' }, /Reopen/);
});
