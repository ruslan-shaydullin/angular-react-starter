const {assert,fresh,now,freeze,apply,reject,test}=require('./helpers.cjs');
const {paginate,pageNumbers}=require('../.shared-build/pagination');

test('empty lists retain a navigable first page',()=>{assert.deepEqual(paginate([],99,6),{items:[],page:1,pageCount:1,total:0,start:0,end:0,hasPrevious:false,hasNext:false});});
test('clamps stale page after filters shrink result set',()=>{const result=paginate([1,2,3],10,2);assert.deepEqual(result.items,[3]);assert.equal(result.page,2);assert.equal(result.start,3);assert.equal(result.end,3);});
test('sanitizes invalid paging inputs',()=>{assert.equal(paginate([1,2,3],NaN,NaN).page,1);assert.equal(paginate([1,2,3],-1,0).items.length,1);assert.equal(paginate(Array.from({length:200},(_,i)=>i),1,1000).items.length,100);});
test('page windows stay within total page count',()=>{assert.deepEqual(pageNumbers(10,10),[6,7,8,9,10]);assert.deepEqual(pageNumbers(1,3),[1,2,3]);});
