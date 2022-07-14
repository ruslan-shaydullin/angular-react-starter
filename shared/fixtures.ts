import { Workspace, Task, Status, Priority } from './types';
const rows: [string, string, Status, Priority, string, string, string, number, string[]][] = [
 ['T-101','Document recovery objectives','review','high','platform','maya','2022-07-09',3,[]],
 ['T-102','Automate database restore drill','doing','urgent','platform','liam','2022-07-12',8,['T-101']],
 ['T-103','Add queue depth dashboard','ready','normal','platform','noor','2022-07-15',5,[]],
 ['T-104','Write incident handoff checklist','backlog','normal','platform','maya','2022-07-18',3,[]],
 ['T-105','Test deployment rollback','ready','high','platform','liam','2022-07-20',5,['T-102']],
 ['T-106','Replace image placeholders','done','low','portal','noor','2022-07-05',2,[]],
 ['T-107','Label account form errors','doing','high','portal','maya','2022-07-11',3,[]],
 ['T-108','Add keyboard navigation audit','ready','high','portal','noor','2022-07-13',5,['T-107']],
 ['T-109','Review empty search results','backlog','normal','portal','','2022-07-19',2,[]],
 ['T-110','Measure portal bundle budget','review','normal','portal','liam','2022-07-07',3,[]],
 ['T-111','Run support walkthrough','backlog','normal','portal','maya','2022-07-25',5,['T-108']],
 ['T-112','Publish service ownership map','done','normal','platform','noor','2022-07-06',2,[]]
];
export function createWorkspace(): Workspace {
 const tasks: Task[] = rows.map(([id,title,status,priority,projectId,assignee,dueDate,estimate,dependsOn]) => ({
  id,title,status,priority,projectId,assignee,dueDate,estimate,dependsOn:[...dependsOn],description:'Agree on acceptance criteria, implement the change, and record review evidence.',
  tags:projectId === 'platform' ? ['operations'] : ['experience'],archived:false,createdAt:'2022-07-01T09:00:00Z',updatedAt:'2022-07-08T09:00:00Z',
  checklist:[{id:id+'-check-1',text:'Acceptance criteria reviewed',done:status==='done'}],comments:[],timeEntries:[]
 }));
 return {version:1,revision:0,tasks,
  projects:[{id:'platform',name:'Platform reliability',description:'Make recovery predictable.',color:'#215b9a'},{id:'portal',name:'Customer portal',description:'Make every account task accessible.',color:'#7960a5'}],
  members:[{id:'maya',name:'Maya Chen',role:'Product engineer',capacity:16},{id:'liam',name:'Liam Okafor',role:'Platform engineer',capacity:20},{id:'noor',name:'Noor Haddad',role:'Interface engineer',capacity:18}],
  milestones:[{id:'july-platform',name:'Recovery rehearsal',projectId:'platform',dueDate:'2022-07-22',taskIds:['T-101','T-102','T-105']},{id:'july-portal',name:'Accessible account beta',projectId:'portal',dueDate:'2022-07-26',taskIds:['T-107','T-108','T-111']}],
  activity:[],views:[],preferences:{density:'comfortable',weekStartsOn:1,showCompleted:true}};
}
