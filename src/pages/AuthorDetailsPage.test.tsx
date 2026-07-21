import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { AuthorDetailsPage } from './AuthorDetailsPage';
import * as utils from '../utils';
import type { Author } from '../types';

function makeAuthor(overrides: Partial<Author> = {}): Author {
  return {
    id: 1,
    login: 'octocat',
    url: 'https://github.com/octocat',
    avatar_url: '',
    issues: 5,
    lastIssue_at: new Date().toISOString(),
    repositories: [],
    ...overrides,
  };
}

function renderAt(owner: string, repo: string) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/authors/${owner}/${repo}`]}>
        <Routes>
          <Route path="/authors/:owner/:repo" element={<AuthorDetailsPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('AuthorDetailsPage', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows skeleton placeholders while loading', () => {
    vi.spyOn(utils, 'fetchAuthorsByRepo').mockReturnValue(new Promise(() => {}));
    const { container } = renderAt('org', 'repo');
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows the empty state when the repository has no authors', async () => {
    vi.spyOn(utils, 'fetchAuthorsByRepo').mockResolvedValue([]);
    renderAt('org', 'repo');
    expect(await screen.findByText('No authors found for this repository')).toBeInTheDocument();
  });

  it('renders the repository heading and author cards once loaded', async () => {
    vi.spyOn(utils, 'fetchAuthorsByRepo').mockResolvedValue([makeAuthor({ login: 'octocat', issues: 9 })]);

    renderAt('org', 'repo');

    expect(await screen.findByText('Authors for org/repo')).toBeInTheDocument();
    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('calls fetchAuthorsByRepo with the owner and repo route params', async () => {
    const spy = vi.spyOn(utils, 'fetchAuthorsByRepo').mockResolvedValue([]);
    renderAt('my-org', 'my-repo');

    await screen.findByText('No authors found for this repository');
    expect(spy).toHaveBeenCalledWith('my-org', 'my-repo');
  });
});
