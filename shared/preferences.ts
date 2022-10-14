import { Workspace, Preferences, Result } from './types';
import { failure, success, isRecord } from './result';
export function setPreferences(state: Workspace, input: unknown): Result<Workspace> {
  if (!isRecord(input)) return failure(state, 'Preferences must be an object.');
  const value = { ...state.preferences, ...input };
  if (
    !['comfortable', 'compact'].includes(value.density) ||
    ![0, 1].includes(value.weekStartsOn) ||
    typeof value.showCompleted !== 'boolean'
  )
    return failure(state, 'Choose valid display and calendar preferences.');
  const preferences: Preferences = {
    density: value.density,
    weekStartsOn: value.weekStartsOn,
    showCompleted: value.showCompleted
  };
  return success({ ...state, preferences });
}
export function preferenceDescription(preferences: Preferences): string {
  return `${preferences.density === 'compact' ? 'Compact' : 'Comfortable'} rows; week starts ${
    preferences.weekStartsOn === 1 ? 'Monday' : 'Sunday'
  }; completed tasks ${preferences.showCompleted ? 'shown' : 'hidden'}.`;
}
