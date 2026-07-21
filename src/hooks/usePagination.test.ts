import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePagination, DOTS } from './usePagination';

describe('usePagination', () => {
  it('returns all pages when total pages fit within the visible range', () => {
    const { result } = renderHook(() => usePagination({ totalPagesCount: 5, currentPage: 1 }));
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  it('shows right dots when current page is near the start', () => {
    const { result } = renderHook(() => usePagination({ totalPagesCount: 20, currentPage: 1 }));
    expect(result.current[result.current.length - 2]).toBe(DOTS);
    expect(result.current[result.current.length - 1]).toBe(20);
    expect(result.current[0]).toBe(1);
  });

  it('shows left dots when current page is near the end', () => {
    const { result } = renderHook(() => usePagination({ totalPagesCount: 20, currentPage: 20 }));
    expect(result.current[0]).toBe(1);
    expect(result.current[1]).toBe(DOTS);
    expect(result.current[result.current.length - 1]).toBe(20);
  });

  it('shows dots on both sides when current page is in the middle', () => {
    const { result } = renderHook(() => usePagination({ totalPagesCount: 20, currentPage: 10 }));
    expect(result.current[0]).toBe(1);
    expect(result.current[1]).toBe(DOTS);
    expect(result.current[result.current.length - 2]).toBe(DOTS);
    expect(result.current[result.current.length - 1]).toBe(20);
    expect(result.current).toContain(10);
  });

  it('respects a custom siblingCount', () => {
    const { result } = renderHook(() =>
      usePagination({ totalPagesCount: 20, currentPage: 10, siblingCount: 2 })
    );
    expect(result.current).toContain(8);
    expect(result.current).toContain(12);
  });
});
