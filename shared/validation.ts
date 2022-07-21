import { Task, Workspace, Result, STATUSES, PRIORITIES } from './types';
import { failure, success, cleanText, isRecord } from './result';
export type TaskDraft = Pick<Task,'title'|'description'|'status'|'priority'|'projectId'|'assignee'|'dueDate'|'estimate'>;
export function validDate(value:string):boolean {
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
 const date=new Date(value+'T00:00:00Z');return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10)===value;
}
export function validateTask(input:unknown,state:Workspace):Result<TaskDraft> {
 const raw=isRecord(input)?input:{};
 const value:TaskDraft={title:cleanText(raw.title),description:cleanText(raw.description),status:raw.status as Task['status'],priority:raw.priority as Task['priority'],projectId:cleanText(raw.projectId),assignee:cleanText(raw.assignee),dueDate:cleanText(raw.dueDate),estimate:Number(raw.estimate)};
 const errors:string[]=[];
 if(value.title.length<3 || value.title.length>120) errors.push('Title must contain 3 to 120 characters.');
 if(value.description.length>2000) errors.push('Description must contain at most 2,000 characters.');
 if(!STATUSES.includes(value.status)) errors.push('Choose a valid status.');
 if(!PRIORITIES.includes(value.priority)) errors.push('Choose a valid priority.');
 if(!state.projects.some(project=>project.id===value.projectId)) errors.push('Choose an existing project.');
 if(value.assignee && !state.members.some(member=>member.id===value.assignee)) errors.push('Choose an existing team member.');
 if(value.dueDate && !validDate(value.dueDate)) errors.push('Use a valid calendar date.');
 if(!Number.isInteger(value.estimate)||value.estimate<0||value.estimate>100) errors.push('Estimate must be a whole number from 0 to 100.');
 return errors.length?failure(value,...errors):success(value);
}
