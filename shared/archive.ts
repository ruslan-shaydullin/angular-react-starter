import { Workspace, Result } from './types';
import { failure, success, replaceTask } from './result';
export function archiveTask(state:Workspace,id:string,archived:boolean):Result<Workspace> {
 const task=state.tasks.find(item=>item.id===id);
 if(!task) return failure(state,'Task no longer exists.');
 if(archived && state.tasks.some(other=>!other.archived&&other.status!=='done'&&other.dependsOn.includes(id)) && task.status!=='done') return failure(state,'An active task still depends on this unfinished task.');
 if(task.archived===archived) return success(state);
 return replaceTask(state,success({...task,archived}));
}
export function archiveSummary(state:Workspace) {
 const archived=state.tasks.filter(task=>task.archived);
 return {count:archived.length,completed:archived.filter(task=>task.status==='done').length,ids:archived.map(task=>task.id)};
}
