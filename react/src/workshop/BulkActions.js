import { useState } from 'react';
import { useWorkshop } from './store';
import { STATUSES } from './shared/types';
import { statusLabel } from './shared/status';
export default function BulkActions() {
  const { state, selected, setSelected, dispatch } = useWorkshop();
  const [status, setStatus] = useState('ready'),
    [assignee, setAssignee] = useState('');
  if (!selected.length) return null;
  return (
    <section className="bulk panel" aria-label="Selected task actions">
      <h3>{selected.length} tasks selected</h3>
      <div className="row">
        <label>
          Bulk status
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUSES.map((value) => (
              <option key={value} value={value}>
                {statusLabel(value)}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => dispatch('bulk.status', { ids: selected, status })}>
          Apply status
        </button>
        <label>
          Bulk owner
          <select value={assignee} onChange={(event) => setAssignee(event.target.value)}>
            <option value="">Unassigned</option>
            {state.members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => dispatch('bulk.assign', { ids: selected, assignee })}>
          Assign owner
        </button>
        <button onClick={() => setSelected([])}>Clear selection</button>
      </div>
      <p className="muted">If any selected task fails validation, the entire change is rejected.</p>
    </section>
  );
}
