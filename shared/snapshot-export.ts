import { Workspace } from './types';
export interface SnapshotEnvelope {
  format: 'release-workshop';
  version: 1;
  exportedAt: string;
  workspace: Workspace;
}
export function exportSnapshot(state: Workspace, now: string): string {
  if (!Number.isFinite(Date.parse(now))) throw new Error('Export time must be an ISO timestamp.');
  const envelope: SnapshotEnvelope = {
    format: 'release-workshop',
    version: 1,
    exportedAt: now,
    workspace: state
  };
  return JSON.stringify(envelope, null, 2) + '\n';
}
export function snapshotStats(state: Workspace) {
  return {
    tasks: state.tasks.length,
    projects: state.projects.length,
    members: state.members.length,
    milestones: state.milestones.length,
    comments: state.tasks.reduce((sum, task) => sum + task.comments.length, 0)
  };
}
