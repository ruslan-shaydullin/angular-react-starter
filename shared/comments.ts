import { Workspace, Result } from './types';
import { failure, success, replaceTask, cleanText, nextId } from './result';
export function addComment(
  state: Workspace,
  id: string,
  text: string,
  author: string,
  now: string
): Result<Workspace> {
  const task = state.tasks.find((item) => item.id === id);
  const value = cleanText(text);
  if (!task || task.archived) return failure(state, 'Choose an active task.');
  if (!state.members.some((member) => member.id === author))
    return failure(state, 'Choose a comment author.');
  if (!value || value.length > 1000)
    return failure(state, 'Comments must contain 1 to 1,000 characters.');
  if (task.comments.length >= 100)
    return failure(state, 'A task can contain at most 100 comments.');
  if (!Number.isFinite(Date.parse(now))) return failure(state, 'Comment time is invalid.');
  return replaceTask(
    state,
    success({
      ...task,
      comments: [
        ...task.comments,
        { id: nextId(id + '-comment', task.comments), author, text: value, createdAt: now }
      ]
    })
  );
}
export function latestComment(state: Workspace, id: string) {
  const comments = state.tasks.find((task) => task.id === id)?.comments || [];
  return [...comments].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}
