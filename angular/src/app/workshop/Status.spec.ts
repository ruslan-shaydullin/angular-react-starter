import { setup, settle, button, control, change } from './test-helpers';

describe('Status transitions', () => {
  it('requires reviewed acceptance criteria before completion', async () => {
    const { fixture, element, store } = await setup('#/tasks/T-101');
    change(control(element, 'Task status'), 'done');
    await settle(fixture);
    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      'Complete every checklist'
    );
    expect(store.state.tasks[0].status).toBe('review');
    expect(control(element, 'Task status').value).toBe('review');
    (control(element, 'Acceptance criteria reviewed') as HTMLInputElement).click();
    await settle(fixture);
    change(control(element, 'Task status'), 'done');
    await settle(fixture);
    expect(store.state.tasks[0].status).toBe('done');
  });
  it('reports incomplete dependencies', async () => {
    const { fixture, element } = await setup('#/tasks/T-102');
    change(control(element, 'Task status'), 'done');
    await settle(fixture);
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('Complete dependencies');
  });
});
