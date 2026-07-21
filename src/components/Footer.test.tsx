import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../i18n';
import { Footer } from './Footer';

function mockFetch(headers: Record<string, string> = {}) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
    })
  );
}

describe('Footer', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the developer credit and external links', () => {
    mockFetch();
    render(<Footer />);

    expect(screen.getByText('Guilherme Branco Stracini')).toBeInTheDocument();
    expect(screen.getByText('Report Problem').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/ApiBR/vagas-aggregator-ui/issues/new/choose'
    );
    expect(screen.getByText('Repository').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/ApiBR/vagas-aggregator-ui'
    );
  });

  it('does not show API version info before it has loaded', () => {
    mockFetch();
    render(<Footer />);
    expect(screen.queryByText(/API Version/)).not.toBeInTheDocument();
  });

  it('shows the API version and last-updated date once useApiInfo resolves', async () => {
    mockFetch({ 'x-api-version': '3.1.0', 'x-api-date': '2026-02-01' });
    render(<Footer />);

    await waitFor(() => {
      expect(screen.getByText(/API Version: 3\.1\.0/)).toBeInTheDocument();
    });
    expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
  });

  it('opens the new issue modal when "Create New Issue" is clicked', async () => {
    mockFetch();
    const user = userEvent.setup();
    render(<Footer />);

    expect(screen.queryByText('How to Create a New Issue')).not.toBeInTheDocument();

    await user.click(screen.getByText('Create New Issue'));

    expect(screen.getByText('How to Create a New Issue')).toBeInTheDocument();
  });
});
