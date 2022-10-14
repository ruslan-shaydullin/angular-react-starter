import { useState } from 'react';
import { useWorkshop } from './store';
import { totalMinutes, formatMinutes } from './shared/time-logs';
import { DEMO_DATE } from './shared/types';
export default function TimeEntry({ task }) {
  const { dispatch } = useWorkshop();
  const [minutes, setMinutes] = useState(30),
    [note, setNote] = useState(''),
    [date, setDate] = useState(DEMO_DATE);
  function save(event) {
    event.preventDefault();
    if (dispatch('time.add', { id: task.id, minutes, note, date })) setNote('');
  }
  return (
    <section className="detail-section">
      <h3>Time recorded: {formatMinutes(totalMinutes(task))}</h3>
      <ul>
        {task.timeEntries.map((entry) => (
          <li key={entry.id}>
            {entry.date}: {formatMinutes(entry.minutes)} {entry.note && '— ' + entry.note}
          </li>
        ))}
      </ul>
      <form onSubmit={save} noValidate className="stack">
        <div className="row">
          <label>
            Minutes worked
            <input
              type="number"
              min="1"
              max="1440"
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
            />
          </label>
          <label>
            Work date
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
        </div>
        <label>
          Time note
          <input value={note} onChange={(event) => setNote(event.target.value)} maxLength={300} />
        </label>
        <button disabled={task.archived} type="submit">
          Record time
        </button>
      </form>
      <p className="muted">
        Time records measure elapsed work. Estimate points describe relative effort.
      </p>
    </section>
  );
}
