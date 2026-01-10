import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Calendar, List } from 'lucide-react';
import { fetchAuthorsByRepo } from '../utils';
import { SkeletonCard } from '../components/SkeletonCard';
import type { Author } from '../types';

export function AuthorDetailsPage() {
  const { t } = useTranslation();
  const { owner = '', repo = '' } = useParams<{ owner: string; repo: string }>();
  const fullName = `${owner}/${repo}`;

  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors', fullName],
    queryFn: () => fetchAuthorsByRepo(owner, repo),
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} type="author" />
          ))}
        </div>
      </div>
    );
  }

  if (!authors || authors.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{t('authors.noAuthorsRepo')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        {t('authors.authorsFor', { repo: fullName })}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author) => (
          <div key={author.id} className="card rounded-lg overflow-hidden h-full flex flex-col">
            <div className="p-6 flex flex-col flex-1">
              {/* Author Header */}
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

              {/* Author Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">{author.issues}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('authors.stats.issues')}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">{author.followers || 0}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('authors.stats.followers')}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-2xl font-bold text-primary">
                    {author.repositories?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('authors.stats.repos')}</div>
                </div>
              </div>

              {/* Last Activity */}
              {author.lastIssue_at && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('authors.lastIssue', {
                    time: formatDate(author.lastIssue_at)
                  })}
                </div>
              )}

              {/* Bio */}
              {author.bio && (
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{author.bio}</p>
              )}

              {/* Repositories */}
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

              {/* Action Buttons */}
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2">
                <Link
                  to={`/?author=${author.login}&repo=${fullName}`}
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
    </div>
  );
}