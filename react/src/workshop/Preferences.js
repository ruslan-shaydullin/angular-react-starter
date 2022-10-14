import { useWorkshop } from './store';
import { preferenceDescription } from './shared/preferences';
export default function Preferences() {
  const { state, dispatch } = useWorkshop();
  const preferences = state.preferences;
  return (
    <section className="panel">
      <h2>Workspace preferences</h2>
      <div className="stack">
        <label>
          Table density
          <select
            value={preferences.density}
            onChange={(event) => dispatch('preferences.set', { density: event.target.value })}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
        <label>
          Week starts on
          <select
            value={preferences.weekStartsOn}
            onChange={(event) =>
              dispatch('preferences.set', { weekStartsOn: Number(event.target.value) })
            }
          >
            <option value="1">Monday</option>
            <option value="0">Sunday</option>
          </select>
        </label>
        <label className="check-label">
          <input
            type="checkbox"
            checked={preferences.showCompleted}
            onChange={(event) =>
              dispatch('preferences.set', { showCompleted: event.target.checked })
            }
          />
          Show completed tasks in task lists and timeline
        </label>
        <p>{preferenceDescription(preferences)}</p>
      </div>
    </section>
  );
}
