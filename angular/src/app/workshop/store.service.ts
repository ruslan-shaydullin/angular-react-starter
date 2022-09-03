import { Injectable, OnDestroy } from '@angular/core';
import { createWorkspace } from '../../workshop/shared/fixtures';import { createHistory,commitCommand,undo,redo,History } from '../../workshop/shared/history';import { loadWorkspace,persistWorkspace } from '../../workshop/shared/persistence';import { DEFAULT_FILTERS,Filters,Workspace } from '../../workshop/shared/types';import { parseRoute,routeHash,PageName } from '../../workshop/shared/routes';import { filtersFromHash } from '../../workshop/shared/query';import { commandMessage } from '../../workshop/shared/explanations';import { reconcileSelection } from '../../workshop/shared/selection';
@Injectable({providedIn:'root'})
export class WorkshopStore implements OnDestroy {
 history:History;errors:string[]=[];message='';route=parseRoute(window.location.hash);filters=filtersFromHash(window.location.hash);selected:string[]=[];page=1;editing:boolean|string=false;help=false;
 private onHash=()=>{this.route=parseRoute(window.location.hash);this.filters=filtersFromHash(window.location.hash);this.page=1;};
 constructor(){let state=createWorkspace();try{const loaded=loadWorkspace(window.localStorage,state);state=loaded.value;this.errors=loaded.errors;}catch{this.errors=['Browser storage is unavailable.'];}this.history=createHistory(state);window.addEventListener('hashchange',this.onHash);}
 get state():Workspace{return this.history.present;}
 ngOnDestroy():void{window.removeEventListener('hashchange',this.onHash);}
 private install(history:History,message:string):void{this.history=history;this.message=message;this.errors=[];this.selected=reconcileSelection(this.selected,history.present.tasks);try{const saved=persistWorkspace(window.localStorage,history.present,new Date().toISOString());if(!saved.ok)this.errors=saved.errors;}catch{this.errors=['Browser storage is unavailable. Export a snapshot to keep changes.'];}}
 dispatch(type:string,payload?:unknown):boolean{const result=commitCommand(this.history,{type,payload},new Date().toISOString());if(!result.ok){this.errors=result.errors;this.message='';return false;}this.install(result.value,commandMessage({type,payload},result.value.present));return true;}
 navigate(page:PageName,taskId=''):void{window.location.hash=routeHash(page,taskId);this.route={page,taskId};this.editing=false;}
 updateFilters(patch:Partial<Filters>):void{this.filters={...this.filters,...patch};this.page=1;}
 clearFilters():void{this.filters={...DEFAULT_FILTERS};this.page=1;}
 undo():void{this.install(undo(this.history),'Change undone.');}
 redo():void{this.install(redo(this.history),'Change redone.');}
}
