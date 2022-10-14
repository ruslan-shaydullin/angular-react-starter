import { useState } from 'react';
import { useWorkshop } from './store';
import { releaseNotes } from './shared/release-notes';
import { DEMO_DATE } from './shared/types';
import { downloadText } from './Export';
export default function ReleaseNotes() {
  const { state } = useWorkshop();
  const [projectId, setProjectId] = useState(state.projects[0]?.id || '');
  const selected = state.projects.some((project) => project.id === projectId)
    ? projectId
    : state.projects[0]?.id || '';
  const notes = releaseNotes(state, selected, DEMO_DATE);
  return (
    <section className="panel">
      <h2>Draft release notes</h2>
      <label>
        Release notes project
        <select value={selected} onChange={(event) => setProjectId(event.target.value)}>
          {state.projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>
      <pre className="release-notes">
        {notes || 'Create a project before drafting release notes.'}
      </pre>
      <button
        disabled={!notes}
        onClick={() => downloadText(notes, 'release-notes.md', 'text/markdown;charset=utf-8')}
      >
        Download release notes
      </button>
      <p className="muted">
        Only completed, active tasks are included. Review the draft before sharing it.
      </p>
    </section>
  );
}
