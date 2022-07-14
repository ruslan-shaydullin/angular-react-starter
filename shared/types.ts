export type Status = 'backlog' | 'ready' | 'doing' | 'review' | 'done';
export type Priority = 'low' | 'normal' | 'high' | 'urgent';
export interface ChecklistItem { id: string; text: string; done: boolean; }
export interface Comment { id: string; author: string; text: string; createdAt: string; }
export interface TimeEntry { id: string; minutes: number; note: string; date: string; }
export interface Task {
  id: string; title: string; description: string; status: Status; priority: Priority;
  projectId: string; assignee: string; dueDate: string; estimate: number;
  tags: string[]; dependsOn: string[]; checklist: ChecklistItem[]; comments: Comment[];
  timeEntries: TimeEntry[]; archived: boolean; createdAt: string; updatedAt: string;
}
export interface Project { id: string; name: string; description: string; color: string; }
export interface Member { id: string; name: string; role: string; capacity: number; }
export interface Milestone { id: string; name: string; projectId: string; dueDate: string; taskIds: string[]; }
export interface Activity { id: string; text: string; at: string; taskId?: string; }
export interface Filters { text: string; status: string; priority: string; projectId: string; assignee: string; tag: string; archived: boolean; }
export interface SavedView { id: string; name: string; filters: Filters; }
export interface Preferences { density: 'comfortable' | 'compact'; weekStartsOn: 0 | 1; showCompleted: boolean; }
export interface Workspace {
  version: 1; revision: number; tasks: Task[]; projects: Project[]; members: Member[];
  milestones: Milestone[]; activity: Activity[]; views: SavedView[]; preferences: Preferences;
}
export interface Result<T> { ok: boolean; value: T; errors: string[]; }
export interface Command { type: string; payload?: any; }
export const STATUSES: Status[] = ['backlog', 'ready', 'doing', 'review', 'done'];
export const PRIORITIES: Priority[] = ['low', 'normal', 'high', 'urgent'];
export const DEFAULT_FILTERS: Filters = { text: '', status: '', priority: '', projectId: '', assignee: '', tag: '', archived: false };
export const DEMO_DATE = '2022-07-08';
