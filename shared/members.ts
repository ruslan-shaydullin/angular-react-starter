import { Workspace, Result, Member } from './types';
import { failure, success, cleanText, nextId, isRecord } from './result';
export function addMember(state:Workspace,input:unknown):Result<Workspace> {
 const raw=isRecord(input)?input:{};const name=cleanText(raw.name),role=cleanText(raw.role),capacity=Number(raw.capacity);
 if(name.length<2||name.length>80)return failure(state,'Team member name must contain 2 to 80 characters.');
 if(role.length<2||role.length>80)return failure(state,'Role must contain 2 to 80 characters.');
 if(!Number.isInteger(capacity)||capacity<0||capacity>100)return failure(state,'Capacity must be a whole number from 0 to 100.');
 if(state.members.some(member=>member.name.toLowerCase()===name.toLowerCase()))return failure(state,'A team member already uses this name.');
 const member:Member={id:nextId('member',state.members),name,role,capacity};return success({...state,members:[...state.members,member]});
}
export function memberName(state:Workspace,id:string):string {return state.members.find(member=>member.id===id)?.name||'Unassigned';}
