import React from 'react';
import { Filter, List, Search, Tag, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MultiSelect } from './MultiSelect';
import type { Repository, Label, Author, FilterOptions } from '../types';

interface FiltersProps {
  repositories: Repository[];
  labels: Label[];
  authors: Author[];
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  showSearch?: boolean;
  showLabels?: boolean;
  showAuthors?: boolean;
}

export function Filters({
  repositories,
  labels,
  authors,
  filters,
  onFiltersChange,
  showSearch = true,
  showLabels = true,
  showAuthors = true,
}: FiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="card rounded-lg p-6 mb-8 filters-section">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {showSearch && (
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('issues.filters.search')}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                id="search"
                className="input block w-full pl-10 pr-3 py-2 rounded-md text-sm"
                placeholder={t('issues.filters.searchPlaceholder')}
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ searchQuery: e.target.value, currentPage: 1 })}
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="repository" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('issues.filters.repository')}
          </label>
          <MultiSelect
            id="repository"
            icon={<Filter className="w-5 h-5" />}
            options={repositories.map(repo => ({
              value: repo.full_name,
              label: repo.full_name,
              count: repo.issues_count,
              avatar: repo.organization?.avatar_url
            }))}
            value={filters.selectedRepos || []}
            onChange={(values) => onFiltersChange({ selectedRepos: values, currentPage: 1 })}
            placeholder={t('issues.filters.allRepositories')}
            showAvatars
          />
        </div>

        {showLabels && (
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('issues.filters.label')}
            </label>
            <MultiSelect
              id="label"
              icon={<Tag className="w-5 h-5" />}
              options={labels.map(label => ({
                value: label.name,
                label: label.name,
                count: label.issues_count
              }))}
              value={filters.selectedLabels || []}
              onChange={(values) => onFiltersChange({ selectedLabels: values, currentPage: 1 })}
              placeholder={t('issues.filters.allLabels')}
            />
          </div>
        )}

        {showAuthors && (
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('issues.filters.author')}
            </label>
            <MultiSelect
              id="author"
              icon={<User className="w-5 h-5" />}
              options={authors.map(author => ({
                value: author.login,
                label: author.name || author.login,
                count: author.issues,
                avatar: author.avatar_url
              }))}
              value={filters.selectedAuthors || []}
              onChange={(values) => onFiltersChange({ selectedAuthors: values, currentPage: 1 })}
              placeholder={t('issues.filters.allAuthors')}
              showAvatars
            />
          </div>
        )}

        <div>
          <label htmlFor="itemsPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('issues.filters.itemsPerPage')}
          </label>
          <div className="relative">
            <List className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              id="itemsPerPage"
              className="input block w-full pl-10 pr-3 py-2 rounded-md text-sm"
              value={filters.itemsPerPage}
              onChange={(e) => onFiltersChange({ itemsPerPage: Number(e.target.value), currentPage: 1 })}
            >
              {[10, 25, 50, 100].map((count) => (
                <option key={`items-per-page-${count}`} value={count}>
                  {t('issues.filters.perPage', { count })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}