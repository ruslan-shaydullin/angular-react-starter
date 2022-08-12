import { Task } from './types';
export const CSV_COLUMNS=['title','description','status','priority','projectId','assignee','dueDate','estimate'];
export function csvCell(value:unknown):string {
 let text=String(value??'');
 // Neutralize spreadsheet formula execution when files are opened by office tools.
 if(/^[\s]*[=+@-]/.test(text))text="'"+text;
 return /[",\r\n]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;
}
export function exportCsv(tasks:readonly Task[]):string {
 return [CSV_COLUMNS.join(','),...tasks.map(task=>CSV_COLUMNS.map(key=>csvCell(task[key as keyof Task])).join(','))].join('\r\n')+'\r\n';
}
export function csvFilename(date:string):string {return 'release-tasks-'+date.replace(/[^0-9-]/g,'')+'.csv';}
