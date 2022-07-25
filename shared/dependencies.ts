import { Workspace, Result } from './types';
import { failure, success, replaceTask } from './result';
export function dependencyPath(state:Workspace,start:string,target:string,visited=new Set<string>()):boolean {
 if(start===target) return true;
 if(visited.has(start)) return false;
 visited.add(start);
 return (state.tasks.find(task=>task.id===start)?.dependsOn||[]).some(id=>dependencyPath(state,id,target,visited));
}
export function setDependencies(state:Workspace,id:string,ids:string[]):Result<Workspace> {
 const task=state.tasks.find(item=>item.id===id);
 if(!task || task.archived) return failure(state,'Choose an active task.');
 const unique=Array.from(new Set(ids));
 if(unique.some(dep=>!state.tasks.some(item=>item.id===dep))) return failure(state,'A dependency no longer exists.');
 if(unique.some(dep=>dependencyPath(state,dep,id))) return failure(state,'Dependencies cannot form a cycle.');
 if(task.status==='done' && unique.some(dep=>state.tasks.find(item=>item.id===dep)?.status!=='done')) return failure(state,'Reopen the task before adding unfinished dependencies.');
 return replaceTask(state,success({...task,dependsOn:unique}));
}
