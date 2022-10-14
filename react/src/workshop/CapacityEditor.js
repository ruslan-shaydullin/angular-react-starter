import { useState } from 'react';
import { useWorkshop } from './store';
function MemberCapacity({ member }) {
  const { dispatch } = useWorkshop();
  const [capacity, setCapacity] = useState(member.capacity);
  return (
    <form
      className="row"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch('capacity.set', { id: member.id, capacity });
      }}
      noValidate
    >
      <label>
        {member.name} capacity
        <input
          type="number"
          min="0"
          max="100"
          value={capacity}
          onChange={(event) => setCapacity(Number(event.target.value))}
        />
      </label>
      <button type="submit">Save capacity for {member.name.split(' ')[0]}</button>
    </form>
  );
}
export default function CapacityEditor() {
  const { state } = useWorkshop();
  return (
    <section className="panel">
      <h2>Plan available capacity</h2>
      <p>
        Use zero for an unavailable person. Capacity does not automatically reassign their tasks.
      </p>
      <div className="stack">
        {state.members.map((member) => (
          <MemberCapacity key={member.id + '-' + member.capacity} member={member} />
        ))}
      </div>
    </section>
  );
}
