import { Result, Task, Workspace } from './types';
export function success<T>(value:T):Result<T> { return {ok:true,value,errors:[]}; }
export function failure<T>(value:T,...errors:string[]):Result<T> { return {ok:false,value,errors}; }
export function replaceTask(state:Workspace,result:Result<Task>):Result<Workspace> {
 if(!result.ok) return failure(state,...result.errors);
 if(!state.tasks.some(task=>task.id===result.value.id)) return failure(state,'Task no longer exists.');
 return success({...state,tasks:state.tasks.map(task=>task.id===result.value.id ? result.value : task)});
}
export function nextId(prefix:string,existing:readonly {id:string}[]):string {
 const used=new Set(existing.map(item=>item.id));
 let index=1;while(used.has(`${prefix}-${index}`)) index++;
 return `${prefix}-${index}`;
}
export function isRecord(value:unknown):value is Record<string,unknown> { return !!value && typeof value==='object' && !Array.isArray(value); }
export function cleanText(value:unknown):string { return typeof value==='string' ? value.trim() : ''; }
export function cloneWorkspace(state:Workspace):Workspace { return JSON.parse(JSON.stringify(state)) as Workspace; }
