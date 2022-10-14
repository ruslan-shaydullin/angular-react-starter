import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Task, STATUSES } from '../../workshop/shared/types';
import { statusLabel } from '../../workshop/shared/status';
import { taskRelations } from '../../workshop/shared/relations';
@Component({ selector: 'workshop-status-controls', templateUrl: './StatusControls.component.html' })
export class StatusControlsComponent {
  constructor(public s: WorkshopStore) {}
  @Input() task!: Task;
  statuses = STATUSES;
  statusLabel = statusLabel;
  get relations() {
    return taskRelations(this.s.state, this.task.id);
  }
}
