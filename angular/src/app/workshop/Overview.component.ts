import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { workspaceMetrics } from '../../workshop/shared/metrics';import { DEMO_DATE } from '../../workshop/shared/types';
@Component({selector:'workshop-overview',templateUrl:'./Overview.component.html'})
export class OverviewComponent { constructor(public s:WorkshopStore) {}
get metrics(){return workspaceMetrics(this.s.state,DEMO_DATE);}
}
