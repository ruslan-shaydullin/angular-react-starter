import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { WorkshopStore } from './store.service';
import {filterTasks} from '../../workshop/shared/filters';import {sortTasks,SortKey,SortDirection} from '../../workshop/shared/sorting';import {paginate} from '../../workshop/shared/pagination';import {statusLabel} from '../../workshop/shared/status';import {memberName} from '../../workshop/shared/members';import {formatDate} from '../../workshop/shared/dates';import {Task} from '../../workshop/shared/types';
@Component({selector:'workshop-task-table',templateUrl:'./TaskTable.component.html'})
export class TaskTableComponent { constructor(public s:WorkshopStore) {}

@Input() selectionTemplate:TemplateRef<any>|null=null;@Input() selectable=false;key:SortKey='dueDate';direction:SortDirection='asc';statusLabel=statusLabel;memberName=memberName;formatDate=formatDate;
columns:{key:SortKey;label:string}[]=[{key:'title',label:'Task'},{key:'status',label:'Status'},{key:'priority',label:'Priority'},{key:'dueDate',label:'Due date'},{key:'estimate',label:'Points'}];
get rows(){return paginate(sortTasks(filterTasks(this.s.state,this.s.filters).filter(task=>this.s.state.preferences.showCompleted||task.status!=='done'),this.key,this.direction),this.s.page,6);}
change(key:SortKey):void{this.direction=this.key===key&&this.direction==='asc'?'desc':'asc';this.key=key;}
trackTask(index:number,task:Task):string{return task.id;}

}
