const { assert, fresh, now, freeze, apply, reject, test } = require('./helpers.cjs');

test('project names are unique ignoring case', () => {
  reject(
    fresh(),
    'project.save',
    { values: { name: 'PLATFORM RELIABILITY', description: 'Duplicate', color: '#123456' } },
    /already/
  );
});
test('project colors cannot inject CSS syntax', () => {
  reject(fresh(), 'project.save', {
    values: { name: 'New project', description: '', color: 'red;display:none' }
  });
});
test('new member must have a role and bounded capacity', () => {
  reject(fresh(), 'member.add', { name: 'New Person', role: '', capacity: 10 });
  reject(fresh(), 'member.add', { name: 'MAYA CHEN', role: 'Engineer', capacity: 10 });
  const next = apply(fresh(), 'member.add', {
    name: 'Elena Ruiz',
    role: 'Quality engineer',
    capacity: 12
  });
  assert.equal(next.members[3].name, 'Elena Ruiz');
  assert.equal(next.members[3].capacity, 12);
});
test('existing project edits preserve identity', () => {
  const state = apply(fresh(), 'project.save', {
    id: 'platform',
    values: { name: 'Core platform', description: 'Reliable systems', color: '#215b9a' }
  });
  assert.equal(state.projects.length, 2);
  assert.equal(state.projects[0].id, 'platform');
});
