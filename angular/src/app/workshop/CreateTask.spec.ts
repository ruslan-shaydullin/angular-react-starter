import { setup, settle, button, control, change } from './test-helpers';

describe('Task creation', () => {
  it('reports invalid fields and persists a corrected draft', async () => {
    const { fixture, element, store } = await setup();
    button(element, 'New task').click();
    await settle(fixture);
    button(element, 'Create task').click();
    await settle(fixture);
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('Title must contain');
    change(control(element, 'Task title'), 'Verify release smoke checks');
    await settle(fixture);
    button(element, 'Create task').click();
    await settle(fixture);
    expect(store.state.tasks.length).toBe(13);
    expect(element.querySelector('[role="status"]')?.textContent).toContain('Task created');
  });
  it('cancel discards draft fields', async () => {
    const { fixture, element, store } = await setup();
    button(element, 'New task').click();
    await settle(fixture);
    change(control(element, 'Task title'), 'Discard me');
    button(element, 'Cancel').click();
    await settle(fixture);
    expect(store.state.tasks.length).toBe(12);
    expect(element.querySelector('workshop-task-editor')).toBeNull();
  });
});
