import { Workspace, Milestone } from './types';
export function milestoneReadiness(state: Workspace, milestone: Milestone) {
  const tasks = milestone.taskIds.map((id) => state.tasks.find((task) => task.id === id));
  const missing = milestone.taskIds.filter((id) => !state.tasks.some((task) => task.id === id));
  const incomplete = tasks.filter((task) => task && task.status !== 'done');
  const late = tasks.filter(
    (task) => task && task.status !== 'done' && task.dueDate && task.dueDate > milestone.dueDate
  );
  const reasons = [
    ...missing.map((id) => 'Missing task ' + id),
    ...incomplete.map((task) => task!.id + ' is ' + task!.status),
    ...late.map((task) => task!.id + ' is due after the milestone')
  ];
  if (!tasks.length) reasons.push('Add at least one task to this milestone.');
  return {
    id: milestone.id,
    name: milestone.name,
    total: tasks.length,
    completed: tasks.filter((task) => task?.status === 'done').length,
    ready: reasons.length === 0,
    reasons,
    progress: tasks.length
      ? Math.round(((tasks.length - missing.length - incomplete.length) / tasks.length) * 100)
      : 0
  };
}
export function releaseReadiness(state: Workspace) {
  return state.milestones.map((milestone) => ({
    ...milestone,
    ...milestoneReadiness(state, milestone)
  }));
}
