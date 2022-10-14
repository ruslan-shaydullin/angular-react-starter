import { screen } from '@testing-library/react';
import { renderWorkshop } from './testHelpers';

test('adds acceptance work and toggles completion by its accessible label', async () => {
  const { user } = renderWorkshop('#/tasks/T-103');
  await user.type(screen.getByLabelText('New checklist item'), 'Review empty queue chart');
  await user.click(screen.getByRole('button', { name: 'Add item' }));
  const checkbox = screen.getByRole('checkbox', { name: 'Review empty queue chart' });
  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(screen.getByLabelText('New checklist item')).toHaveValue('');
});
test('completed work explains disabled checklist editing', () => {
  renderWorkshop('#/tasks/T-106');
  expect(screen.getByRole('checkbox', { name: 'Acceptance criteria reviewed' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Add item' })).toBeDisabled();
});
