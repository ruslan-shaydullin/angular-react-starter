import {createContext,useContext,useEffect,useRef,useState} from 'react';
import {createWorkspace} from './shared/fixtures';import {createHistory,commitCommand,undo,redo} from './shared/history';import {loadWorkspace,persistWorkspace} from './shared/persistence';import {DEFAULT_FILTERS} from './shared/types';import {parseRoute,routeHash} from './shared/routes';import {filtersFromHash} from './shared/query';import {commandMessage} from './shared/explanations';import {reconcileSelection} from './shared/selection';
const Context=createContext(null);
export function WorkshopProvider({children}) {
 const initial=useRef(null);if(!initial.current){try{initial.current=loadWorkspace(window.localStorage,createWorkspace());}catch{initial.current={value:createWorkspace(),errors:['Browser storage is unavailable.']};}}
 const [history,setHistory]=useState(()=>createHistory(initial.current.value));const current=useRef(history);
 const [errors,setErrors]=useState(initial.current.errors),[message,setMessage]=useState(''),[route,setRoute]=useState(()=>parseRoute(window.location.hash));
 const [filters,setFilters]=useState(()=>filtersFromHash(window.location.hash)),[selected,setSelected]=useState([]),[page,setPage]=useState(1),[editing,setEditing]=useState(false),[help,setHelp]=useState(false);
 useEffect(()=>{const update=()=>{setRoute(parseRoute(window.location.hash));setFilters(filtersFromHash(window.location.hash));setPage(1);};window.addEventListener('hashchange',update);return()=>window.removeEventListener('hashchange',update);},[]);
 function install(next,notice){current.current=next;setHistory(next);setMessage(notice);setErrors([]);setSelected(ids=>reconcileSelection(ids,next.present.tasks));try{const result=persistWorkspace(window.localStorage,next.present,new Date().toISOString());if(!result.ok)setErrors(result.errors);}catch{setErrors(['Browser storage is unavailable. Export a snapshot to keep changes.']);}}
 function dispatch(type,payload){const result=commitCommand(current.current,{type,payload},new Date().toISOString());if(!result.ok){setErrors(result.errors);setMessage('');return false;}install(result.value,commandMessage({type,payload},result.value.present));return true;}
 function navigate(page,taskId=''){window.location.hash=routeHash(page,taskId);setRoute({page,taskId});setEditing(false);}
 function updateFilters(patch){setFilters(value=>({...value,...patch}));setPage(1);}
 const value={state:history.present,history,dispatch,errors,message,route,navigate,filters,updateFilters,clearFilters:()=>{setFilters({...DEFAULT_FILTERS});setPage(1);},selected,setSelected,page,setPage,editing,setEditing,help,setHelp,undo:()=>install(undo(current.current),'Change undone.'),redo:()=>install(redo(current.current),'Change redone.')};
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useWorkshop(){const value=useContext(Context);if(!value)throw new Error('WorkshopProvider is required.');return value;}
