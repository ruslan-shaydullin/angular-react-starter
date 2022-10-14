import { Filters, Workspace, Task, DEFAULT_FILTERS, STATUSES, PRIORITIES } from './types';
import { taskMatches } from './search';
export function filterTasks(state: Workspace, filters: Filters): Task[] {
  return state.tasks.filter(
    (task) =>
      task.archived === filters.archived &&
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority) &&
      (!filters.projectId || task.projectId === filters.projectId) &&
      (!filters.assignee ||
        (filters.assignee === 'unassigned'
          ? !task.assignee
          : task.assignee === filters.assignee)) &&
      (!filters.tag || task.tags.includes(filters.tag)) &&
      taskMatches(task, filters.text, state)
  );
}
export function normalizeFilters(input: Partial<Filters>): Filters {
  return {
    ...DEFAULT_FILTERS,
    text: typeof input.text === 'string' ? input.text.slice(0, 200) : '',
    status: STATUSES.includes(input.status as any) ? input.status! : '',
    priority: PRIORITIES.includes(input.priority as any) ? input.priority! : '',
    projectId: typeof input.projectId === 'string' ? input.projectId : '',
    assignee: typeof input.assignee === 'string' ? input.assignee : '',
    tag: typeof input.tag === 'string' ? input.tag : '',
    archived: input.archived === true
  };
}
export function activeFilterCount(filters: Filters): number {
  return Object.entries(filters).filter(([key, value]) =>
    key === 'archived' ? value === true : !!value
  ).length;
}
