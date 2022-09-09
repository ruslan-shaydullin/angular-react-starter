import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {encodeFilters} from '../../workshop/shared/query';
@Component({selector:'workshop-saved-views',templateUrl:'./SavedViews.component.html'})
export class SavedViewsComponent { constructor(public s:WorkshopStore) {}
name='';encodeFilters=encodeFilters;save():void{if(this.s.dispatch('view.save',{name:this.name,filters:this.s.filters}))this.name='';}
}
