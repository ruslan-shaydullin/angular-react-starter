import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {HostListener} from '@angular/core';import {keyboardCommand,SHORTCUTS} from '../../workshop/shared/keyboard';
@Component({selector:'workshop-keyboard-help',templateUrl:'./KeyboardHelp.component.html'})
export class KeyboardHelpComponent { constructor(public s:WorkshopStore) {}

shortcuts=SHORTCUTS;@HostListener('window:keydown',['$event']) onKey(event:KeyboardEvent):void{const target=event.target as HTMLElement;const command=keyboardCommand({key:event.key,ctrlKey:event.ctrlKey,metaKey:event.metaKey,shiftKey:event.shiftKey,altKey:event.altKey,targetTag:target.tagName,contentEditable:target.isContentEditable});if(!command)return;if(command==='search'){this.s.navigate('tasks');setTimeout(()=>document.getElementById('task-search')?.focus(),0);}if(command==='new'){this.s.navigate('tasks');this.s.editing=true;}if(command==='help')this.s.help=!this.s.help;if(command==='undo')this.s.undo();if(command==='redo')this.s.redo();event.preventDefault();}

}
