import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Hash, Calendar, Database } from 'lucide-react';
import { format } from 'date-fns';

interface UpdateInfoProps {
  lastUpdate: string;
  recentIssues?: number;
  mostRecentIssue?: string;
  totalCount?: number;
  type?: 'issues' | 'repositories' | 'authors';
}

export function UpdateInfo({ lastUpdate, recentIssues, mostRecentIssue, totalCount, type = 'issues' }: UpdateInfoProps) {
  const { t } = useTranslation();

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 text-sm">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-info/10 text-info rounded-full">
        <Clock className="w-4 h-4" />
        <span>
          {t('issues.updateInfo.lastUpdate')}: {formatDate(lastUpdate)}
        </span>
      </div>

      {totalCount !== undefined && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full">
          <Database className="w-4 h-4" />
          <span>
            {t('issues.updateInfo.total', { count: totalCount, type: t(`common.${type}`) })}
          </span>
        </div>
      )}

      {type === 'issues' && recentIssues !== undefined && recentIssues > 0 && (
        <div 
          className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-full"
          title={t('issues.updateInfo.recentIssuesTitle')}
        >
          <Hash className="w-4 h-4" />
          <span>
            {t('issues.updateInfo.recentIssues', { count: recentIssues })}
          </span>
        </div>
      )}

      {type === 'issues' && mostRecentIssue && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-full">
          <Calendar className="w-4 h-4" />
          <span>
            {t('issues.updateInfo.lastIssue')}: {formatDate(mostRecentIssue)}
          </span>
        </div>
      )}
    </div>
  );
}