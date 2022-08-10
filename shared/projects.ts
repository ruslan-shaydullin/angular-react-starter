import { Workspace, Result, Project } from './types';
import { failure, success, cleanText, nextId, isRecord } from './result';
export function saveProject(state:Workspace,input:unknown,id?:string):Result<Workspace> {
 const raw=isRecord(input)?input:{};const name=cleanText(raw.name),description=cleanText(raw.description),color=cleanText(raw.color)||'#215b9a';
 if(id&&!state.projects.some(project=>project.id===id))return failure(state,'Project no longer exists.');
 if(name.length<3||name.length>80)return failure(state,'Project name must contain 3 to 80 characters.');
 if(description.length>500)return failure(state,'Project description must contain at most 500 characters.');
 if(!/^#[0-9a-fA-F]{6}$/.test(color))return failure(state,'Choose a six-digit project color.');
 if(state.projects.some(project=>project.id!==id&&project.name.toLowerCase()===name.toLowerCase()))return failure(state,'A project already uses this name.');
 const value:Project={id:id||nextId('project',state.projects),name,description,color};
 return success({...state,projects:id?state.projects.map(project=>project.id===id?value:project):[...state.projects,value]});
}
