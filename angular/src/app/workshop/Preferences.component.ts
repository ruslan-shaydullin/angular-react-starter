import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {preferenceDescription} from '../../workshop/shared/preferences';
@Component({selector:'workshop-preferences',templateUrl:'./Preferences.component.html'})
export class PreferencesComponent { constructor(public s:WorkshopStore) {}
preferenceDescription=preferenceDescription;number=Number;
}
