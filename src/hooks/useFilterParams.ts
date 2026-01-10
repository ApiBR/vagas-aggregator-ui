import { useSearchParams } from 'react-router-dom';
import type { FilterOptions } from '../types';

export function useFilterParams(): [FilterOptions, (filters: Partial<FilterOptions>) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterOptions = {
    searchQuery: searchParams.get('q') || '',
    selectedRepos: searchParams.getAll('repo'),
    selectedLabels: searchParams.getAll('label'),
    selectedAuthors: searchParams.getAll('author'),
    itemsPerPage: parseInt(searchParams.get('per_page') || '100', 10),
    currentPage: parseInt(searchParams.get('page') || '1', 10),
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedParams = new URLSearchParams(searchParams);

    // Handle search query
    if (newFilters.searchQuery !== undefined) {
      if (newFilters.searchQuery) {
        updatedParams.set('q', newFilters.searchQuery);
      } else {
        updatedParams.delete('q');
      }
    }

    // Handle repositories
    if (newFilters.selectedRepos !== undefined) {
      updatedParams.delete('repo');
      newFilters.selectedRepos.forEach(repo => {
        updatedParams.append('repo', repo);
      });
    }

    // Handle labels
    if (newFilters.selectedLabels !== undefined) {
      updatedParams.delete('label');
      newFilters.selectedLabels.forEach(label => {
        updatedParams.append('label', label);
      });
    }

    // Handle authors
    if (newFilters.selectedAuthors !== undefined) {
      updatedParams.delete('author');
      newFilters.selectedAuthors.forEach(author => {
        updatedParams.append('author', author);
      });
    }

    // Handle items per page
    if (newFilters.itemsPerPage !== undefined) {
      updatedParams.set('per_page', newFilters.itemsPerPage.toString());
    }

    // Handle current page
    if (newFilters.currentPage !== undefined) {
      if (newFilters.currentPage > 1) {
        updatedParams.set('page', newFilters.currentPage.toString());
      } else {
        updatedParams.delete('page');
      }
    }

    setSearchParams(updatedParams);
  };

  return [filters, updateFilters];
}