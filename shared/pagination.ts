export interface Page<T> {items:T[];page:number;pageCount:number;total:number;start:number;end:number;hasPrevious:boolean;hasNext:boolean;}
export function paginate<T>(items:readonly T[],requestedPage:number,pageSize:number):Page<T> {
 const size=Number.isFinite(pageSize)?Math.max(1,Math.min(100,Math.trunc(pageSize))):10;
 const pageCount=Math.max(1,Math.ceil(items.length/size));
 const page=Number.isFinite(requestedPage)?Math.max(1,Math.min(pageCount,Math.trunc(requestedPage))):1;
 const offset=(page-1)*size;
 return {items:items.slice(offset,offset+size),page,pageCount,total:items.length,start:items.length?offset+1:0,end:Math.min(offset+size,items.length),hasPrevious:page>1,hasNext:page<pageCount};
}
export function pageNumbers(page:number,count:number):number[] {const start=Math.max(1,Math.min(page-2,count-4));return Array.from({length:Math.min(5,count)},(_,index)=>start+index);}
