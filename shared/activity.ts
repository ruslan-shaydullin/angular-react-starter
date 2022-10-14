import { Workspace, Activity } from './types';
import { nextId } from './result';
export function recordActivity(
  state: Workspace,
  text: string,
  at: string,
  taskId?: string
): Workspace {
  const item: Activity = {
    id: nextId('event', state.activity),
    text: text.slice(0, 300),
    at,
    ...(taskId ? { taskId } : {})
  };
  return { ...state, activity: [item, ...state.activity].slice(0, 200) };
}
export function activityForTask(state: Workspace, id: string): Activity[] {
  return state.activity.filter((item) => item.taskId === id);
}
export function activityByDay(state: Workspace): { date: string; items: Activity[] }[] {
  const dates = Array.from(new Set(state.activity.map((item) => item.at.slice(0, 10))))
    .sort()
    .reverse();
  return dates.map((date) => ({
    date,
    items: state.activity.filter((item) => item.at.startsWith(date))
  }));
}
