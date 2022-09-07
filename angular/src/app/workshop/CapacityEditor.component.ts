import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';

@Component({selector:'workshop-capacity-editor',templateUrl:'./CapacityEditor.component.html'})
export class CapacityEditorComponent { constructor(public s:WorkshopStore) {}

values:Record<string,number>={};value(id:string,capacity:number):number{return this.values[id]===undefined?capacity:this.values[id];}
save(id:string,capacity:number):void{if(this.s.dispatch('capacity.set',{id,capacity:this.value(id,capacity)}))delete this.values[id];}

}
