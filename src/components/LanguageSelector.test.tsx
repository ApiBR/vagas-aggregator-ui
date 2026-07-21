import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18next from '../i18n';
import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector', () => {
  beforeEach(async () => {
    localStorage.clear();
    await i18next.changeLanguage('en');
  });

  it('shows the current language on the trigger button', () => {
    render(<LanguageSelector />);
    expect(screen.getByRole('button', { name: 'Select language' })).toHaveTextContent('English');
  });

  it('opens the language list when the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Select language' }));

    expect(screen.getByRole('listbox', { name: 'Available languages' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Português/ })).toBeInTheDocument();
  });

  it('changes the language, persists it and closes the menu when an option is clicked', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    await user.click(screen.getByRole('button', { name: 'Select language' }));
    await user.click(screen.getByRole('option', { name: /Español/ }));

    expect(i18next.language).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks the active language option as selected', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);

    await user.click(screen.getByRole('button', { name: 'Select language' }));

    expect(screen.getByRole('option', { name: /English/ })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: /Italiano/ })).toHaveAttribute('aria-selected', 'false');
  });
});
