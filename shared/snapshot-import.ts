import { Workspace, Result } from './types';
import { isRecord, failure, success, cloneWorkspace } from './result';
import { validateTask, validDate } from './validation';
import { dependencyPath } from './dependencies';
export function importSnapshot(text:string,current:Workspace):Result<Workspace> {
 if(text.length>2000000)return failure(current,'Snapshot must be smaller than 2 MB.');
 let raw:unknown;try{raw=JSON.parse(text);}catch{return failure(current,'Snapshot is not valid JSON.');}
 if(!isRecord(raw)||raw.format!=='release-workshop'||raw.version!==1||!isRecord(raw.workspace))return failure(current,'Unsupported snapshot format or version.');
 const w=raw.workspace;
 const arrays=['tasks','projects','members','milestones','activity','views'];
 if(w.version!==1||!Number.isInteger(w.revision)||Number(w.revision)<0||arrays.some(key=>!Array.isArray(w[key])||(w[key] as unknown[]).length>2000)||!isRecord(w.preferences))return failure(current,'Snapshot structure is incomplete.');
 const state=w as unknown as Workspace;
 const idsValid=(items:any[])=>items.every(item=>isRecord(item)&&typeof item.id==='string'&&item.id.length>0&&item.id.length<=100)&&new Set(items.map(item=>item.id)).size===items.length;
 if(arrays.some(key=>!idsValid(w[key] as any[])))return failure(current,'Snapshot identifiers must be present and unique.');
 if(state.projects.some(project=>typeof project.name!=='string'||typeof project.description!=='string'||!/^#[0-9a-f]{6}$/i.test(project.color))||state.members.some(member=>typeof member.name!=='string'||typeof member.role!=='string'||!Number.isInteger(member.capacity)||member.capacity<0||member.capacity>100))return failure(current,'Snapshot contains invalid projects or members.');
 for(const task of state.tasks){
  if(!validateTask(task,state).ok||typeof task.archived!=='boolean'||!Number.isFinite(Date.parse(task.createdAt))||!Number.isFinite(Date.parse(task.updatedAt))||!Array.isArray(task.tags)||task.tags.some(tag=>typeof tag!=='string'||tag.length>30)||!Array.isArray(task.dependsOn)||task.dependsOn.some(id=>typeof id!=='string'||!state.tasks.some(item=>item.id===id))||!Array.isArray(task.checklist)||!Array.isArray(task.comments)||!Array.isArray(task.timeEntries))return failure(current,'Snapshot contains an invalid task.');
  if(!idsValid(task.checklist)||task.checklist.some(item=>typeof item.text!=='string'||typeof item.done!=='boolean')||!idsValid(task.comments)||task.comments.some(item=>typeof item.text!=='string'||!state.members.some(member=>member.id===item.author)||!Number.isFinite(Date.parse(item.createdAt)))||!idsValid(task.timeEntries)||task.timeEntries.some(item=>!Number.isInteger(item.minutes)||item.minutes<1||item.minutes>1440||typeof item.note!=='string'||!validDate(item.date)))return failure(current,'Snapshot contains invalid task detail data.');
 }
 if(state.tasks.some(task=>task.dependsOn.some(id=>dependencyPath(state,id,task.id))))return failure(current,'Snapshot contains cyclic dependencies.');
 if(state.milestones.some(item=>typeof item.name!=='string'||!state.projects.some(project=>project.id===item.projectId)||!validDate(item.dueDate)||!Array.isArray(item.taskIds)||item.taskIds.some(id=>!state.tasks.some(task=>task.id===id&&task.projectId===item.projectId))))return failure(current,'Snapshot contains invalid milestones.');
 if(state.activity.some(item=>typeof item.text!=='string'||!Number.isFinite(Date.parse(item.at))||(item.taskId!==undefined&&typeof item.taskId!=='string'))||state.views.some(view=>typeof view.name!=='string'||!isRecord(view.filters)||['text','status','priority','projectId','assignee','tag'].some(key=>typeof (view.filters as any)[key]!=='string')||typeof view.filters.archived!=='boolean'))return failure(current,'Snapshot contains invalid activity or views.');
 if(!['comfortable','compact'].includes(state.preferences.density)||![0,1].includes(state.preferences.weekStartsOn)||typeof state.preferences.showCompleted!=='boolean')return failure(current,'Snapshot preferences are invalid.');
 return success(cloneWorkspace(state));
}
