import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {exportCsv,csvFilename} from '../../workshop/shared/csv-export';import {exportSnapshot} from '../../workshop/shared/snapshot-export';import {filterTasks} from '../../workshop/shared/filters';import {DEMO_DATE} from '../../workshop/shared/types';import {downloadText} from './download';
@Component({selector:'workshop-export',templateUrl:'./Export.component.html'})
export class ExportComponent { constructor(public s:WorkshopStore) {}

csv():void{downloadText(exportCsv(filterTasks(this.s.state,this.s.filters)),csvFilename(DEMO_DATE),'text/csv;charset=utf-8');}
snapshot():void{downloadText(exportSnapshot(this.s.state,new Date().toISOString()),'release-workshop.json','application/json');}

}
