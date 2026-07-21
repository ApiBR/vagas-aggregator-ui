import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { IssuesPage } from './IssuesPage';
import * as utils from '../utils';
import type { GitHubIssue } from '../types';

function makeIssue(overrides: Partial<GitHubIssue> = {}): GitHubIssue {
  return {
    id: 1,
    number: 1,
    title: 'Fix the thing',
    url: 'https://api.github.com/repos/org/repo/issues/1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    comments: 0,
    keywords: [],
    user: { id: 1, login: 'octocat', url: '', avatar_url: '' },
    labels: [],
    repository: {
      id: 1,
      name: 'repo',
      full_name: 'org/repo',
      description: '',
      url: '',
      subscribers: 0,
      stargazers: 0,
      organization: { id: 1, login: 'org', url: '', avatar_url: '', type: 'Organization' },
      issues: 1,
      authors: {},
      mostRecent: 0,
      leastRecent: 0,
    },
    ...overrides,
  };
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <IssuesPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('IssuesPage', () => {
  beforeEach(() => {
    vi.spyOn(utils, 'fetchRepositories').mockResolvedValue({
      data: [],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
    });
    vi.spyOn(utils, 'fetchLabels').mockResolvedValue({
      data: [],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
    });
    vi.spyOn(utils, 'fetchAuthors').mockResolvedValue({
      data: [],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows skeleton placeholders while issues are loading', () => {
    vi.spyOn(utils, 'fetchIssues').mockReturnValue(new Promise(() => {}));
    const { container } = renderPage();
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('renders issue cards once data has loaded', async () => {
    vi.spyOn(utils, 'fetchIssues').mockResolvedValue({
      data: [makeIssue({ title: 'First issue' }), makeIssue({ id: 2, title: 'Second issue' })],
      pagination: { currentPage: 1, totalPages: 1, totalItems: 2, itemsPerPage: 100, recentIssuesCount: 1 },
    });

    renderPage();

    expect(await screen.findByText('First issue')).toBeInTheDocument();
    expect(screen.getByText('Second issue')).toBeInTheDocument();
  });

  it('shows the empty state message when there are no issues', async () => {
    vi.spyOn(utils, 'fetchIssues').mockResolvedValue({
      data: [],
      pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 100, recentIssuesCount: 0 },
    });

    renderPage();

    expect(await screen.findByText('No issues found. Try adjusting your filters.')).toBeInTheDocument();
  });

  it('renders pagination when there is more than one page', async () => {
    vi.spyOn(utils, 'fetchIssues').mockResolvedValue({
      data: [makeIssue()],
      pagination: { currentPage: 1, totalPages: 3, totalItems: 30, itemsPerPage: 10, recentIssuesCount: 1 },
    });

    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Fix the thing')).toBeInTheDocument();
    });
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
