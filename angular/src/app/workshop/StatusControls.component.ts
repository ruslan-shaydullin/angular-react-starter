import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Task, Status, STATUSES } from '../../workshop/shared/types';
import { statusLabel } from '../../workshop/shared/status';
import { taskRelations } from '../../workshop/shared/relations';
@Component({ selector: 'workshop-status-controls', templateUrl: './StatusControls.component.html' })
export class StatusControlsComponent {
  constructor(public s: WorkshopStore) {}
  @Input() task!: Task;
  changeStatus(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.s.dispatch('task.status', { id: this.task.id, status: select.value as Status });
    select.value =
      this.s.state.tasks.find((task) => task.id === this.task.id)?.status || this.task.status;
  }
  statuses = STATUSES;
  statusLabel = statusLabel;
  get relations() {
    return taskRelations(this.s.state, this.task.id);
  }
}
