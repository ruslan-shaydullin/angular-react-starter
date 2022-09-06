import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {Task} from '../../workshop/shared/types';import {toggleSelection,selectVisible,selectionState} from '../../workshop/shared/selection';
@Component({selector:'workshop-row-selection',templateUrl:'./RowSelection.component.html'})
export class RowSelectionComponent { constructor(public s:WorkshopStore) {}

@Input() task?:Task;@Input() tasks:Task[]=[];toggle():void{if(this.task)this.s.selected=toggleSelection(this.s.selected,this.task.id);}
selectVisible():void{this.s.selected=selectVisible(this.s.selected,this.tasks);}get all():boolean{return selectionState(this.s.selected,this.tasks)==='all';}

}
