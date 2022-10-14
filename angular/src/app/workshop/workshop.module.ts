import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityComponent } from './Activity.component';
import { BoardComponent } from './Board.component';
import { BulkActionsComponent } from './BulkActions.component';
import { CapacityEditorComponent } from './CapacityEditor.component';
import { ChecklistComponent } from './Checklist.component';
import { CommentsComponent } from './Comments.component';
import { DependenciesComponent } from './Dependencies.component';
import { EmptyStateComponent } from './EmptyState.component';
import { ExportComponent } from './Export.component';
import { FiltersComponent } from './Filters.component';
import { ImportComponent } from './Import.component';
import { KeyboardHelpComponent } from './KeyboardHelp.component';
import { MilestonesComponent } from './Milestones.component';
import { NotificationsComponent } from './Notifications.component';
import { OverviewComponent } from './Overview.component';
import { PaginationComponent } from './Pagination.component';
import { PreferencesComponent } from './Preferences.component';
import { ProjectEditorComponent } from './ProjectEditor.component';
import { ProjectsComponent } from './Projects.component';
import { ReadinessComponent } from './Readiness.component';
import { RowSelectionComponent } from './RowSelection.component';
import { SavedViewsComponent } from './SavedViews.component';
import { ShellComponent } from './Shell.component';
import { StatusControlsComponent } from './StatusControls.component';
import { TaskDetailComponent } from './TaskDetail.component';
import { TaskEditorComponent } from './TaskEditor.component';
import { TaskTableComponent } from './TaskTable.component';
import { TeamComponent } from './Team.component';
import { TimeEntryComponent } from './TimeEntry.component';
import { TimelineComponent } from './Timeline.component';
import { WorkloadComponent } from './Workload.component';
import { WorkspaceComponent } from './Workspace.component';
import { UndoControlsComponent } from './UndoControls.component';
import { ReleaseNotesComponent } from './ReleaseNotes.component';
const COMPONENTS = [
  ReleaseNotesComponent,
  UndoControlsComponent,
  ActivityComponent,
  BoardComponent,
  BulkActionsComponent,
  CapacityEditorComponent,
  ChecklistComponent,
  CommentsComponent,
  DependenciesComponent,
  EmptyStateComponent,
  ExportComponent,
  FiltersComponent,
  ImportComponent,
  KeyboardHelpComponent,
  MilestonesComponent,
  NotificationsComponent,
  OverviewComponent,
  PaginationComponent,
  PreferencesComponent,
  ProjectEditorComponent,
  ProjectsComponent,
  ReadinessComponent,
  RowSelectionComponent,
  SavedViewsComponent,
  ShellComponent,
  StatusControlsComponent,
  TaskDetailComponent,
  TaskEditorComponent,
  TaskTableComponent,
  TeamComponent,
  TimeEntryComponent,
  TimelineComponent,
  WorkloadComponent,
  WorkspaceComponent
];
@NgModule({ imports: [CommonModule, FormsModule], declarations: COMPONENTS, exports: COMPONENTS })
export class WorkshopModule {}
