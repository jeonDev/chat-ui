import { render, screen } from '@testing-library/react';
import App from './App';

test('renders auth screen', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /대화 시작/i })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: '로그인' })[1]).toHaveAttribute('type', 'submit');
  expect(screen.getByRole('button', { name: '회원가입' })).toBeInTheDocument();
});
