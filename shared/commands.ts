import { saveView,removeView } from './saved-views';
import { Workspace, Command, Result } from './types';
import { failure, success } from './result';
import { createTask } from './create-task';import { editTask } from './edit-task';import { transitionTask } from './status';import { setDependencies } from './dependencies';import { bulkStatus,bulkAssign } from './bulk';import { archiveTask } from './archive';import { duplicateTask } from './duplicate';import { addChecklistItem,toggleChecklistItem } from './checklist';import { addComment } from './comments';import { setEstimate } from './estimates';import { logTime } from './time-logs';import { scheduleFollowup } from './recurrence';import { setCapacity } from './capacity';import { saveProject } from './projects';import { addMember } from './members';import { saveMilestone } from './milestones';import { recordActivity } from './activity';import { previewCsv } from './csv-import';import { importSnapshot } from './snapshot-import';
export function execute(state:Workspace,command:Command,now:string):Result<Workspace> {
 const p=command.payload||{};let result:Result<Workspace>;
 switch(command.type){
  case 'view.save':result=saveView(state,p.name,p.filters);break;
  case 'view.remove':result=removeView(state,p.id);break;
  case 'task.create':result=createTask(state,p,now);break;
  case 'task.edit':result=editTask(state,p.id,p.values,now);break;
  case 'task.status':result=transitionTask(state,p.id,p.status);break;
  case 'task.dependencies':result=Array.isArray(p.ids)?setDependencies(state,p.id,p.ids):failure(state,'Choose valid dependencies.');break;
  case 'task.archive':result=archiveTask(state,p.id,p.archived===true);break;
  case 'task.duplicate':result=duplicateTask(state,p.id,now);break;
  case 'task.repeat':result=scheduleFollowup(state,p.id,Number(p.days),now);break;
  case 'task.estimate':result=setEstimate(state,p.id,Number(p.estimate));break;
  case 'bulk.status':result=Array.isArray(p.ids)?bulkStatus(state,p.ids,p.status):failure(state,'Select tasks.');break;
  case 'bulk.assign':result=Array.isArray(p.ids)?bulkAssign(state,p.ids,p.assignee):failure(state,'Select tasks.');break;
  case 'checklist.add':result=addChecklistItem(state,p.id,p.text);break;
  case 'checklist.toggle':result=toggleChecklistItem(state,p.id,p.itemId);break;
  case 'comment.add':result=addComment(state,p.id,p.text,p.author,now);break;
  case 'time.add':result=logTime(state,p.id,Number(p.minutes),p.note,p.date);break;
  case 'capacity.set':result=setCapacity(state,p.id,Number(p.capacity));break;
  case 'project.save':result=saveProject(state,p.values,p.id);break;
  case 'member.add':result=addMember(state,p);break;
  case 'milestone.save':result=saveMilestone(state,p.values,p.id);break;
  case 'snapshot.import':result=typeof p.text==='string'?importSnapshot(p.text,state):failure(state,'Choose a snapshot.');break;
  case 'csv.import':{const preview=typeof p.text==='string'?previewCsv(state,p.text):failure([],'Choose CSV text.');if(!preview.ok)return failure(state,...preview.errors);let next=state;for(const values of preview.value){const created=createTask(next,values,now);if(!created.ok)return failure(state,...created.errors);next=created.value;}result=success(next);break;}
  default:return failure(state,'Unknown workspace command: '+command.type);
 }
 if(!result.ok||result.value===state)return result;
 const changed={...result.value,revision:state.revision+1,tasks:result.value.tasks.map(task=>state.tasks.find(original=>original.id===task.id)===task?task:{...task,updatedAt:now})};
 return success(recordActivity(changed,command.type.replace(/\./g,' '),now,typeof p.id==='string'?p.id:undefined));
}
