import { Workspace, Result } from './types';
import { failure, success } from './result';
import { memberWorkload } from './workload';
export function setCapacity(state: Workspace, id: string, capacity: number): Result<Workspace> {
  if (!state.members.some((member) => member.id === id))
    return failure(state, 'Team member no longer exists.');
  if (!Number.isInteger(capacity) || capacity < 0 || capacity > 100)
    return failure(state, 'Capacity must be a whole number from 0 to 100 points.');
  return success({
    ...state,
    members: state.members.map((member) => (member.id === id ? { ...member, capacity } : member))
  });
}
export function capacityWarnings(state: Workspace): string[] {
  return memberWorkload(state).flatMap((member) => [
    ...(member.overBy ? [`${member.name} is ${member.overBy} points over capacity.`] : []),
    ...(member.unestimated ? [`${member.name} has ${member.unestimated} unestimated tasks.`] : [])
  ]);
}
