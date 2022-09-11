import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {releaseNotes} from '../../workshop/shared/release-notes';import {DEMO_DATE} from '../../workshop/shared/types';import {downloadText} from './download';
@Component({selector:'workshop-release-notes',templateUrl:'./ReleaseNotes.component.html'})
export class ReleaseNotesComponent { constructor(public s:WorkshopStore) {}

projectId=this.s.state.projects[0]?.id||'';get selected(){return this.s.state.projects.some(project=>project.id===this.projectId)?this.projectId:this.s.state.projects[0]?.id||'';}
get notes(){return releaseNotes(this.s.state,this.selected,DEMO_DATE);}download():void{downloadText(this.notes,'release-notes.md','text/markdown;charset=utf-8');}

}
