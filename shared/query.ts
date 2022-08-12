import { Filters } from './types';
import { normalizeFilters } from './filters';
export function encodeFilters(filters:Filters):string {
 const params=new URLSearchParams();
 for(const [key,value] of Object.entries(filters))if(value)params.set(key,String(value));
 return params.toString();
}
export function decodeFilters(query:string):Filters {
 const params=new URLSearchParams(query.replace(/^\?/,''));
 return normalizeFilters({text:params.get('text')||'',status:params.get('status')||'',priority:params.get('priority')||'',projectId:params.get('projectId')||'',assignee:params.get('assignee')||'',tag:params.get('tag')||'',archived:params.get('archived')==='true'});
}
export function filtersFromHash(hash:string):Filters {return decodeFilters(hash.includes('?')?hash.slice(hash.indexOf('?')+1):'');}
