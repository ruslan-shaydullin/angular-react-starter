export interface KeyContext {key:string;ctrlKey?:boolean;metaKey?:boolean;shiftKey?:boolean;altKey?:boolean;targetTag?:string;contentEditable?:boolean;}
export function keyboardCommand(event:KeyContext):'search'|'new'|'help'|'undo'|'redo'|null {
 const tag=(event.targetTag||'').toLowerCase();if(['input','textarea','select'].includes(tag)||event.contentEditable)return null;
 if(event.altKey)return null;
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z')return event.shiftKey?'redo':'undo';
 if(event.ctrlKey||event.metaKey)return null;
 if(event.key==='/')return 'search';if(event.key==='n')return 'new';if(event.key==='?')return 'help';return null;
}
export const SHORTCUTS=[{keys:'/',action:'Focus task search'},{keys:'n',action:'Open a new task form'},{keys:'?',action:'Open keyboard help'},{keys:'Ctrl / ⌘ Z',action:'Undo a workspace change'},{keys:'Ctrl / ⌘ Shift Z',action:'Redo a workspace change'}];
