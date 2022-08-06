import { Workspace } from './types';
import { dueState } from './dates';
import { estimateSummary } from './estimates';
export function workspaceMetrics(state:Workspace,today:string) {
 const tasks=state.tasks.filter(task=>!task.archived);
 const done=tasks.filter(task=>task.status==='done').length;
 return {total:tasks.length,done,open:tasks.length-done,inProgress:tasks.filter(task=>task.status==='doing').length,review:tasks.filter(task=>task.status==='review').length,overdue:tasks.filter(task=>dueState(task,today)==='overdue').length,unassigned:tasks.filter(task=>!task.assignee&&task.status!=='done').length,blocked:tasks.filter(task=>task.status!=='done'&&task.dependsOn.some(id=>state.tasks.find(item=>item.id===id)?.status!=='done')).length,completion:tasks.length?Math.round(done/tasks.length*100):0,effort:estimateSummary(tasks)};
}
