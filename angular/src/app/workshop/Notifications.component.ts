import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {notifications} from '../../workshop/shared/notifications';import {DEMO_DATE} from '../../workshop/shared/types';
@Component({selector:'workshop-notifications',templateUrl:'./Notifications.component.html'})
export class NotificationsComponent { constructor(public s:WorkshopStore) {}
get notices(){return notifications(this.s.state,DEMO_DATE);}
}
