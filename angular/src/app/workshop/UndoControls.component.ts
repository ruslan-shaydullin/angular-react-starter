import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';

@Component({selector:'workshop-undo-controls',templateUrl:'./UndoControls.component.html'})
export class UndoControlsComponent { constructor(public s:WorkshopStore) {}

}
