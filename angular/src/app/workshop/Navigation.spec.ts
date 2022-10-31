import { setup, settle, button, control, change } from './test-helpers';

describe('Workspace navigation', () => {
  it('follows hash changes and marks the current navigation link', async () => {
    const { fixture, element } = await setup();
    window.history.replaceState(null, '', '#/team');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle(fixture);
    expect(element.textContent).toContain('People and responsibilities');
    expect(element.querySelector('nav [aria-current="page"]')?.textContent).toBe('Team');
  });
  it('restores query filters and displays unknown task recovery', async () => {
    const { fixture, element, store } = await setup('#/tasks?projectId=portal&status=doing');
    expect(store.filters.projectId).toBe('portal');
    expect(element.textContent).toContain('Showing 1–1 of 1 tasks');
    store.navigate('tasks', 'missing');
    await settle(fixture);
    expect(element.textContent).toContain('Task not found');
    expect(button(element, 'Back to tasks')).toBeTruthy();
  });
});

describe('Navigation state preservation', () => {
  it('retains project filters after the delayed hash event', async () => {
    const { fixture, element, store } = await setup('#/projects');
    button(element, 'View project tasks').click();
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle(fixture);
    expect(store.filters.projectId).toBe('platform');
    expect(element.textContent).toContain('Showing 1–6 of 6 tasks');
  });
  it('skip link keeps the current route', async () => {
    const { fixture, element, store } = await setup('#/tasks');
    (element.querySelector('.skip-link') as HTMLAnchorElement).click();
    await settle(fixture);
    expect(store.route.page).toBe('tasks');
    expect(window.location.hash).toBe('#/tasks');
  });
});

describe('Filter context', () => {
  it('retains the current query across route-only navigation', async () => {
    const { fixture, element, store } = await setup();
    change(control(element, 'Search tasks'), 'rollback');
    await settle(fixture);
    window.history.replaceState(null, '', '#/settings');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle(fixture);
    expect(store.filters.text).toBe('rollback');
    window.history.replaceState(null, '', '#/tasks');
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await settle(fixture);
    expect(control(element, 'Search tasks').value).toBe('rollback');
  });
});
