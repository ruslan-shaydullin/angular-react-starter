import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {STATUSES,PRIORITIES} from '../../workshop/shared/types';import {statusLabel} from '../../workshop/shared/status';import {activeFilterCount} from '../../workshop/shared/filters';import {allTags} from '../../workshop/shared/tags';
@Component({selector:'workshop-filters',templateUrl:'./Filters.component.html'})
export class FiltersComponent { constructor(public s:WorkshopStore) {}
statuses=STATUSES;priorities=PRIORITIES;statusLabel=statusLabel;activeFilterCount=activeFilterCount;get tags(){return allTags(this.s.state);}
}
