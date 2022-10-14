import { Workspace, Result, Task } from './types';
import { validateTask } from './validation';
import { success, failure, nextId } from './result';
export function createTask(state: Workspace, input: unknown, now: string): Result<Workspace> {
  const parsed = validateTask(input, state);
  if (!parsed.ok) return failure(state, ...parsed.errors);
  if (!Number.isFinite(Date.parse(now))) return failure(state, 'Creation time is invalid.');
  const task: Task = {
    ...parsed.value,
    id: nextId('T', state.tasks),
    tags: [],
    dependsOn: [],
    checklist: [],
    comments: [],
    timeEntries: [],
    archived: false,
    createdAt: now,
    updatedAt: now
  };
  return success({ ...state, tasks: [...state.tasks, task] });
}
export function blankTask(state: Workspace) {
  return {
    title: '',
    description: '',
    status: 'backlog',
    priority: 'normal',
    projectId: state.projects[0]?.id || '',
    assignee: '',
    dueDate: '',
    estimate: 0
  };
}
