import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'high-contrast');
  });

  it('shows the moon icon and default font size in light mode', () => {
    render(<ThemeToggle />);
    expect(screen.getByText('16px')).toBeInTheDocument();
    expect(screen.getByLabelText('Toggle dark mode')).toBeInTheDocument();
  });

  it('toggles dark mode when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText('Toggle dark mode'));

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles high contrast when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText('Toggle high contrast'));

    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
  });

  it('increases and decreases the font size', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText('Increase font size'));
    expect(screen.getByText('18px')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Decrease font size'));
    expect(screen.getByText('16px')).toBeInTheDocument();
  });

  it('resets the font size back to the default', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByLabelText('Increase font size'));
    await user.click(screen.getByLabelText('Increase font size'));
    expect(screen.getByText('20px')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Reset font size'));
    expect(screen.getByText('16px')).toBeInTheDocument();
  });
});
