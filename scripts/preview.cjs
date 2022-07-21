const http = require('http');
const fs = require('fs');
const path = require('path');
const app = process.argv[2] || 'angular';
if (!['angular','react'].includes(app)) throw new Error('Choose angular or react.');
const root = path.resolve(__dirname, '..', app, app === 'angular' ? 'dist/angular-starter' : 'build');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
const server = http.createServer((req,res) => {
 if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
 let pathname;
 try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
 const requested=path.resolve(root, '.'+pathname);
 if (!requested.startsWith(root+path.sep) && requested !== root) { res.writeHead(403); res.end(); return; }
 let file=requested;
 if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
  if (path.extname(pathname)) { res.writeHead(404); res.end('Asset not found'); return; }
  file=path.join(root,'index.html');
 }
 if (!fs.existsSync(file)) { res.writeHead(503); res.end('Build the application first.'); return; }
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
 if(req.method==='HEAD') res.end(); else fs.createReadStream(file).pipe(res);
});
server.listen(Number(process.env.PORT || (app==='angular' ? 4200 : 3000)), '127.0.0.1', () => console.log(`Previewing ${app} at http://127.0.0.1:${server.address().port}`));
