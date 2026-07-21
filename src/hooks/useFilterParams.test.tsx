import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useFilterParams } from './useFilterParams';

function wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter initialEntries={['/?q=react&repo=a&repo=b&page=3']}>{children}</MemoryRouter>;
}

describe('useFilterParams', () => {
  it('parses filters from the current URL search params', () => {
    const { result } = renderHook(() => useFilterParams(), { wrapper });
    const [filters] = result.current;

    expect(filters.searchQuery).toBe('react');
    expect(filters.selectedRepos).toEqual(['a', 'b']);
    expect(filters.currentPage).toBe(3);
    expect(filters.itemsPerPage).toBe(100);
  });

  it('defaults to empty filters when no params are present', () => {
    const { result } = renderHook(() => useFilterParams(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
      ),
    });
    const [filters] = result.current;

    expect(filters.searchQuery).toBe('');
    expect(filters.selectedRepos).toEqual([]);
    expect(filters.currentPage).toBe(1);
  });

  it('updateFilters sets and clears the search query param', () => {
    const { result } = renderHook(() => useFilterParams(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
      ),
    });

    act(() => {
      result.current[1]({ searchQuery: 'node' });
    });
    expect(result.current[0].searchQuery).toBe('node');

    act(() => {
      result.current[1]({ searchQuery: '' });
    });
    expect(result.current[0].searchQuery).toBe('');
  });

  it('updateFilters omits the page param when currentPage is 1', () => {
    const { result } = renderHook(() => useFilterParams(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={['/?page=5']}>{children}</MemoryRouter>
      ),
    });

    act(() => {
      result.current[1]({ currentPage: 1 });
    });
    expect(result.current[0].currentPage).toBe(1);
  });

  it('updateFilters replaces repeated repo params', () => {
    const { result } = renderHook(() => useFilterParams(), { wrapper });

    act(() => {
      result.current[1]({ selectedRepos: ['c'] });
    });

    expect(result.current[0].selectedRepos).toEqual(['c']);
  });
});
