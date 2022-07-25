import { Workspace, Status, Result } from './types';
import { transitionTask } from './status';
import { failure, success } from './result';
export function bulkStatus(state:Workspace,ids:string[],status:Status):Result<Workspace> {
 const unique=Array.from(new Set(ids));
 if(!unique.length) return failure(state,'Select at least one task.');
 let next=state;const errors:string[]=[];
 for(const id of unique) {
  const result=transitionTask(next,id,status);
  if(result.ok) next=result.value; else errors.push(...result.errors.map(error=>id+': '+error));
 }
 return errors.length?failure(state,...errors):success(next);
}
export function bulkAssign(state:Workspace,ids:string[],assignee:string):Result<Workspace> {
 if(!ids.length) return failure(state,'Select at least one task.');
 if(assignee && !state.members.some(member=>member.id===assignee)) return failure(state,'Choose an existing team member.');
 if(ids.some(id=>!state.tasks.some(task=>task.id===id&&!task.archived))) return failure(state,'Selection contains a missing or archived task.');
 const selected=new Set(ids);return success({...state,tasks:state.tasks.map(task=>selected.has(task.id)?{...task,assignee}:task)});
}
