import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {projectRollups} from '../../workshop/shared/project-rollups';import {Project} from '../../workshop/shared/types';
@Component({selector:'workshop-projects',templateUrl:'./Projects.component.html'})
export class ProjectsComponent { constructor(public s:WorkshopStore) {}
@Output() editProject=new EventEmitter<Project>();get projects(){return projectRollups(this.s.state);}open(id:string):void{this.s.navigate('tasks');this.s.updateFilters({projectId:id});}
}
