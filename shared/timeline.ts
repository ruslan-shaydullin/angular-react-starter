import { Workspace, Task } from './types';
import { validDate } from './validation';
import { shiftDate } from './dates';
export function weekDates(anchor:string,weekStartsOn:0|1):string[] {
 if(!validDate(anchor))return [];
 const day=new Date(anchor+'T00:00:00Z').getUTCDay();const start=shiftDate(anchor,-((day-weekStartsOn+7)%7));
 return Array.from({length:7},(_,index)=>shiftDate(start,index));
}
export function taskTimeline(state:Workspace):{date:string;tasks:Task[]}[] {
 const tasks=state.tasks.filter(task=>!task.archived&&task.dueDate&&(state.preferences.showCompleted||task.status!=='done'));
 const dates=Array.from(new Set(tasks.map(task=>task.dueDate))).sort();return dates.map(date=>({date,tasks:tasks.filter(task=>task.dueDate===date).sort((a,b)=>a.title.localeCompare(b.title))}));
}
