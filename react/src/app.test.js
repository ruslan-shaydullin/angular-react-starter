import { render, screen } from '@testing-library/react';
import App from './app';
test('exposes a named workspace and main landmark', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Release workshop' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
});
