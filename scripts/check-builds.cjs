const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const root = path.resolve(__dirname, '..');
for (const [app, directory] of [
  ['angular', 'angular/dist/angular-starter'],
  ['react', 'react/build']
]) {
  const folder = path.join(root, directory);
  const index = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
  assert.match(index, /<html[^>]*lang="en"/);
  const assets = [...index.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)].map(
    (match) => match[1]
  );
  assert.ok(assets.length > 0, app + ' has no linked assets');
  let total = 0;
  for (const asset of assets) {
    const file = path.join(folder, asset.replace(/^\//, ''));
    assert.ok(fs.existsSync(file), 'Missing ' + asset);
    total += fs.statSync(file).size;
  }
  assert.ok(total < 1100000, app + ' exceeds the 1.1 MB initial linked asset check');
  console.log(
    `${app}: ${assets.length} linked assets, ${total} bytes, English document language verified.`
  );
}
