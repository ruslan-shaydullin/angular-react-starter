import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app';
import { STORAGE_KEY } from './shared/persistence';
export function renderWorkshop(hash = '#/tasks') {
  window.localStorage.clear();
  window.history.replaceState(null, '', hash);
  const view = render(<App />);
  return { ...view, user: userEvent.setup() };
}
export function storedWorkspace() {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY)).workspace;
}
export function changeRoute(hash) {
  window.history.replaceState(null, '', hash);
  fireEvent(window, new HashChangeEvent('hashchange'));
}
export async function openTask(user, title) {
  await user.type(screen.getByRole('searchbox'), title);
  await user.click(screen.getByRole('button', { name: title, exact: true }));
}
