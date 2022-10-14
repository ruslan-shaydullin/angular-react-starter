const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');
const { parseCsv, previewCsv } = require('../.shared-build/csv-import');
const { exportCsv, csvCell } = require('../.shared-build/csv-export');

test('roundtrips commas newlines and escaped quotes', () => {
  const state = fresh();
  state.tasks[0].title = 'Review, then "ship"';
  state.tasks[0].description = 'First line\nSecond line';
  const text = exportCsv([state.tasks[0]]);
  const result = previewCsv(state, text);
  assert.equal(result.ok, true, result.errors.join('; '));
  assert.equal(result.value[0].title, state.tasks[0].title);
  assert.equal(result.value[0].description, state.tasks[0].description);
});
test('rejects malformed quotes and wrong row widths', () => {
  for (const text of ['a,"unfinished', 'a,"closed"tail', 'a,b"c'])
    assert.equal(parseCsv(text).ok, false);
  const state = fresh();
  assert.equal(previewCsv(state, exportCsv([]) + 'short,row').ok, false);
});
test('escapes spreadsheet formula prefixes even after whitespace', () => {
  for (const value of ['=1+1', ' +SUM(A1)', '@cmd', '-2+3'])
    assert.ok(csvCell(value).startsWith("'"));
  assert.equal(csvCell('ordinary'), 'ordinary');
});
test('invalid import rows roll back the entire transaction', () => {
  const state = fresh();
  const csv = exportCsv([state.tasks[0]]) + 'Invalid,,ready,normal,ghost,,,0\r\n';
  reject(state, 'csv.import', { text: csv });
  assert.equal(state.tasks.length, 12);
});
test('accepts UTF-8 BOM and rejects oversized input', () => {
  assert.equal(previewCsv(fresh(), '\uFEFF' + exportCsv([])).ok, true);
  assert.equal(parseCsv('x'.repeat(500001)).ok, false);
});
