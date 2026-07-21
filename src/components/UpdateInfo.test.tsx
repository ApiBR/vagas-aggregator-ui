import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import '../i18n';
import { UpdateInfo } from './UpdateInfo';

describe('UpdateInfo', () => {
  it('renders the last update date formatted', () => {
    const lastUpdate = '2026-01-15T10:30:00.000Z';
    render(<UpdateInfo lastUpdate={lastUpdate} />);

    const expected = format(new Date(lastUpdate), 'dd/MM/yyyy HH:mm');
    expect(screen.getByText(`Last updated: ${expected}`)).toBeInTheDocument();
  });

  it('renders the total count badge when totalCount is provided', () => {
    render(<UpdateInfo lastUpdate="2026-01-15T10:30:00.000Z" totalCount={42} type="issues" />);
    expect(screen.getByText('Total 42 issues')).toBeInTheDocument();
  });

  it('omits the total count badge when totalCount is undefined', () => {
    render(<UpdateInfo lastUpdate="2026-01-15T10:30:00.000Z" />);
    expect(screen.queryByText(/^Total/)).not.toBeInTheDocument();
  });

  it('shows the recent issues badge only when type is issues and recentIssues > 0', () => {
    render(
      <UpdateInfo lastUpdate="2026-01-15T10:30:00.000Z" type="issues" recentIssues={3} />
    );
    // Note: en.json's "_plural" suffix is the legacy i18next v3 format and is not
    // applied by this project's i18next version, so the singular string is used
    // regardless of count.
    expect(screen.getByText('3 recent issue')).toBeInTheDocument();
  });

  it('hides the recent issues badge when recentIssues is 0', () => {
    render(
      <UpdateInfo lastUpdate="2026-01-15T10:30:00.000Z" type="issues" recentIssues={0} />
    );
    expect(screen.queryByText(/recent issue/)).not.toBeInTheDocument();
  });

  it('hides the recent issues and last issue badges when type is not issues', () => {
    render(
      <UpdateInfo
        lastUpdate="2026-01-15T10:30:00.000Z"
        type="repositories"
        recentIssues={5}
        mostRecentIssue="2026-01-10T00:00:00.000Z"
      />
    );
    expect(screen.queryByText(/recent issue/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Last issue published/)).not.toBeInTheDocument();
  });

  it('renders the most recent issue badge when type is issues and mostRecentIssue is set', () => {
    const mostRecentIssue = '2026-01-10T08:00:00.000Z';
    render(
      <UpdateInfo
        lastUpdate="2026-01-15T10:30:00.000Z"
        type="issues"
        mostRecentIssue={mostRecentIssue}
      />
    );
    const expected = format(new Date(mostRecentIssue), 'dd/MM/yyyy HH:mm');
    expect(screen.getByText(`Last issue published: ${expected}`)).toBeInTheDocument();
  });
});
