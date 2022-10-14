const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { parseRoute, routeHash } = require('../.shared-build/routes');
const { encodeFilters, decodeFilters, filtersFromHash } = require('../.shared-build/query');
const { DEFAULT_FILTERS } = require('../.shared-build/types');
const { keyboardCommand } = require('../.shared-build/keyboard');

test('roundtrips encoded task identifiers', () => {
  const route = parseRoute(routeHash('tasks', 'T /?#'));
  assert.deepEqual(route, { page: 'tasks', taskId: 'T /?#' });
});
test('unknown routes and malformed escapes fall back safely', () => {
  assert.deepEqual(parseRoute('#/unknown'), { page: 'overview', taskId: '' });
  assert.deepEqual(parseRoute('#/tasks/%ZZ'), { page: 'tasks', taskId: '' });
});
test('filter query roundtrip preserves reserved characters and archive mode', () => {
  const filters = { ...DEFAULT_FILTERS, text: 'review & café?', projectId: 'a/b', archived: true };
  assert.deepEqual(decodeFilters(encodeFilters(filters)), filters);
  assert.deepEqual(filtersFromHash('#/tasks?' + encodeFilters(filters)), filters);
});
test('keyboard commands ignore editable elements and modifier conflicts', () => {
  assert.equal(keyboardCommand({ key: 'n', targetTag: 'INPUT' }), null);
  assert.equal(keyboardCommand({ key: 'z', ctrlKey: true, shiftKey: true }), 'redo');
  assert.equal(keyboardCommand({ key: '/', altKey: true }), null);
  assert.equal(keyboardCommand({ key: '?' }), 'help');
});
