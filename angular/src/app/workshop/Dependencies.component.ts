import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Task } from '../../workshop/shared/types';
import { taskRelations, dependencyCandidates } from '../../workshop/shared/relations';
@Component({ selector: 'workshop-dependencies', templateUrl: './Dependencies.component.html' })
export class DependenciesComponent {
  constructor(public s: WorkshopStore) {}

  @Input() task!: Task;
  candidate = '';
  get relations() {
    return taskRelations(this.s.state, this.task.id);
  }
  get candidates() {
    return dependencyCandidates(this.s.state, this.task.id).filter(
      (item) => !this.task.dependsOn.includes(item.id)
    );
  }
  remove(id: string): void {
    this.s.dispatch('task.dependencies', {
      id: this.task.id,
      ids: this.task.dependsOn.filter((value) => value !== id)
    });
  }
  add(): void {
    if (
      this.candidate &&
      this.s.dispatch('task.dependencies', {
        id: this.task.id,
        ids: [...this.task.dependsOn, this.candidate]
      })
    )
      this.candidate = '';
  }
  get dependentIds() {
    return this.relations.dependents.map((item) => item.id).join(', ');
  }
}
