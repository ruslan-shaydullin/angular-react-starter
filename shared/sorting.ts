import { Task, PRIORITIES, STATUSES } from './types';
export type SortKey = 'title' | 'priority' | 'status' | 'dueDate' | 'estimate' | 'id';
export type SortDirection = 'asc' | 'desc';
export function sortTasks(
  tasks: readonly Task[],
  key: SortKey = 'dueDate',
  direction: SortDirection = 'asc'
): Task[] {
  const indexed = tasks.map((task, index) => ({ task, index }));
  return indexed
    .sort((a, b) => {
      let order = 0;
      if (key === 'priority')
        order = PRIORITIES.indexOf(a.task.priority) - PRIORITIES.indexOf(b.task.priority);
      else if (key === 'status')
        order = STATUSES.indexOf(a.task.status) - STATUSES.indexOf(b.task.status);
      else if (key === 'estimate') order = a.task.estimate - b.task.estimate;
      else if (key === 'dueDate') {
        if (!a.task.dueDate) return !b.task.dueDate ? a.index - b.index : 1;
        if (!b.task.dueDate) return -1;
        order = a.task.dueDate.localeCompare(b.task.dueDate);
      } else
        order = a.task[key].localeCompare(b.task[key], 'en', {
          numeric: true,
          sensitivity: 'base'
        });
      return (direction === 'asc' ? order : -order) || a.index - b.index;
    })
    .map((item) => item.task);
}
