import { screen } from '@testing-library/react';
import { renderWorkshop, storedWorkspace } from './testHelpers';

test('invalid forms retain user input and valid creation persists', async () => {
  const { user } = renderWorkshop();
  await user.click(screen.getByRole('button', { name: 'New task', exact: true }));
  await user.click(screen.getByRole('button', { name: 'Create task' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Title must contain');
  await user.type(screen.getByLabelText('Task title'), 'Verify the release smoke checks');
  await user.click(screen.getByRole('button', { name: 'Create task' }));
  expect(screen.queryByLabelText('Task title')).not.toBeInTheDocument();
  expect(storedWorkspace().tasks).toHaveLength(13);
  expect(screen.getByRole('status')).toHaveTextContent('Task created');
});
test('canceling a draft does not create a task', async () => {
  const { user } = renderWorkshop();
  await user.click(screen.getByRole('button', { name: 'New task', exact: true }));
  await user.type(screen.getByLabelText('Task title'), 'Discard this draft');
  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.getByText('Showing 1–6 of 12 tasks')).toBeInTheDocument();
});
