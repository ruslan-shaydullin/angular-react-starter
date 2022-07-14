const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const targets = process.argv[2] ? [process.argv[2]] : ['angular', 'react'];
for (const target of targets) {
  if (!['angular', 'react'].includes(target)) throw new Error('Choose angular or react.');
  const output = path.join(root, target, 'src/workshop/shared');
  fs.mkdirSync(output, { recursive: true });
  const wanted = new Set();
  for (const name of fs.readdirSync(path.join(root, 'shared')).filter(name => name.endsWith('.ts'))) {
    const source = fs.readFileSync(path.join(root, 'shared', name), 'utf8');
    const outName = target === 'angular' ? name : name.replace(/\.ts$/, '.js');
    const content = target === 'angular' ? source : ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText;
    fs.writeFileSync(path.join(output, outName), content);
    wanted.add(outName);
  }
  for (const name of fs.readdirSync(output)) if (!wanted.has(name)) fs.unlinkSync(path.join(output, name));
  const style = path.join(root, 'shared/workshop.css');
  if (fs.existsSync(style)) fs.copyFileSync(style, path.join(root, target, 'src/workshop/workshop.css'));
  console.log(`Synchronized shared sources for ${target}.`);
}
