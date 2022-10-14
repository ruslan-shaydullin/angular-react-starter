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
