import { setup, settle, button, control, change } from './test-helpers';

describe('Acceptance checklist', () => {
  it('adds and completes an item while retaining stable identifiers', async () => {
    const { fixture, element, store } = await setup('#/tasks/T-103');
    change(control(element, 'New checklist item'), 'Review empty queue chart');
    await settle(fixture);
    button(element, 'Add item').click();
    await settle(fixture);
    expect(store.state.tasks[2].checklist.length).toBe(2);
    const checkbox = control(element, 'Review empty queue chart') as HTMLInputElement;
    checkbox.click();
    await settle(fixture);
    expect(store.state.tasks[2].checklist[1].done).toBeTrue();
    expect(control(element, 'New checklist item').value).toBe('');
  });
  it('disables checklist changes on done work', async () => {
    const { element } = await setup('#/tasks/T-106');
    expect(
      (control(element, 'Acceptance criteria reviewed') as HTMLInputElement).disabled
    ).toBeTrue();
    expect(button(element, 'Add item').disabled).toBeTrue();
  });
});
