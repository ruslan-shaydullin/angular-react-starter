import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { PAGES,pageLabel,routeHash } from '../../workshop/shared/routes';
@Component({selector:'workshop-shell',templateUrl:'./Shell.component.html'})
export class ShellComponent { constructor(public s:WorkshopStore) {}
pages=PAGES;pageLabel=pageLabel;routeHash=routeHash;
}
