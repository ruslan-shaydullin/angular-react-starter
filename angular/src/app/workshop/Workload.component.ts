import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { memberWorkload, unassignedWork } from '../../workshop/shared/workload';
@Component({ selector: 'workshop-workload', templateUrl: './Workload.component.html' })
export class WorkloadComponent {
  constructor(public s: WorkshopStore) {}
  get members() {
    return memberWorkload(this.s.state);
  }
  get unassigned() {
    return unassignedWork(this.s.state);
  }
}
