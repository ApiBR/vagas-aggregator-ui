import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Vagas alert", () => {
  window.history.pushState({}, '', '/ui/vagas')
  render(<App />);
  const vagasElement = screen.getByText(/Vagas:/i);
  expect(vagasElement).toBeInTheDocument();
});

test("renders Repositórios alert", () => {
  window.history.pushState({}, '', '/ui/vagas/repositorios')
  render(<App />);
  const vagasElement = screen.getByText(/Repositórios:/i);
  expect(vagasElement).toBeInTheDocument();
});

test("renders Recrutadores alert", () => {
  window.history.pushState({}, '', '/ui/vagas/recrutadores')
  render(<App />);
  const vagasElement = screen.getByText(/Recrutadores:/i);
  expect(vagasElement).toBeInTheDocument();
});

test("renders Nova vaga alert", () => {
  window.history.pushState({}, '', '/ui/vagas/nova-vaga')
  render(<App />);
  const vagasElement = screen.getByText(/nova vaga/i);
  expect(vagasElement).toBeInTheDocument();
});

test("renders footer", () => {
  window.history.pushState({}, '', '/ui/vagas/')
  render(<App />);
  const vagasElement = screen.getByText(/Desenvolvido por/i);
  expect(vagasElement).toBeInTheDocument();
});
