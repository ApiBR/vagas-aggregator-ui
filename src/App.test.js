import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vagas and Repositórios alerts', () => {
  render(<App />);
  const vagasElement = screen.getByText(/Vagas: 0/i);
  expect(vagasElement).toBeInTheDocument();

  const repositoriosElement = screen.getByText(/Repositórios: 0/i);
  expect(repositoriosElement).toBeInTheDocument();
});
