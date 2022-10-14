import { Workspace, Task, Result } from './types';
import { validateTask } from './validation';
import { failure, success, replaceTask, isRecord } from './result';
export function editTask(
  state: Workspace,
  id: string,
  input: unknown,
  now: string
): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return failure(state, 'Task no longer exists.');
  if (task.archived) return failure(state, 'Restore the task before editing it.');
  const parsed = validateTask({ ...task, ...(isRecord(input) ? input : {}) }, state);
  if (!parsed.ok) return failure(state, ...parsed.errors);
  if (
    parsed.value.projectId !== task.projectId &&
    state.milestones.some((milestone) => milestone.taskIds.includes(id))
  )
    return failure(state, 'Remove the task from its milestone before changing projects.');
  if (parsed.value.status !== task.status)
    return failure(state, 'Use the status action to change workflow state.');
  if (!Number.isFinite(Date.parse(now))) return failure(state, 'Update time is invalid.');
  return replaceTask(state, success<Task>({ ...task, ...parsed.value, updatedAt: now }));
}
export function findTask(state: Workspace, id: string): Task | undefined {
  return state.tasks.find((task) => task.id === id);
}
