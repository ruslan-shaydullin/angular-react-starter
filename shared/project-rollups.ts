import { Workspace } from './types';
import { estimateSummary } from './estimates';
export function projectRollups(state: Workspace) {
  return state.projects.map((project) => {
    const tasks = state.tasks.filter((task) => task.projectId === project.id && !task.archived);
    const completed = tasks.filter((task) => task.status === 'done').length;
    return {
      ...project,
      total: tasks.length,
      completed,
      open: tasks.length - completed,
      progress: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
      effort: estimateSummary(tasks),
      members: Array.from(new Set(tasks.map((task) => task.assignee).filter(Boolean)))
    };
  });
}
export function projectTasks(state: Workspace, id: string, includeArchived = false) {
  return state.tasks.filter((task) => task.projectId === id && (includeArchived || !task.archived));
}
