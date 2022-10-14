import { Task } from './types';
export interface TaskChange {
  field: string;
  before: string;
  after: string;
}
export function compareTasks(before: Task, after: Task): TaskChange[] {
  const fields: (keyof Task)[] = [
    'title',
    'description',
    'status',
    'priority',
    'projectId',
    'assignee',
    'dueDate',
    'estimate',
    'archived'
  ];
  const changes = fields
    .filter((field) => before[field] !== after[field])
    .map((field) => ({ field, before: String(before[field]), after: String(after[field]) }));
  for (const field of ['tags', 'dependsOn'] as const) {
    const old = [...before[field]].sort().join(', '),
      next = [...after[field]].sort().join(', ');
    if (old !== next) changes.push({ field, before: old, after: next });
  }
  const oldDone = before.checklist.filter((item) => item.done).length,
    nextDone = after.checklist.filter((item) => item.done).length;
  if (oldDone !== nextDone)
    changes.push({ field: 'checklist', before: String(oldDone), after: String(nextDone) });
  return changes;
}
