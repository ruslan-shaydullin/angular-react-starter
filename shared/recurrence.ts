import { Workspace, Result } from './types';
import { failure, success } from './result';
import { duplicateTask } from './duplicate';
import { shiftDate } from './dates';
export function scheduleFollowup(
  state: Workspace,
  id: string,
  days: number,
  now: string
): Result<Workspace> {
  const original = state.tasks.find((task) => task.id === id);
  if (!original) return failure(state, 'Task no longer exists.');
  if (!Number.isInteger(days) || days < 1 || days > 365)
    return failure(state, 'Repeat interval must be 1 to 365 days.');
  const date = shiftDate(original.dueDate, days);
  if (!date) return failure(state, 'Set a due date before scheduling a follow-up.');
  const copied = duplicateTask(state, id, now);
  if (!copied.ok) return copied;
  const tasks = [...copied.value.tasks];
  const last = tasks[tasks.length - 1];
  tasks[tasks.length - 1] = { ...last, title: original.title, dueDate: date };
  return success({ ...copied.value, tasks });
}
