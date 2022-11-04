import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vagas alert', () => {
  render(<App />);
  const vagasElement = screen.getByText(/Vagas: 0/i);
  expect(vagasElement).toBeInTheDocument();
});
