import { Workspace } from './types';
export function memberWorkload(state: Workspace) {
  return state.members.map((member) => {
    const tasks = state.tasks.filter(
      (task) => task.assignee === member.id && !task.archived && task.status !== 'done'
    );
    const points = tasks.reduce((sum, task) => sum + task.estimate, 0);
    return {
      ...member,
      tasks,
      points,
      unestimated: tasks.filter((task) => task.estimate === 0).length,
      available: Math.max(0, member.capacity - points),
      overBy: Math.max(0, points - member.capacity),
      utilization: member.capacity ? Math.round((points / member.capacity) * 100) : points ? 100 : 0
    };
  });
}
export function unassignedWork(state: Workspace) {
  const tasks = state.tasks.filter(
    (task) => !task.assignee && !task.archived && task.status !== 'done'
  );
  return { tasks, points: tasks.reduce((sum, task) => sum + task.estimate, 0) };
}
