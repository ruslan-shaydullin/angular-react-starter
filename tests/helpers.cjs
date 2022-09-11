const assert=require('assert').strict;
const {createWorkspace}=require('../.shared-build/fixtures');
const {execute}=require('../.shared-build/commands');
const now='2022-07-08T12:00:00.000Z';
function freeze(value){if(value&&typeof value==='object'){Object.freeze(value);Object.values(value).forEach(freeze);}return value;}
function apply(state,type,payload){const result=execute(state,{type,payload},now);assert.equal(result.ok,true,result.errors.join('; '));return result.value;}
function reject(state,type,payload,pattern){const before=JSON.stringify(state);const result=execute(state,{type,payload},now);assert.equal(result.ok,false);assert.equal(result.value,state);assert.equal(JSON.stringify(state),before);if(pattern)assert.match(result.errors.join('; '),pattern);return result;}
function test(name,body){body();console.log('  ✓ '+name);}
module.exports={assert,fresh:createWorkspace,now,freeze,apply,reject,test};
