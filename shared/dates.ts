import { Task } from './types';
import { validDate } from './validation';
export function dayDistance(from: string, to: string): number | null {
  if (!validDate(from) || !validDate(to)) return null;
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86400000);
}
export function dueState(
  task: Task,
  today: string
): 'none' | 'done' | 'overdue' | 'today' | 'soon' | 'later' {
  if (task.status === 'done') return 'done';
  const days = dayDistance(today, task.dueDate);
  if (days === null) return 'none';
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  if (days <= 7) return 'soon';
  return 'later';
}
export function formatDate(value: string): string {
  if (!validDate(value)) return 'No due date';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(value + 'T00:00:00Z'));
}
export function shiftDate(value: string, days: number): string {
  if (!validDate(value) || !Number.isInteger(days)) return '';
  const date = new Date(value + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
