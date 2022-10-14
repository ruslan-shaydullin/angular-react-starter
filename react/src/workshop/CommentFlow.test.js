import { screen } from '@testing-library/react';
import { renderWorkshop, storedWorkspace } from './testHelpers';

test('comments retain literal markup as text and clear only after success', async () => {
  const { user } = renderWorkshop('#/tasks/T-103');
  await user.type(screen.getByLabelText('New comment'), '<b>Review evidence</b>');
  await user.click(screen.getByRole('button', { name: 'Add comment' }));
  expect(screen.getByText('<b>Review evidence</b>')).toBeInTheDocument();
  expect(screen.getByLabelText('New comment')).toHaveValue('');
  expect(storedWorkspace().tasks[2].comments).toHaveLength(1);
});
test('empty comment produces a visible actionable error', async () => {
  const { user } = renderWorkshop('#/tasks/T-103');
  await user.click(screen.getByRole('button', { name: 'Add comment' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Comments must contain');
});
