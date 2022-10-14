import { screen } from '@testing-library/react';
import { renderWorkshop, storedWorkspace } from './testHelpers';

test('undo and redo restore visible task status and persistence', async () => {
  const { user } = renderWorkshop('#/tasks/T-103');
  expect(screen.getByRole('button', { name: 'Undo change' })).toBeDisabled();
  await user.selectOptions(screen.getByLabelText('Task status'), 'doing');
  await user.click(screen.getByRole('button', { name: 'Undo change' }));
  expect(screen.getByLabelText('Task status')).toHaveValue('ready');
  expect(storedWorkspace().tasks[2].status).toBe('ready');
  await user.click(screen.getByRole('button', { name: 'Redo change' }));
  expect(screen.getByLabelText('Task status')).toHaveValue('doing');
});
test('display preferences participate in undo history', async () => {
  const { user } = renderWorkshop('#/settings');
  await user.selectOptions(screen.getByLabelText('Table density'), 'compact');
  await user.click(screen.getByRole('button', { name: 'Undo change' }));
  expect(screen.getByLabelText('Table density')).toHaveValue('comfortable');
});
