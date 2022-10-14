import { useWorkshop } from './store';
import { STATUSES } from './shared/types';
import { statusLabel } from './shared/status';
import { taskRelations } from './shared/relations';
export default function StatusControls({ task }) {
  const { state, dispatch } = useWorkshop();
  const relations = taskRelations(state, task.id);
  return (
    <section className="detail-section">
      <h3>Workflow</h3>
      <label>
        Task status
        <select
          disabled={task.archived}
          value={task.status}
          onChange={(event) => dispatch('task.status', { id: task.id, status: event.target.value })}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {statusLabel(status)}
            </option>
          ))}
        </select>
      </label>
      {relations.blocked && (
        <p className="notice">Finish dependencies before marking this task done.</p>
      )}
      <p className="muted">Checklist items must also be complete before a task can finish.</p>
    </section>
  );
}
