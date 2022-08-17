import { Workspace } from './types';
import { blankTask } from './create-task';
export const TASK_TEMPLATES=[
 {id:'incident',name:'Incident follow-up',title:'Review incident findings',description:'Record the impact, contributing factors, corrective action, and verification owner.',priority:'high',estimate:3},
 {id:'accessibility',name:'Accessibility review',title:'Audit a user journey',description:'Use a keyboard and screen reader to complete the journey. Record barriers and acceptance criteria.',priority:'high',estimate:5},
 {id:'release',name:'Release rehearsal',title:'Rehearse the release procedure',description:'Verify deployment, smoke checks, rollback, and support handoff in the rehearsal environment.',priority:'normal',estimate:5}
];
export function taskFromTemplate(state:Workspace,id:string) {const template=TASK_TEMPLATES.find(item=>item.id===id);return template?{...blankTask(state),title:template.title,description:template.description,priority:template.priority,estimate:template.estimate}:blankTask(state);}
