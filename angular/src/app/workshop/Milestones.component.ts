import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { formatDate } from '../../workshop/shared/dates';
@Component({ selector: 'workshop-milestones', templateUrl: './Milestones.component.html' })
export class MilestonesComponent {
  constructor(public s: WorkshopStore) {}

  formatDate = formatDate;
  draft = {
    name: '',
    projectId: this.s.state.projects[0]?.id || '',
    dueDate: '2022-07-29',
    taskIds: [] as string[]
  };
  get tasks() {
    return this.s.state.tasks.filter(
      (task) => !task.archived && task.projectId === this.draft.projectId
    );
  }
  projectChanged(): void {
    this.draft.taskIds = [];
  }
  toggle(id: string, checked: boolean): void {
    this.draft.taskIds = checked
      ? [...this.draft.taskIds, id]
      : this.draft.taskIds.filter((value) => value !== id);
  }
  save(): void {
    if (this.s.dispatch('milestone.save', { values: this.draft }))
      this.draft = { ...this.draft, name: '', taskIds: [] };
  }
}
