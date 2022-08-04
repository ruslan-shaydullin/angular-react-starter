import { Task, Workspace } from './types';
export function normalizeSearch(value:string):string {return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('en').trim();}
export function taskMatches(task:Task,query:string,state?:Workspace):boolean {
 const words=normalizeSearch(query).split(/\s+/).filter(Boolean);
 if(!words.length)return true;
 const project=state?.projects.find(item=>item.id===task.projectId)?.name||'';
 const member=state?.members.find(item=>item.id===task.assignee)?.name||'';
 const haystack=normalizeSearch([task.id,task.title,task.description,project,member,...task.tags].join(' '));
 return words.every(word=>haystack.includes(word));
}
export function searchTasks(state:Workspace,query:string):Task[] {return state.tasks.filter(task=>taskMatches(task,query,state));}
