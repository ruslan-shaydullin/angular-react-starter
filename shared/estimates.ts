import { Task, Workspace, Result } from './types';
import { failure, success, replaceTask } from './result';
export function setEstimate(state:Workspace,id:string,estimate:number):Result<Workspace> {
 const task=state.tasks.find(item=>item.id===id);
 if(!task||task.archived) return failure(state,'Choose an active task.');
 if(!Number.isInteger(estimate)||estimate<0||estimate>100) return failure(state,'Estimate must be a whole number from 0 to 100.');
 return replaceTask(state,success({...task,estimate}));
}
export function estimateSummary(tasks:readonly Task[]) {
 const active=tasks.filter(task=>!task.archived);const total=active.reduce((sum,task)=>sum+task.estimate,0);
 const completed=active.filter(task=>task.status==='done').reduce((sum,task)=>sum+task.estimate,0);
 return {total,completed,remaining:total-completed,unestimated:active.filter(task=>task.estimate===0&&task.status!=='done').length,percent:total?Math.round(completed/total*100):0};
}
