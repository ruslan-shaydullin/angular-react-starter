import { Workspace, Result } from './types';
import { failure, success, replaceTask } from './result';
export function setTags(state: Workspace, id: string, tags: string[]): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  if (!task || task.archived) return failure(state, 'Choose an active task.');
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string'))
    return failure(state, 'Tags must be text.');
  const values = Array.from(new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)));
  if (values.length > 10 || values.some((tag) => tag.length > 30 || !/^[-\w ]+$/.test(tag)))
    return failure(state, 'Use at most 10 tags of 30 letters, digits, spaces or hyphens.');
  return replaceTask(state, success({ ...task, tags: values }));
}
export function allTags(state: Workspace): string[] {
  return Array.from(
    new Set(state.tasks.filter((task) => !task.archived).flatMap((task) => task.tags))
  ).sort();
}
