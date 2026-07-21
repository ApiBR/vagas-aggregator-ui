import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { AuthorsPage } from './AuthorsPage';
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

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthorsPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const emptyRepositories = {
  data: [],
  links: { first: null, last: null, prev: null, next: null },
  meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
};

describe('AuthorsPage', () => {
  beforeEach(() => {
    vi.spyOn(utils, 'fetchRepositories').mockResolvedValue(emptyRepositories);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows skeleton placeholders while authors are loading', () => {
    vi.spyOn(utils, 'fetchAuthors').mockReturnValue(new Promise(() => {}));
    const { container } = renderPage();
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows the empty state when there are no authors', async () => {
    vi.spyOn(utils, 'fetchAuthors').mockResolvedValue({
      data: [],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
    });

    renderPage();

    expect(await screen.findByText('No authors found')).toBeInTheDocument();
  });

  it('renders author cards with their stats once loaded', async () => {
    vi.spyOn(utils, 'fetchAuthors').mockResolvedValue({
      data: [makeAuthor({ login: 'octocat', issues: 7 })],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 1, total: 1 },
    });

    renderPage();

    expect(await screen.findByText('octocat')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('filters authors by selected repository from the URL params', async () => {
    vi.spyOn(utils, 'fetchAuthors').mockResolvedValue({
      data: [
        makeAuthor({ id: 1, login: 'in-repo', repositories: [{ id: 1, name: 'r', full_name: 'org/r', description: '', url: '', organization: { login: 'org', avatar_url: '' } }] }),
        makeAuthor({ id: 2, login: 'not-in-repo', repositories: [] }),
      ],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 2, total: 2 },
    });

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/authors?repo=org/r']}>
          <AuthorsPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText('in-repo')).toBeInTheDocument();
    expect(screen.queryByText('not-in-repo')).not.toBeInTheDocument();
  });
});
