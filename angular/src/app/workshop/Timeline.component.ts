import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { taskTimeline, weekDates } from '../../workshop/shared/timeline';
import { formatDate } from '../../workshop/shared/dates';
import { DEMO_DATE } from '../../workshop/shared/types';
@Component({ selector: 'workshop-timeline', templateUrl: './Timeline.component.html' })
export class TimelineComponent {
  constructor(public s: WorkshopStore) {}
  formatDate = formatDate;
  get week() {
    return weekDates(DEMO_DATE, this.s.state.preferences.weekStartsOn);
  }
  get groups() {
    return taskTimeline(this.s.state);
  }
}
