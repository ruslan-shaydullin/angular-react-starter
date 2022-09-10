import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';

@Component({selector:'workshop-empty-state',templateUrl:'./EmptyState.component.html'})
export class EmptyStateComponent { constructor(public s:WorkshopStore) {}
@Input() title='';@Input() description='';@Input() action='';@Output() activated=new EventEmitter<void>();
}
