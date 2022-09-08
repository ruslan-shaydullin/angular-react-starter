import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {activityByDay} from '../../workshop/shared/activity';import {formatDate} from '../../workshop/shared/dates';
@Component({selector:'workshop-activity',templateUrl:'./Activity.component.html'})
export class ActivityComponent { constructor(public s:WorkshopStore) {}
formatDate=formatDate;get groups(){return activityByDay(this.s.state);}
}
