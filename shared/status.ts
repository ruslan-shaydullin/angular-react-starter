import { Workspace, Status, Result, STATUSES } from './types';
import { failure, success, replaceTask } from './result';
export function transitionTask(state:Workspace,id:string,status:Status):Result<Workspace> {
 const task=state.tasks.find(item=>item.id===id);
 if(!task) return failure(state,'Task no longer exists.');
 if(task.archived) return failure(state,'Restore the task before changing its status.');
 if(!STATUSES.includes(status)) return failure(state,'Choose a valid status.');
 if(status===task.status) return success(state);
 if(status==='done') {
  const incomplete=task.dependsOn.filter(id=>!state.tasks.some(item=>item.id===id && item.status==='done'));
  if(incomplete.length) return failure(state,'Complete dependencies before finishing this task: '+incomplete.join(', '));
  if(task.checklist.some(item=>!item.done)) return failure(state,'Complete every checklist item before finishing this task.');
 }
 return replaceTask(state,success({...task,status}));
}
export function statusLabel(status:Status):string { return ({backlog:'Backlog',ready:'Ready',doing:'In progress',review:'In review',done:'Done'})[status]; }
