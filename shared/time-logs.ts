import { Workspace, Result, Task } from './types';
import { failure, success, replaceTask, nextId, cleanText } from './result';
import { validDate } from './validation';
export function logTime(
  state: Workspace,
  id: string,
  minutes: number,
  note: string,
  date: string
): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || task.archived) return failure(state, 'Choose an active task.');
  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440)
    return failure(state, 'Time must be 1 to 1,440 whole minutes.');
  if (!validDate(date)) return failure(state, 'Use a valid work date.');
  if (cleanText(note).length > 300)
    return failure(state, 'Time notes must contain at most 300 characters.');
  return replaceTask(
    state,
    success({
      ...task,
      timeEntries: [
        ...task.timeEntries,
        { id: nextId(id + '-time', task.timeEntries), minutes, note: cleanText(note), date }
      ]
    })
  );
}
export function totalMinutes(task: Task): number {
  return task.timeEntries.reduce((sum, entry) => sum + entry.minutes, 0);
}
export function formatMinutes(minutes: number): string {
  return Math.floor(minutes / 60) + 'h ' + (minutes % 60) + 'm';
}
