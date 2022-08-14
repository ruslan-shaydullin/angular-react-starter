import { Workspace, Result } from './types';
import { exportSnapshot } from './snapshot-export';
import { importSnapshot } from './snapshot-import';
import { failure, success } from './result';
export const STORAGE_KEY='release-workshop:v1';
export interface StoragePort {getItem(key:string):string|null;setItem(key:string,value:string):void;removeItem(key:string):void;}
export function loadWorkspace(storage:StoragePort,fallback:Workspace):Result<Workspace> {try{const raw=storage.getItem(STORAGE_KEY);return raw?importSnapshot(raw,fallback):success(fallback);}catch{return failure(fallback,'Browser storage is unavailable. Changes remain in this tab.');}}
export function persistWorkspace(storage:StoragePort,state:Workspace,now:string):Result<Workspace> {try{storage.setItem(STORAGE_KEY,exportSnapshot(state,now));return success(state);}catch{return failure(state,'The browser could not save this workspace. Export a snapshot to keep your changes.');}}
export function clearWorkspace(storage:StoragePort):boolean {try{storage.removeItem(STORAGE_KEY);return true;}catch{return false;}}
