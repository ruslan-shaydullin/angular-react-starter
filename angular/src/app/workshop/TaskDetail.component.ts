import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {Task} from '../../workshop/shared/types';import {memberName} from '../../workshop/shared/members';import {formatDate} from '../../workshop/shared/dates';
@Component({selector:'workshop-task-detail',templateUrl:'./TaskDetail.component.html'})
export class TaskDetailComponent { constructor(public s:WorkshopStore) {}
@Input() task!:Task;memberName=memberName;formatDate=formatDate;
}
