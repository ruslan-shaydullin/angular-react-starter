import { Workspace, Result } from './types';
import { failure, success, replaceTask, nextId, cleanText } from './result';
export function addChecklistItem(state: Workspace, id: string, text: string): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  const value = cleanText(text);
  if (!task || task.archived) return failure(state, 'Choose an active task.');
  if (task.status === 'done')
    return failure(state, 'Reopen the task before adding checklist work.');
  if (value.length < 2 || value.length > 200)
    return failure(state, 'Checklist text must contain 2 to 200 characters.');
  if (task.checklist.length >= 30)
    return failure(state, 'A task can contain at most 30 checklist items.');
  return replaceTask(
    state,
    success({
      ...task,
      checklist: [
        ...task.checklist,
        { id: nextId(id + '-check', task.checklist), text: value, done: false }
      ]
    })
  );
}
export function toggleChecklistItem(
  state: Workspace,
  id: string,
  itemId: string
): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || task.archived) return failure(state, 'Choose an active task.');
  if (!task.checklist.some((item) => item.id === itemId))
    return failure(state, 'Checklist item no longer exists.');
  if (task.status === 'done')
    return failure(state, 'Reopen the task before changing its checklist.');
  return replaceTask(
    state,
    success({
      ...task,
      checklist: task.checklist.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    })
  );
}
