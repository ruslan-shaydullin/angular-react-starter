import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {filterTasks} from '../../workshop/shared/filters';import {paginate} from '../../workshop/shared/pagination';
@Component({selector:'workshop-pagination',templateUrl:'./Pagination.component.html'})
export class PaginationComponent { constructor(public s:WorkshopStore) {}
get result(){return paginate(filterTasks(this.s.state,this.s.filters).filter(task=>this.s.state.preferences.showCompleted||task.status!=='done'),this.s.page,6);}
}
