import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../i18n';
import { IssueCard } from './IssueCard';
import type { GitHubIssue } from '../types';

function makeIssue(overrides: Partial<GitHubIssue> = {}): GitHubIssue {
  return {
    id: 1,
    number: 42,
    title: 'Fix the thing',
    body: 'Some description',
    url: 'https://api.github.com/repos/org/repo/issues/42',
    html_url: 'https://github.com/org/repo/issues/42',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    comments: 3,
    keywords: [],
    user: {
      id: 1,
      login: 'octocat',
      url: '',
      avatar_url: 'https://example.com/octocat.png',
    },
    labels: [{ name: 'bug', type: 'type', color: 'ff0000' }],
    repository: {
      id: 1,
      name: 'repo',
      full_name: 'org/repo',
      description: '',
      url: '',
      subscribers: 0,
      stargazers: 0,
      organization: {
        id: 1,
        login: 'org',
        url: '',
        avatar_url: 'https://example.com/org.png',
        type: 'Organization',
      },
      issues: 1,
      authors: {},
      mostRecent: 0,
      leastRecent: 0,
    },
    ...overrides,
  };
}

function renderIssue(issue: GitHubIssue) {
  return render(
    <MemoryRouter>
      <IssueCard issue={issue} />
    </MemoryRouter>
  );
}

describe('IssueCard', () => {
  it('renders the title, body, comment count and repository name', () => {
    renderIssue(makeIssue());

    expect(screen.getByText('Fix the thing')).toBeInTheDocument();
    expect(screen.getByText('Some description')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('org/repo')).toBeInTheDocument();
  });

  it('shows a "New" badge for issues created within the last 5 days', () => {
    renderIssue(makeIssue({ created_at: new Date().toISOString() }));
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('does not show a "New" badge for older issues', () => {
    const old = new Date();
    old.setDate(old.getDate() - 30);
    renderIssue(makeIssue({ created_at: old.toISOString(), updated_at: old.toISOString() }));
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });

  it('shows a "Stale" badge when updated more than 120 days ago', () => {
    const old = new Date();
    old.setDate(old.getDate() - 130);
    renderIssue(
      makeIssue({ created_at: old.toISOString(), updated_at: old.toISOString() })
    );
    expect(screen.getByText('Stale')).toBeInTheDocument();
  });

  it('shows a "Stale" badge when a stale label is present regardless of dates', () => {
    // The label itself is also rendered in the label list, so "Stale" appears twice.
    renderIssue(
      makeIssue({ labels: [{ name: 'Stale', type: 'type', color: '000000' }] })
    );
    expect(screen.getAllByText('Stale').length).toBeGreaterThanOrEqual(2);
  });

  it('renders a link to view the issue on GitHub', () => {
    const issue = makeIssue();
    renderIssue(issue);
    const link = screen.getByRole('link', { name: /View on GitHub/i });
    expect(link).toHaveAttribute('href', issue.url);
  });

  it('falls back to the user login when no display name is set', () => {
    renderIssue(makeIssue());
    expect(screen.getByText('octocat')).toBeInTheDocument();
  });
});
