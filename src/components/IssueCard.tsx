import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, differenceInDays } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Calendar, RefreshCcw, ExternalLink } from 'lucide-react';
import { useLocale } from '../hooks/useLocale';
import type { GitHubIssue } from '../types';

interface IssueCardProps {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { t } = useTranslation();
  const locale = useLocale();

  const isNew = differenceInDays(new Date(), new Date(issue.created_at)) <= 5;
  const isStale = issue.labels.some(label => 
    label.name.toLowerCase() === 'stale' || 
    label.name.toLowerCase() === 'no activity'
  ) || differenceInDays(new Date(), new Date(issue.updated_at)) > 120;

  return (
    <div className="card rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Link 
              to={`/repositories`}
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <img
                src={issue.repository.organization.avatar_url}
                alt={issue.repository.organization.login}
                className="w-6 h-6 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {issue.repository.full_name}
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-gray-500 text-sm">
              <MessageSquare className="w-4 h-4 mr-1" />
              {issue.comments}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {t('common.dates.created')}: {t('common.dates.timeAgo', { 
              time: formatDistanceToNow(new Date(issue.created_at), { locale }) 
            })}
          </span>
          <span className="flex items-center">
            <RefreshCcw className="w-4 h-4 mr-1" />
            {t('common.dates.updated')}: {t('common.dates.timeAgo', { 
              time: formatDistanceToNow(new Date(issue.updated_at), { locale }) 
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {isNew && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
              {t('issues.badges.new')}
            </span>
          )}
          {isStale && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
              {t('issues.badges.stale')}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{issue.title}</h3>
        {issue.body && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{issue.body}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {issue.labels.map((label, index) => (
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

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <Link
              to={`/authors/${issue.repository.full_name}`}
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                className="w-8 h-8 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {issue.user.name || issue.user.login}
              </span>
            </Link>
            <a
              href={issue.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center px-4 py-2 rounded-md text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('common.viewOnGitHub')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}