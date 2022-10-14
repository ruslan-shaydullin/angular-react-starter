import { useState } from 'react';
import { useWorkshop } from './store';
export default function Team() {
  const { state, dispatch } = useWorkshop();
  const [draft, setDraft] = useState({ name: '', role: '', capacity: 16 });
  function add(event) {
    event.preventDefault();
    if (dispatch('member.add', draft)) setDraft({ name: '', role: '', capacity: 16 });
  }
  return (
    <section className="panel">
      <h2>People and responsibilities</h2>
      <ul className="team-list">
        {state.members.map((member) => (
          <li key={member.id}>
            <span className="avatar" aria-hidden="true">
              {member.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </span>
            <div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </li>
        ))}
      </ul>
      <details>
        <summary>Add a team member</summary>
        <form onSubmit={add} noValidate className="stack">
          <label>
            Member name
            <input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
            />
          </label>
          <label>
            Member role
            <input
              value={draft.role}
              onChange={(event) => setDraft({ ...draft, role: event.target.value })}
            />
          </label>
          <label>
            Initial capacity
            <input
              type="number"
              value={draft.capacity}
              onChange={(event) => setDraft({ ...draft, capacity: Number(event.target.value) })}
            />
          </label>
          <button>Add member</button>
        </form>
      </details>
    </section>
  );
}
