import { useState } from 'react';
import { useWorkshop } from './store';
import { formatDate } from './shared/dates';
export default function Milestones() {
  const { state, dispatch } = useWorkshop();
  const [draft, setDraft] = useState({
    name: '',
    projectId: state.projects[0]?.id || '',
    dueDate: '2022-07-29',
    taskIds: []
  });
  function save(event) {
    event.preventDefault();
    if (dispatch('milestone.save', { values: draft }))
      setDraft({ ...draft, name: '', taskIds: [] });
  }
  return (
    <section className="panel">
      <h2>Release milestones</h2>
      <ul>
        {state.milestones.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {formatDate(item.dueDate)} ({item.taskIds.length} tasks)
          </li>
        ))}
      </ul>
      <details>
        <summary>Plan a milestone</summary>
        <form onSubmit={save} noValidate className="stack">
          <label>
            Milestone name
            <input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            />
          </label>
          <label>
            Milestone project
            <select
              value={draft.projectId}
              onChange={(event) =>
                setDraft({ ...draft, projectId: event.target.value, taskIds: [] })
              }
            >
              {state.projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Milestone date
            <input
              type="date"
              value={draft.dueDate}
              onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })}
            />
          </label>
          <fieldset>
            <legend>Included tasks</legend>
            {state.tasks
              .filter((task) => !task.archived && task.projectId === draft.projectId)
              .map((task) => (
                <label className="check-label" key={task.id}>
                  <input
                    type="checkbox"
                    checked={draft.taskIds.includes(task.id)}
                    onChange={(event) =>
                      setDraft({
                        ...draft,
                        taskIds: event.target.checked
                          ? [...draft.taskIds, task.id]
                          : draft.taskIds.filter((id) => id !== task.id)
                      })
                    }
                  />
                  {task.title}
                </label>
              ))}
          </fieldset>
          <button>Save milestone</button>
        </form>
      </details>
    </section>
  );
}
