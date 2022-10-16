const {execFileSync}=require('child_process');const path=require('path');const root=path.resolve(__dirname,'..');
const npm=process.platform==='win32'?'npm.cmd':'npm';
const steps=[['root',['run','check']],['root',['test']],['root',['run','shared']],['root',['run','parity']],['react',['test','--','--runInBand']],['angular',['run','test:ci']],['react',['run','build']],['angular',['run','build']]];
for(const [app,args] of steps){console.log(`\nVerifying ${app}: npm ${args.join(' ')}`);execFileSync(npm,args,{cwd:app==='root'?root:path.join(root,app),stdio:'inherit',env:{...process.env,CI:'true'}});}
console.log('Shared contracts, component scenarios, parity, and both production builds passed.');
