const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');

test('records author timestamp and plain text without mutating old comments', () => {
  const state = freeze(fresh());
  const next = apply(state, 'comment.add', {
    id: 'T-103',
    author: 'maya',
    text: '  <script>review evidence</script>  '
  });
  assert.equal(next.tasks[2].comments[0].text, '<script>review evidence</script>');
  assert.equal(next.tasks[2].comments[0].createdAt, now);
  assert.deepEqual(state.tasks[2].comments, []);
});
test('rejects unknown authors and invalid lengths', () => {
  for (const payload of [
    { author: 'ghost', text: 'Review' },
    { author: 'maya', text: ' ' },
    { author: 'maya', text: 'a'.repeat(1001) }
  ])
    reject(fresh(), 'comment.add', { id: 'T-103', ...payload });
});
test('prevents unbounded comment growth', () => {
  const state = fresh();
  state.tasks[2].comments = Array.from({ length: 100 }, (_, i) => ({
    id: 'c-' + i,
    author: 'maya',
    text: 'Review',
    createdAt: now
  }));
  reject(state, 'comment.add', { id: 'T-103', author: 'maya', text: 'One more' }, /100/);
});
