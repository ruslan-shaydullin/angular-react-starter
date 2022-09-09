import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import {previewCsv} from '../../workshop/shared/csv-import';import {importSnapshot} from '../../workshop/shared/snapshot-import';
@Component({selector:'workshop-import',templateUrl:'./Import.component.html'})
export class ImportComponent { constructor(public s:WorkshopStore) {}

text='';mode='csv';preview:{ok:boolean;errors:string[];count:number;revision:number}|null=null;
inspect():void{const result=this.mode==='csv'?previewCsv(this.s.state,this.text):importSnapshot(this.text,this.s.state);this.preview={ok:result.ok,errors:result.errors,count:result.ok?(Array.isArray(result.value)?result.value.length:result.value.tasks.length):0,revision:this.s.state.revision};}
apply():void{if(this.s.dispatch(this.mode==='csv'?'csv.import':'snapshot.import',{text:this.text})){this.text='';this.preview=null;}}

}
