import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Calendar, List } from 'lucide-react';
import { fetchAuthors, fetchRepositories } from '../utils';
import { SkeletonCard } from '../components/SkeletonCard';
import { UpdateInfo } from '../components/UpdateInfo';
import { ShareButton } from '../components/ShareButton';
import { Filters } from '../components/Filters';
import { Pagination } from '../components/Pagination';
import { useFilterParams } from '../hooks/useFilterParams';
import { useGridColumns } from '../hooks/useGridColumns';
import type { Author } from '../types';

export function AuthorsPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useFilterParams();
  const columns = useGridColumns();
  
  const { data: authorsData, isLoading } = useQuery({
    queryKey: ['authors', filters.currentPage, filters.itemsPerPage],
    queryFn: () => fetchAuthors(filters.currentPage, filters.itemsPerPage),
  });

  const { data: repositoriesData } = useQuery({
    queryKey: ['repositories'],
    queryFn: () => fetchRepositories(1, 100),
  });

  const filteredAuthors = React.useMemo(() => {
    if (!authorsData?.data) return [];
    if (!filters.selectedRepos?.length) return authorsData.data;

    return authorsData.data.filter(author => 
      author.repositories.some(repo => filters.selectedRepos?.includes(repo.full_name))
    );
  }, [authorsData?.data, filters.selectedRepos]);

  const mostRecentActivity = React.useMemo(() => {
    if (!filteredAuthors?.length) return null;
    return filteredAuthors.reduce((latest, author) => {
      const activityDate = new Date(author.lastIssue_at);
      return !latest || activityDate > new Date(latest) ? author.lastIssue_at : latest;
    }, null as string | null);
  }, [filteredAuthors]);

  const gridClasses = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`;

  if (isLoading) {
    return (
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={gridClasses}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} type="author" />
          ))}
        </div>
      </div>
    );
  }

  if (!authorsData?.data || authorsData.data.length === 0) {
    return (
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{t('authors.noAuthors')}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-end mb-6">
        <ShareButton />
      </div>

      <Filters
        repositories={repositoriesData?.data || []}
        labels={[]}
        authors={[]}
        filters={filters}
        onFiltersChange={setFilters}
        showSearch={false}
        showLabels={false}
        showAuthors={false}
      />

      <UpdateInfo
        lastUpdate={new Date().toISOString()}
        totalCount={authorsData.meta.total}
        type="authors"
        mostRecentIssue={mostRecentActivity}
      />

      <div className={`${gridClasses} mb-8`}>
        {filteredAuthors.map((author) => (
          <div key={author.id} className="card rounded-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={author.avatar_url}
                  alt={author.login}
                  className="w-16 h-16 rounded-full ring-2 ring-primary"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {author.name || author.login}
                  </h3>
                  {author.name && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{author.login}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">{author.issues}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('authors.stats.issues')}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">{author.followers || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('authors.stats.followers')}</div>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                {t('authors.lastIssue', {
                  time: formatDistanceToNow(new Date(author.lastIssue_at), { addSuffix: true })
                })}
              </div>

              {author.bio && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{author.bio}</p>
              )}

              {author.repositories && author.repositories.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('authors.activeRepos')}
                  </h4>
                  <div className="space-y-2">
                    {author.repositories.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        {repo.organization && (
                          <img
                            src={repo.organization.avatar_url}
                            alt={repo.organization.login}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {repo.full_name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2">
                <Link
                  to={`/?author=${author.login}`}
                  className="btn-secondary w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium"
                >
                  <List className="w-4 h-4 mr-2" />
                  {t('common.viewIssues')}
                </Link>
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('common.viewProfile')}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {authorsData.meta && (
        <Pagination
          currentPage={filters.currentPage}
          totalPages={Math.ceil(authorsData.meta.total / filters.itemsPerPage)}
          onPageChange={(page) => setFilters({ currentPage: page })}
        />
      )}
    </main>
  );
}