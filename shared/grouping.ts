import { Task, Status, STATUSES } from './types';
import { statusLabel } from './status';
export interface BoardColumn {status:Status;label:string;tasks:Task[];points:number;}
export function boardColumns(tasks:readonly Task[]):BoardColumn[] {
 return STATUSES.map(status=>{const group=tasks.filter(task=>!task.archived&&task.status===status);return {status,label:statusLabel(status),tasks:group,points:group.reduce((sum,task)=>sum+task.estimate,0)};});
}
export function groupByProject(tasks:readonly Task[]):Record<string,Task[]> {
 const groups:Record<string,Task[]>={};
 for(const task of tasks) {if(!Object.prototype.hasOwnProperty.call(groups,task.projectId))Object.defineProperty(groups,task.projectId,{value:[],writable:true,enumerable:true});groups[task.projectId].push(task);}
 return groups;
}
