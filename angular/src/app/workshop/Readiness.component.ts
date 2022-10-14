import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { releaseReadiness } from '../../workshop/shared/readiness';
@Component({ selector: 'workshop-readiness', templateUrl: './Readiness.component.html' })
export class ReadinessComponent {
  constructor(public s: WorkshopStore) {}
  get releases() {
    return releaseReadiness(this.s.state);
  }
}
