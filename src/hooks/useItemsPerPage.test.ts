import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useItemsPerPage } from './useItemsPerPage';

describe('useItemsPerPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to the given default value when nothing is stored', () => {
    const { result } = renderHook(() => useItemsPerPage(50));
    expect(result.current.itemsPerPage).toBe(50);
  });

  it('reads the initial value from localStorage when present', () => {
    localStorage.setItem('itemsPerPage', '25');
    const { result } = renderHook(() => useItemsPerPage(100));
    expect(result.current.itemsPerPage).toBe(25);
  });

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useItemsPerPage(100));

    act(() => {
      result.current.setItemsPerPage(30);
    });

    expect(result.current.itemsPerPage).toBe(30);
    expect(localStorage.getItem('itemsPerPage')).toBe('30');
  });
});
