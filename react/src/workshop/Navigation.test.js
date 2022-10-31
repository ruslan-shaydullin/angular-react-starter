import { screen } from '@testing-library/react';
import { renderWorkshop, changeRoute } from './testHelpers';

test('hash routes expose distinct workspace views and current links', () => {
  renderWorkshop();
  changeRoute('#/team');
  expect(screen.getByRole('heading', { name: 'People and responsibilities' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Team' })).toHaveAttribute('aria-current', 'page');
  changeRoute('#/releases');
  expect(screen.getByRole('heading', { name: 'Release readiness' })).toBeInTheDocument();
});
test('task query links restore filters and unknown task ids have a recovery action', () => {
  renderWorkshop('#/tasks?projectId=portal&status=doing');
  expect(screen.getByRole('combobox', { name: 'Project' })).toHaveValue('portal');
  expect(screen.getByText('Showing 1–1 of 1 tasks')).toBeInTheDocument();
  changeRoute('#/tasks/missing');
  expect(screen.getByRole('heading', { name: 'Task not found' })).toBeInTheDocument();
});

test('project links preserve their filters after the hash event', async () => {
  const { user } = renderWorkshop('#/projects');
  await user.click(screen.getAllByRole('button', { name: 'View project tasks' })[0]);
  changeRoute(window.location.hash);
  expect(screen.getByRole('combobox', { name: 'Project' })).toHaveValue('platform');
  expect(screen.getByText('Showing 1–6 of 6 tasks')).toBeInTheDocument();
});
test('skip link focuses the main landmark without changing route', async () => {
  const { user } = renderWorkshop('#/tasks');
  await user.click(screen.getByRole('link', { name: 'Skip to workspace' }));
  expect(screen.getByRole('main')).toHaveFocus();
  expect(window.location.hash).toBe('#/tasks');
});

test('route-only navigation preserves filters used by CSV export', async () => {
  const { user } = renderWorkshop();
  await user.type(screen.getByRole('searchbox'), 'rollback');
  changeRoute('#/settings');
  changeRoute('#/tasks');
  expect(screen.getByRole('searchbox')).toHaveValue('rollback');
  expect(screen.getByText('Showing 1–1 of 1 tasks')).toBeInTheDocument();
});
