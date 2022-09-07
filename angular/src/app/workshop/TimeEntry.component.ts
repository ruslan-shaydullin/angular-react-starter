import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {Task,DEMO_DATE} from '../../workshop/shared/types';import {totalMinutes,formatMinutes} from '../../workshop/shared/time-logs';
@Component({selector:'workshop-time-entry',templateUrl:'./TimeEntry.component.html'})
export class TimeEntryComponent { constructor(public s:WorkshopStore) {}
@Input() task!:Task;minutes=30;note='';date=DEMO_DATE;totalMinutes=totalMinutes;formatMinutes=formatMinutes;save():void{if(this.s.dispatch('time.add',{id:this.task.id,minutes:this.minutes,note:this.note,date:this.date}))this.note='';}
}
