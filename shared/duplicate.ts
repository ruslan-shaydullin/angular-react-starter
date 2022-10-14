import { Workspace, Result, Task } from './types';
import { failure, success, nextId } from './result';
export function duplicateTask(state: Workspace, id: string, now: string): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return failure(state, 'Task no longer exists.');
  if (!Number.isFinite(Date.parse(now))) return failure(state, 'Creation time is invalid.');
  const newId = nextId('T', state.tasks);
  const copy: Task = {
    ...task,
    id: newId,
    title: (task.title + ' (copy)').slice(0, 120),
    status: 'backlog',
    archived: false,
    tags: [...task.tags],
    dependsOn: [],
    comments: [],
    timeEntries: [],
    checklist: task.checklist.map((item, index) => ({
      id: newId + '-check-' + (index + 1),
      text: item.text,
      done: false
    })),
    createdAt: now,
    updatedAt: now
  };
  return success({ ...state, tasks: [...state.tasks, copy] });
}
