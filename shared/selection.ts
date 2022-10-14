import { Task } from './types';
export function toggleSelection(selected: readonly string[], id: string): string[] {
  return selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id];
}
export function selectVisible(selected: readonly string[], visible: readonly Task[]): string[] {
  const ids = visible.map((task) => task.id);
  const all = ids.length > 0 && ids.every((id) => selected.includes(id));
  return all
    ? selected.filter((id) => !ids.includes(id))
    : Array.from(new Set([...selected, ...ids]));
}
export function reconcileSelection(selected: readonly string[], tasks: readonly Task[]): string[] {
  const available = new Set(tasks.filter((task) => !task.archived).map((task) => task.id));
  return Array.from(new Set(selected)).filter((id) => available.has(id));
}
export function selectionState(
  selected: readonly string[],
  visible: readonly Task[]
): 'none' | 'some' | 'all' {
  const count = visible.filter((task) => selected.includes(task.id)).length;
  return count === 0 ? 'none' : count === visible.length ? 'all' : 'some';
}
