import { Workspace } from './types';
import { dueState } from './dates';
import { capacityWarnings } from './capacity';
export interface Notice {
  id: string;
  severity: 'warning' | 'info';
  text: string;
  taskId?: string;
}
export function notifications(state: Workspace, today: string): Notice[] {
  const notices: Notice[] = [];
  for (const task of state.tasks.filter((task) => !task.archived && task.status !== 'done')) {
    if (dueState(task, today) === 'overdue')
      notices.push({
        id: 'overdue-' + task.id,
        severity: 'warning',
        text: task.title + ' is overdue.',
        taskId: task.id
      });
    if (!task.assignee)
      notices.push({
        id: 'unassigned-' + task.id,
        severity: 'info',
        text: task.title + ' needs an owner.',
        taskId: task.id
      });
  }
  capacityWarnings(state).forEach((text, index) =>
    notices.push({ id: 'capacity-' + index, severity: 'warning', text })
  );
  return notices.sort(
    (a, b) =>
      Number(b.severity === 'warning') - Number(a.severity === 'warning') ||
      a.id.localeCompare(b.id)
  );
}
