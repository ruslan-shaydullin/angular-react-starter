import { Workspace, Command, Result } from './types';
import { execute } from './commands';
import { success, failure } from './result';
export interface History {past:Workspace[];present:Workspace;future:Workspace[];}
export function createHistory(state:Workspace):History {return {past:[],present:state,future:[]};}
export function commitCommand(history:History,command:Command,now:string):Result<History> {
 const result=execute(history.present,command,now);
 if(!result.ok)return failure(history,...result.errors);
 if(result.value===history.present)return success(history);
 return success({past:[...history.past,history.present].slice(-30),present:result.value,future:[]});
}
export function undo(history:History):History {if(!history.past.length)return history;return {past:history.past.slice(0,-1),present:history.past[history.past.length-1],future:[history.present,...history.future].slice(0,30)};}
export function redo(history:History):History {if(!history.future.length)return history;return {past:[...history.past,history.present].slice(-30),present:history.future[0],future:history.future.slice(1)};}
