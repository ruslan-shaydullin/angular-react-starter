const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
execFileSync(
  process.execPath,
  [require.resolve('typescript/bin/tsc'), '-p', 'shared/tsconfig.json'],
  { cwd: root, stdio: 'inherit' }
);
const files = fs.existsSync(path.join(root, 'tests'))
  ? fs
      .readdirSync(path.join(root, 'tests'))
      .filter((name) => name.endsWith('.test.cjs'))
      .sort()
  : [];
for (const file of files)
  execFileSync(process.execPath, [path.join(root, 'tests', file)], { cwd: root, stdio: 'inherit' });
console.log(`Shared contracts: ${files.length} suites passed.`);
