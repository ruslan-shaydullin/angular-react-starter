import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Task } from '../../workshop/shared/types';
@Component({ selector: 'workshop-checklist', templateUrl: './Checklist.component.html' })
export class ChecklistComponent {
  constructor(public s: WorkshopStore) {}
  @Input() task!: Task;
  text = '';
  get completed() {
    return this.task.checklist.filter((item) => item.done).length;
  }
  add(): void {
    if (this.s.dispatch('checklist.add', { id: this.task.id, text: this.text })) this.text = '';
  }
}
