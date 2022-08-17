import { Workspace, Task } from './types';
export function taskRelations(state:Workspace,id:string):{dependencies:Task[];dependents:Task[];missing:string[];blocked:boolean} {
 const task=state.tasks.find(item=>item.id===id);const ids=task?.dependsOn||[];
 const dependencies=state.tasks.filter(item=>ids.includes(item.id));
 const missing=ids.filter(dep=>!dependencies.some(item=>item.id===dep));
 return {dependencies,dependents:state.tasks.filter(item=>item.dependsOn.includes(id)),missing,blocked:missing.length>0||dependencies.some(item=>item.status!=='done')};
}
export function dependencyCandidates(state:Workspace,id:string):Task[] {return state.tasks.filter(task=>task.id!==id&&!task.archived);}
