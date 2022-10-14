import { Workspace, Status, Result } from './types';
import { transitionTask } from './status';
import { failure, success } from './result';
export function bulkStatus(state: Workspace, ids: string[], status: Status): Result<Workspace> {
  const unique = Array.from(new Set(ids));
  if (!unique.length) return failure(state, 'Select at least one task.');
  let next = state;
  let pending = [...unique];
  // Retry blocked work after completing selected prerequisites; selection order is not semantic.
  while (pending.length) {
    const remaining: string[] = [];
    const errors: string[] = [];
    let progressed = false;
    for (const id of pending) {
      const result = transitionTask(next, id, status);
      if (result.ok) {
        next = result.value;
        progressed = true;
      } else {
        remaining.push(id);
        errors.push(...result.errors.map((error) => id + ': ' + error));
      }
    }
    if (!progressed) return failure(state, ...errors);
    pending = remaining;
  }
  return success(next);
}
export function bulkAssign(state: Workspace, ids: string[], assignee: string): Result<Workspace> {
  if (!ids.length) return failure(state, 'Select at least one task.');
  if (assignee && !state.members.some((member) => member.id === assignee))
    return failure(state, 'Choose an existing team member.');
  if (ids.some((id) => !state.tasks.some((task) => task.id === id && !task.archived)))
    return failure(state, 'Selection contains a missing or archived task.');
  const selected = new Set(ids);
  return success({
    ...state,
    tasks: state.tasks.map((task) => (selected.has(task.id) ? { ...task, assignee } : task))
  });
}
