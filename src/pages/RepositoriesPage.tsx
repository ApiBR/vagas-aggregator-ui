import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Filter, Tag, Users, Star, Eye, Plus, List, Group } from 'lucide-react';
import { fetchRepositories, fetchLabels } from '../utils';
import { SkeletonCard } from '../components/SkeletonCard';
import { UpdateInfo } from '../components/UpdateInfo';
import { MultiSelect } from '../components/MultiSelect';
import { ShareButton } from '../components/ShareButton';
import { useGridColumns } from '../hooks/useGridColumns';

interface Filters {
  hasIssues: boolean;
  selectedLabels: string[];
}

export function RepositoriesPage() {
  const { t } = useTranslation();
  const columns = useGridColumns();
  const [filters, setFilters] = useState<Filters>({
    hasIssues: false,
    selectedLabels: [],
  });

  const { data: repositories, isLoading: isLoadingRepos } = useQuery({
    queryKey: ['repositories', 1, 100],
    queryFn: () => fetchRepositories(1, 100),
  });

  const { data: labelsData } = useQuery({
    queryKey: ['labels', 1, 100],
    queryFn: () => fetchLabels(1, 100),
  });

  const filteredRepositories = React.useMemo(() => {
    if (!repositories?.data) return [];
    
    return repositories.data.filter((repo) => {
      if (filters.hasIssues && repo.issues_count === 0) {
        return false;
      }

      if (filters.selectedLabels.length > 0) {
        const repoLabels = repo.labels?.map(label => label.name) || [];
        const hasMatchingLabel = filters.selectedLabels.some(selectedLabel => 
          repoLabels.includes(selectedLabel)
        );
        if (!hasMatchingLabel) return false;
      }

      return true;
    });
  }, [repositories?.data, filters]);

  const mostRecentUpdate = React.useMemo(() => {
    if (!repositories?.data?.length) return null;
    return repositories.data.reduce((latest, repo) => {
      const repoDate = new Date(repo.mostRecent || 0);
      return !latest || repoDate > new Date(latest) ? repo.mostRecent : latest;
    }, null as string | null);
  }, [repositories?.data]);

  const gridClasses = `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} gap-4`;

  return (
    <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-end mb-6">
        <ShareButton />
      </div>

      <div className="card rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('repositories.filters.filterRepos')}
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <label className="relative inline-flex items-center pl-10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasIssues}
                  onChange={(e) => setFilters(prev => ({ ...prev, hasIssues: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm text-gray-700 dark:text-gray-300">
                  {t('repositories.filters.showOnlyWithVacancies')}
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('repositories.filters.filterByLabels')}
            </label>
            <MultiSelect
              icon={<Tag className="w-5 h-5" />}
              options={repositories?.data?.flatMap(repo => repo.labels || [])
                .filter((label, index, self) => 
                  index === self.findIndex(l => l.name === label.name)
                )
                .map(label => ({
                  value: label.name,
                  label: label.name,
                  count: label.issues_count
                })) || []}
              value={filters.selectedLabels}
              onChange={(values) => setFilters(prev => ({ ...prev, selectedLabels: values }))}
              placeholder={t('issues.filters.allLabels')}
            />
          </div>
        </div>
      </div>

      {!isLoadingRepos && repositories?.data && (
        <UpdateInfo
          lastUpdate={new Date().toISOString()}
          totalCount={repositories.meta.total}
          type="repositories"
          mostRecentIssue={mostRecentUpdate}
        />
      )}

      {isLoadingRepos ? (
        <div className={gridClasses}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} type="repository" />
          ))}
        </div>
      ) : filteredRepositories.length > 0 ? (
        <div className={gridClasses}>
          {filteredRepositories.map((repo) => (
            <div key={repo.id} className="card rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <a
                    href={repo.organization?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    <img
                      src={repo.organization?.avatar_url}
                      alt={repo.organization?.login}
                      className="w-12 h-12 rounded-full ring-2 ring-primary"
                    />
                  </a>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {repo.full_name}
                      </a>
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center" title={t('repositories.stats.watchers')}>
                        <Eye className="w-4 h-4 mr-1" />
                        {repo.subscribers_count || 0}
                      </span>
                      <span className="flex items-center" title={t('repositories.stats.stars')}>
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count || 0}
                      </span>
                      <span className="flex items-center" title={t('repositories.stats.authors')}>
                        <Users className="w-4 h-4 mr-1" />
                        {repo.authors_count || 0}
                      </span>
                      <span className="flex items-center" title={t('repositories.stats.openIssues')}>
                        <List className="w-4 h-4 mr-1" />
                        {repo.issues_count}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {repo.description || t('repositories.noDescription')}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.labels?.map((label, index) => (
                    <span
                      key={`${label.name}-${index}`}
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `#${label.color}`,
                        color: parseInt(label.color, 16) > 0xffffff / 2 ? '#000' : '#fff',
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <a
                    href={`${repo.url}/issues/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('repositories.actions.newIssue')}
                  </a>
                  <Link
                    to="/"
                    className="btn-secondary inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                  >
                    <List className="w-4 h-4 mr-1" />
                    {t('repositories.actions.viewIssues')}
                  </Link>
                  <Link
                    to={`/authors/${repo.full_name}`}
                    className="btn-secondary inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                  >
                    <Group className="w-4 h-4 mr-1" />
                    {t('repositories.actions.viewAuthors')}
                  </Link>
                </div>

                {repo.contributors && repo.contributors.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('repositories.contributors')}
                    </h4>
                    <div className="flex -space-x-2 overflow-hidden">
                      {repo.contributors.map((contributor) => (
                        <Link
                          key={contributor.id}
                          to={`/authors/${repo.full_name}`}
                          className="relative inline-block"
                        >
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                            title={contributor.login}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">{t('repositories.noRepositories')}</p>
        </div>
      )}
    </main>
  );
}