import { Workspace, Status, Result, STATUSES } from './types';
import { transitionTask } from './status';
import { failure } from './result';
export function adjacentStatus(status:Status,direction:-1|1):Status|null {const index=STATUSES.indexOf(status)+direction;return index<0||index>=STATUSES.length?null:STATUSES[index];}
export function moveOnBoard(state:Workspace,id:string,direction:-1|1):Result<Workspace> {
 const task=state.tasks.find(item=>item.id===id);if(!task)return failure(state,'Task no longer exists.');
 const next=adjacentStatus(task.status,direction);if(!next)return failure(state,'Task is already at the edge of the workflow.');
 return transitionTask(state,id,next);
}
export function boardLimitWarning(state:Workspace,status:Status,limit:number):string {const count=state.tasks.filter(task=>task.status===status&&!task.archived).length;return count>limit?`${count} tasks exceed the ${limit}-task work-in-progress limit.`:'';}
