import { useWorkshop } from './store';
import { memberWorkload, unassignedWork } from './shared/workload';
export default function Workload() {
  const { state } = useWorkshop();
  const unassigned = unassignedWork(state);
  return (
    <section className="panel">
      <h2>Capacity and current commitments</h2>
      <p>Only active, unfinished work counts toward capacity.</p>
      <div className="table-scroll">
        <table>
          <caption>Team workload in relative points</caption>
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Committed</th>
              <th scope="col">Capacity</th>
              <th scope="col">Assessment</th>
            </tr>
          </thead>
          <tbody>
            {memberWorkload(state).map((member) => (
              <tr key={member.id}>
                <th scope="row">{member.name}</th>
                <td>{member.points}</td>
                <td>{member.capacity}</td>
                <td>
                  {member.overBy
                    ? `${member.overBy} points over capacity`
                    : `${member.available} points available`}
                  {member.unestimated > 0 && `; ${member.unestimated} tasks unestimated`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {unassigned.tasks.length} unassigned tasks account for {unassigned.points} points.
      </p>
    </section>
  );
}
