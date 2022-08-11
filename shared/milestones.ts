import { Workspace, Result, Milestone } from './types';
import { failure, success, cleanText, nextId, isRecord } from './result';
import { validDate } from './validation';
export function saveMilestone(state:Workspace,input:unknown,id?:string):Result<Workspace> {
 const raw=isRecord(input)?input:{};const name=cleanText(raw.name),projectId=cleanText(raw.projectId),dueDate=cleanText(raw.dueDate);
 if(id&&!state.milestones.some(item=>item.id===id))return failure(state,'Milestone no longer exists.');
 if(name.length<3||name.length>100)return failure(state,'Milestone name must contain 3 to 100 characters.');
 if(!state.projects.some(project=>project.id===projectId))return failure(state,'Choose an existing project.');
 if(!validDate(dueDate))return failure(state,'Set a valid milestone date.');
 if(!Array.isArray(raw.taskIds)||raw.taskIds.some(taskId=>typeof taskId!=='string'||!state.tasks.some(task=>task.id===taskId&&task.projectId===projectId&&!task.archived)))return failure(state,'Milestone tasks must belong to its project and be active.');
 const milestone:Milestone={id:id||nextId('milestone',state.milestones),name,projectId,dueDate,taskIds:Array.from(new Set(raw.taskIds as string[]))};
 return success({...state,milestones:id?state.milestones.map(item=>item.id===id?milestone:item):[...state.milestones,milestone]});
}
