import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';
import { RepositoriesPage } from './RepositoriesPage';
import * as utils from '../utils';

// The page reads several fields (organization, subscribers_count, stargazers_count,
// authors_count, labels, contributors) that the real API returns but that aren't
// declared on the `Repository` type — mock data mirrors the real payload shape.
function makeRepo(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    name: 'repo',
    full_name: 'org/repo',
    description: 'A cool repo',
    url: 'https://github.com/org/repo',
    issues_count: 3,
    organization: { login: 'org', avatar_url: '', url: 'https://github.com/org' },
    subscribers_count: 10,
    stargazers_count: 20,
    authors_count: 4,
    labels: [{ name: 'bug', color: 'ff0000', issues_count: 1 }],
    ...overrides,
  };
}

function renderPage() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <RepositoriesPage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const emptyLabels = {
  data: [],
  links: { first: null, last: null, prev: null, next: null },
  meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
};

describe('RepositoriesPage', () => {
  beforeEach(() => {
    vi.spyOn(utils, 'fetchLabels').mockResolvedValue(emptyLabels);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows skeleton placeholders while repositories are loading', () => {
    vi.spyOn(utils, 'fetchRepositories').mockReturnValue(new Promise(() => {}));
    const { container } = renderPage();
    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('shows the empty state when there are no repositories', async () => {
    vi.spyOn(utils, 'fetchRepositories').mockResolvedValue({
      data: [],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 0, total: 0 },
    });

    renderPage();

    expect(await screen.findByText('No repositories found matching your filters.')).toBeInTheDocument();
  });

  it('renders repository cards with their stats once loaded', async () => {
    vi.spyOn(utils, 'fetchRepositories').mockResolvedValue({
      data: [makeRepo()],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 1, total: 1 },
    });

    renderPage();

    expect(await screen.findByText('org/repo')).toBeInTheDocument();
    expect(screen.getByText('A cool repo')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('filters out repositories without issues when the toggle is enabled', async () => {
    const user = userEvent.setup();
    vi.spyOn(utils, 'fetchRepositories').mockResolvedValue({
      data: [
        makeRepo({ id: 1, full_name: 'org/has-issues', issues_count: 5 }),
        makeRepo({ id: 2, full_name: 'org/no-issues', issues_count: 0 }),
      ],
      links: { first: null, last: null, prev: null, next: null },
      meta: { current_page: 1, from: 1, last_page: 1, links: [], path: '', per_page: 100, to: 2, total: 2 },
    });

    renderPage();

    expect(await screen.findByText('org/has-issues')).toBeInTheDocument();
    expect(screen.getByText('org/no-issues')).toBeInTheDocument();

    await user.click(screen.getByRole('checkbox'));

    expect(screen.getByText('org/has-issues')).toBeInTheDocument();
    expect(screen.queryByText('org/no-issues')).not.toBeInTheDocument();
  });
});
