import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../i18n';
import { CookieConsent } from './CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the consent banner when no consent is stored', () => {
    render(<CookieConsent />);
    expect(
      screen.getByText(/We use cookies to enhance your experience/)
    ).toBeInTheDocument();
  });

  it('does not render when consent was previously accepted', () => {
    localStorage.setItem('cookieConsent', 'true');
    const { container } = render(<CookieConsent />);
    expect(container).toBeEmptyDOMElement();
  });

  it('persists consent and hides the banner when Accept is clicked', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByRole('button', { name: 'Accept' }));

    expect(localStorage.getItem('cookieConsent')).toBe('true');
    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });

  it('hides the banner without persisting consent when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await user.click(screen.getByLabelText('Close'));

    expect(localStorage.getItem('cookieConsent')).toBeNull();
    expect(screen.queryByText(/We use cookies/)).not.toBeInTheDocument();
  });
});
