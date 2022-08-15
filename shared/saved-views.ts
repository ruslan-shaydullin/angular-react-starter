import { Workspace, Filters, Result } from './types';
import { failure, success, cleanText, nextId } from './result';
import { normalizeFilters } from './filters';
export function saveView(state:Workspace,name:string,filters:Filters):Result<Workspace> {
 const label=cleanText(name);if(label.length<2||label.length>60)return failure(state,'View name must contain 2 to 60 characters.');
 if(state.views.length>=20)return failure(state,'Save at most 20 views.');
 if(state.views.some(view=>view.name.toLowerCase()===label.toLowerCase()))return failure(state,'A view already uses this name.');
 return success({...state,views:[...state.views,{id:nextId('view',state.views),name:label,filters:normalizeFilters(filters)}]});
}
export function removeView(state:Workspace,id:string):Result<Workspace> {if(!state.views.some(view=>view.id===id))return failure(state,'Saved view no longer exists.');return success({...state,views:state.views.filter(view=>view.id!==id)});}
