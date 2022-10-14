const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const assert = require('assert').strict;
const root = path.resolve(__dirname, '..');
for (const name of fs
  .readdirSync(path.join(root, 'shared'))
  .filter((name) => name.endsWith('.ts'))) {
  const source = fs.readFileSync(path.join(root, 'shared', name), 'utf8');
  assert.equal(
    fs.readFileSync(path.join(root, 'angular/src/workshop/shared', name), 'utf8'),
    source,
    'Angular shared source differs: ' + name
  );
  const javascript = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext }
  }).outputText;
  assert.equal(
    fs.readFileSync(
      path.join(root, 'react/src/workshop/shared', name.replace(/\.ts$/, '.js')),
      'utf8'
    ),
    javascript,
    'React generated source differs: ' + name
  );
}
for (const app of ['angular', 'react'])
  assert.equal(
    fs.readFileSync(path.join(root, app, 'src/workshop/workshop.css'), 'utf8'),
    fs.readFileSync(path.join(root, 'shared/workshop.css'), 'utf8'),
    app + ' shared styles differ'
  );
console.log('Both framework adapters use the canonical shared source and stylesheet.');
