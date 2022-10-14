import { useWorkshop } from './store';
import { workspaceMetrics } from './shared/metrics';
import { DEMO_DATE } from './shared/types';
export default function Overview() {
  const { state, navigate } = useWorkshop();
  const metrics = workspaceMetrics(state, DEMO_DATE);
  return (
    <section className="panel">
      <h2>July release at a glance</h2>
      <p>Two teams are preparing a recovery rehearsal and an accessible account beta.</p>
      <div className="metrics">
        {[
          ['Open work', metrics.open],
          ['In review', metrics.review],
          ['Blocked', metrics.blocked],
          ['Overdue', metrics.overdue]
        ].map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <label>
        Completed work: {metrics.done} of {metrics.total}
        <progress max="100" value={metrics.completion}>
          {metrics.completion}%
        </progress>
      </label>
      <p>
        {metrics.effort.remaining} estimated points remain. {metrics.unassigned} tasks need an
        owner.
      </p>
      <button onClick={() => navigate('tasks')}>Review open tasks</button>
    </section>
  );
}
