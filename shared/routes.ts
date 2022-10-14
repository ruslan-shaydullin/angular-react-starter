export const PAGES = [
  'overview',
  'tasks',
  'board',
  'projects',
  'team',
  'releases',
  'activity',
  'settings'
] as const;
export type PageName = typeof PAGES[number];
export interface Route {
  page: PageName;
  taskId: string;
}
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '').split('?')[0];
  const segments = path.split('/');
  const page = PAGES.includes(segments[0] as PageName) ? (segments[0] as PageName) : 'overview';
  let taskId = '';
  try {
    taskId = page === 'tasks' && segments[1] ? decodeURIComponent(segments[1]) : '';
  } catch {
    taskId = '';
  }
  return { page, taskId };
}
export function routeHash(page: PageName, taskId = ''): string {
  return '#/' + page + (page === 'tasks' && taskId ? '/' + encodeURIComponent(taskId) : '');
}
export function pageLabel(page: PageName): string {
  return {
    overview: 'Overview',
    tasks: 'Tasks',
    board: 'Board',
    projects: 'Projects',
    team: 'Team',
    releases: 'Releases',
    activity: 'Activity',
    settings: 'Settings'
  }[page];
}
