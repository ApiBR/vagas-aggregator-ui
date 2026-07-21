import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../i18n';
import { Filters } from './Filters';
import type { FilterOptions } from '../types';

const repositories = [
  { id: 1, name: 'repo-a', full_name: 'org/repo-a', description: '', url: '', issues_count: 5 },
];
const labels = [
  { id: 1, name: 'bug', color: 'ff0000', description: null, issues_count: 2 },
];
const authors = [
  {
    id: 1,
    login: 'octocat',
    url: '',
    avatar_url: '',
    issues: 4,
    lastIssue_at: '',
    repositories: [],
  },
];

const baseFilters: FilterOptions = {
  searchQuery: '',
  selectedRepo: '',
  selectedLabel: '',
  selectedCreator: '',
  itemsPerPage: 10,
  currentPage: 1,
  selectedRepos: [],
  selectedLabels: [],
  selectedAuthors: [],
};

describe('Filters', () => {
  it('renders the search, repository, label, author and items-per-page controls by default', () => {
    render(
      <Filters
        repositories={repositories}
        labels={labels}
        authors={authors}
        filters={baseFilters}
        onFiltersChange={() => {}}
      />
    );

    // The Repository/Label/Author MultiSelect controls don't wire up their id
    // to the <label>, so they aren't reachable via getByLabelText — assert on
    // the label text and each MultiSelect's placeholder instead.
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByText('Repository')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('All Repositories')).toBeInTheDocument();
    expect(screen.getByText('All Labels')).toBeInTheDocument();
    expect(screen.getByText('All Authors')).toBeInTheDocument();
    expect(screen.getByLabelText('Items per page')).toBeInTheDocument();
  });

  it('hides search, labels and authors when the matching show* props are false', () => {
    render(
      <Filters
        repositories={repositories}
        labels={labels}
        authors={authors}
        filters={baseFilters}
        onFiltersChange={() => {}}
        showSearch={false}
        showLabels={false}
        showAuthors={false}
      />
    );

    expect(screen.queryByLabelText('Search')).not.toBeInTheDocument();
    expect(screen.queryByText('Label')).not.toBeInTheDocument();
    expect(screen.queryByText('Author')).not.toBeInTheDocument();
    expect(screen.getByText('Repository')).toBeInTheDocument();
  });

  it('calls onFiltersChange with the typed query and resets the page to 1', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    render(
      <Filters
        repositories={repositories}
        labels={labels}
        authors={authors}
        filters={{ ...baseFilters, currentPage: 3 }}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.type(screen.getByLabelText('Search'), 'x');

    expect(onFiltersChange).toHaveBeenCalledWith({ searchQuery: 'x', currentPage: 1 });
  });

  it('calls onFiltersChange with the selected items-per-page value', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    render(
      <Filters
        repositories={repositories}
        labels={labels}
        authors={authors}
        filters={baseFilters}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.selectOptions(screen.getByLabelText('Items per page'), '50');

    expect(onFiltersChange).toHaveBeenCalledWith({ itemsPerPage: 50, currentPage: 1 });
  });
});
