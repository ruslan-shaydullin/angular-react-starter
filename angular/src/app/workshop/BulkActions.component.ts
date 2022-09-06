import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {STATUSES,Status} from '../../workshop/shared/types';import {statusLabel} from '../../workshop/shared/status';
@Component({selector:'workshop-bulk-actions',templateUrl:'./BulkActions.component.html'})
export class BulkActionsComponent { constructor(public s:WorkshopStore) {}
statuses=STATUSES;statusLabel=statusLabel;status:Status='ready';assignee='';
}
