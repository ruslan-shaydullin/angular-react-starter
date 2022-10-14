import { useState } from 'react';
import { useWorkshop } from './store';
import { previewCsv } from './shared/csv-import';
import { importSnapshot } from './shared/snapshot-import';
export default function Import() {
  const { state, dispatch } = useWorkshop();
  const [text, setText] = useState(''),
    [mode, setMode] = useState('csv'),
    [preview, setPreview] = useState(null);
  function inspect() {
    const result = mode === 'csv' ? previewCsv(state, text) : importSnapshot(text, state);
    setPreview({
      ok: result.ok,
      errors: result.errors,
      count: result.ok ? (mode === 'csv' ? result.value.length : result.value.tasks.length) : 0,
      revision: state.revision
    });
  }
  function apply() {
    if (dispatch(mode === 'csv' ? 'csv.import' : 'snapshot.import', { text })) {
      setText('');
      setPreview(null);
    }
  }
  return (
    <section className="panel">
      <h2>Preview an import</h2>
      <p>
        CSV adds tasks. A snapshot replaces the workspace and can be undone during this session.
      </p>
      <div className="stack">
        <label>
          Import format
          <select
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
              setPreview(null);
            }}
          >
            <option value="csv">Task CSV</option>
            <option value="json">Workspace snapshot</option>
          </select>
        </label>
        <label>
          Import text
          <textarea
            rows={7}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setPreview(null);
            }}
            spellCheck={false}
          />
        </label>
        <button onClick={inspect}>Preview import</button>
        {preview && (
          <div aria-live="polite">
            {preview.ok ? (
              <p>
                {preview.count} tasks passed validation. Review the selected format before applying.
              </p>
            ) : (
              <ul className="error">
                {preview.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <button disabled={!preview.ok || preview.revision !== state.revision} onClick={apply}>
              {mode === 'csv' ? 'Import tasks' : 'Replace workspace'}
            </button>
            {preview.revision !== state.revision && (
              <p>Workspace changed. Preview the import again.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
