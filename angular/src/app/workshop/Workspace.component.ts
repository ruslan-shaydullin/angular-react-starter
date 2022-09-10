import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {Project} from '../../workshop/shared/types';import {filterTasks} from '../../workshop/shared/filters';
@Component({selector:'workshop-workspace',templateUrl:'./Workspace.component.html'})
export class WorkspaceComponent { constructor(public s:WorkshopStore) {}

project:Project|null|false=false;get task(){return this.s.state.tasks.find(item=>item.id===this.s.route.taskId);}get editingTask(){return typeof this.s.editing==='string'?this.s.state.tasks.find(item=>item.id===this.s.editing):undefined;}
get selectedProject():Project|null{return this.project===false?null:this.project;}
get matchingTasks(){return filterTasks(this.s.state,this.s.filters).filter(task=>!task.archived&&(this.s.state.preferences.showCompleted||task.status!=='done'));}

}
