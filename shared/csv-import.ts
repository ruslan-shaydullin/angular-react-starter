import { Workspace, Result } from './types';
import { TaskDraft, validateTask } from './validation';
import { failure, success } from './result';
import { CSV_COLUMNS } from './csv-export';
export function parseCsv(text: string): Result<string[][]> {
  if (text.length > 500000) return failure([], 'CSV must be smaller than 500 KB.');
  const rows: string[][] = [];
  let row: string[] = [],
    cell = '',
    quoted = false,
    closed = false;
  const source = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else cell += char;
      continue;
    }
    if (char === '"') {
      if (cell || closed) return failure([], 'Unexpected quote in CSV.');
      quoted = true;
      continue;
    }
    if (char === ',' || char === '\n' || char === '\r') {
      row.push(cell);
      cell = '';
      closed = false;
      if (char !== ',') {
        if (char === '\r' && source[i + 1] === '\n') i++;
        if (row.some((value) => value !== '')) rows.push(row);
        row = [];
      }
      continue;
    }
    if (closed) return failure([], 'Unexpected text after a closing quote.');
    cell += char;
  }
  if (quoted) return failure([], 'CSV contains an unclosed quoted field.');
  if (cell || row.length || closed) {
    row.push(cell);
    if (row.some((value) => value !== '')) rows.push(row);
  }
  return success(rows);
}
export function previewCsv(state: Workspace, text: string): Result<TaskDraft[]> {
  const parsed = parseCsv(text);
  if (!parsed.ok) return failure([], ...parsed.errors);
  const [headers, ...rows] = parsed.value;
  if (!headers || headers.join(',') !== CSV_COLUMNS.join(','))
    return failure([], 'CSV header must match: ' + CSV_COLUMNS.join(','));
  if (rows.length > 200) return failure([], 'Import at most 200 tasks at a time.');
  const values: TaskDraft[] = [];
  const errors: string[] = [];
  rows.forEach((row, index) => {
    if (row.length !== headers.length) {
      errors.push('Row ' + (index + 2) + ': wrong number of columns.');
      return;
    }
    const raw: Record<string, string> = {};
    headers.forEach((key, column) => (raw[key] = row[column]));
    const result = validateTask(raw, state);
    if (result.ok) values.push(result.value);
    else errors.push(...result.errors.map((error) => 'Row ' + (index + 2) + ': ' + error));
  });
  return errors.length ? failure([], ...errors) : success(values);
}
