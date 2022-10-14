import { screen } from '@testing-library/react';
import { renderWorkshop } from './testHelpers';

test('search narrows the table and clear restores pagination', async () => {
  const { user } = renderWorkshop();
  await user.type(screen.getByRole('searchbox'), 'queue');
  expect(screen.getByRole('button', { name: 'Add queue depth dashboard' })).toBeInTheDocument();
  expect(screen.getByText('Showing 1–1 of 1 tasks')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /Clear filters/ }));
  expect(screen.getByText('Showing 1–6 of 12 tasks')).toBeInTheDocument();
});
test('empty search results include a recovery action', async () => {
  const { user } = renderWorkshop();
  await user.type(screen.getByRole('searchbox'), 'no matching release work');
  expect(screen.getByText(/No tasks match these filters/)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
});
