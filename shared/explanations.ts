import { Command, Workspace } from './types';
const verbs: Record<string, string> = {
  'task.create': 'Task created',
  'task.edit': 'Task updated',
  'task.status': 'Task status changed',
  'task.dependencies': 'Dependencies updated',
  'task.archive': 'Archive updated',
  'task.duplicate': 'Task copied',
  'task.repeat': 'Follow-up scheduled',
  'task.estimate': 'Estimate updated',
  'task.tags': 'Tags updated',
  'task.move': 'Task moved',
  'bulk.status': 'Selected task statuses changed',
  'bulk.assign': 'Selected task owners changed',
  'checklist.add': 'Checklist item added',
  'checklist.toggle': 'Checklist updated',
  'comment.add': 'Comment added',
  'time.add': 'Time recorded',
  'capacity.set': 'Capacity updated',
  'project.save': 'Project saved',
  'member.add': 'Team member added',
  'milestone.save': 'Milestone saved',
  'snapshot.import': 'Snapshot imported',
  'csv.import': 'CSV tasks imported',
  'view.save': 'View saved',
  'view.remove': 'View removed',
  'preferences.set': 'Preferences saved'
};
export function commandMessage(command: Command, state: Workspace): string {
  const message = verbs[command.type] || 'Workspace changed';
  const id = command.payload?.id;
  const task = typeof id === 'string' ? state.tasks.find((item) => item.id === id) : undefined;
  return task ? message + ': ' + task.title + '.' : message + '.';
}
export function commandKinds(): string[] {
  return Object.keys(verbs).sort();
}
