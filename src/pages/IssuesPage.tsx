import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { IssueCard } from '../components/IssueCard';
import { Filters } from '../components/Filters';
import { UpdateInfo } from '../components/UpdateInfo';
import { Pagination } from '../components/Pagination';
import { SkeletonCard } from '../components/SkeletonCard';
import { ShareButton } from '../components/ShareButton';
import { useFilterParams } from '../hooks/useFilterParams';
import { useGridColumns } from '../hooks/useGridColumns';
import { fetchIssues, fetchRepositories, fetchLabels, fetchAuthors } from '../utils';

export function IssuesPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useFilterParams();
  const columns = useGridColumns();

  const { data: issuesData, isLoading: isLoadingIssues } = useQuery({
    queryKey: ['issues', filters.currentPage, filters.itemsPerPage, filters.searchQuery, filters.selectedRepos, filters.selectedLabels, filters.selectedAuthors],
    queryFn: () => fetchIssues(
      filters.currentPage,
      filters.itemsPerPage,
      filters.searchQuery,
      filters.selectedRepos,
      filters.selectedLabels,
      filters.selectedAuthors,
    ),
  });

  const { data: repositoriesData } = useQuery({
    queryKey: ['repositories'],
    queryFn: () => fetchRepositories(1, 100),
  });

  const { data: labelsData } = useQuery({
    queryKey: ['labels'],
    queryFn: () => fetchLabels(1, 100),
  });

  const { data: authorsData } = useQuery({
    queryKey: ['authors'],
    queryFn: () => fetchAuthors(1, 100),
  });

  const mostRecentIssue = React.useMemo(() => {
    if (!issuesData?.data?.length) return null;
    return issuesData.data.reduce((latest, issue) => {
      const issueDate = new Date(issue.created_at);
      return !latest || issueDate > new Date(latest) ? issue.created_at : latest;
    }, null as string | null);
  }, [issuesData?.data]);

  const gridClasses = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`;

  return (
    <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-end mb-6">
        <ShareButton />
      </div>

      <Filters
        repositories={repositoriesData?.data || []}
        labels={labelsData?.data || []}
        authors={authorsData?.data || []}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {!isLoadingIssues && issuesData?.data && (
        <UpdateInfo
          lastUpdate={new Date().toISOString()}
          recentIssues={issuesData.pagination.recentIssuesCount}
          mostRecentIssue={mostRecentIssue}
          totalCount={issuesData.pagination.totalItems}
          type="issues"
        />
      )}

      {isLoadingIssues ? (
        <div className={gridClasses}>
          {Array.from({ length: filters.itemsPerPage }).map((_, index) => (
            <SkeletonCard key={index} type="issue" />
          ))}
        </div>
      ) : issuesData?.data && issuesData.data.length > 0 ? (
        <>
          <div className={`${gridClasses} my-8`}>
            {issuesData.data.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
          
          {issuesData.pagination && (
            <Pagination
              currentPage={issuesData.pagination.currentPage}
              totalPages={issuesData.pagination.totalPages}
              onPageChange={(page) => setFilters({ currentPage: page })}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{t('issues.noIssues')}</p>
        </div>
      )}
    </main>
  );
}