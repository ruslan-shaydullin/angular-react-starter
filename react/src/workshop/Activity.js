import { useWorkshop } from './store';
import { activityByDay } from './shared/activity';
import { formatDate } from './shared/dates';
export default function Activity() {
  const { state, navigate } = useWorkshop();
  return (
    <section className="panel">
      <h2>Workspace activity</h2>
      <p>
        Successful changes appear here. Undo restores the previous activity along with its data.
      </p>
      {!state.activity.length && (
        <p className="empty">Create a task or record a review to start the activity log.</p>
      )}
      {activityByDay(state).map((group) => (
        <section key={group.date}>
          <h3>{formatDate(group.date)}</h3>
          <ol className="activity-list">
            {group.items.map((item) => (
              <li key={item.id}>
                <time dateTime={item.at}>{new Date(item.at).toLocaleTimeString()}</time>
                <span>{item.text}</span>
                {item.taskId && (
                  <button className="text-button" onClick={() => navigate('tasks', item.taskId)}>
                    {item.taskId}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </section>
  );
}
