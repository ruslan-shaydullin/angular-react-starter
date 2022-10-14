import { Workspace } from './types';
import { formatDate } from './dates';
export function releaseNotes(state: Workspace, projectId: string, date: string): string {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return '';
  const tasks = state.tasks
    .filter((task) => task.projectId === projectId && task.status === 'done' && !task.archived)
    .sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));
  return [
    '# ' + project.name,
    '',
    'Release review: ' + formatDate(date),
    '',
    ...tasks.map((task) => '- ' + task.id + ': ' + task.title),
    ...(tasks.length ? [] : ['No completed work is included yet.']),
    '',
    'Open work: ' +
      state.tasks.filter(
        (task) => task.projectId === projectId && task.status !== 'done' && !task.archived
      ).length,
    ''
  ].join('\n');
}
