import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGridColumns } from './useGridColumns';

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
}

describe('useGridColumns', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    setViewportWidth(originalInnerWidth);
  });

  it('returns 6 columns on a 2XL screen at the default font size', () => {
    setViewportWidth(1600);
    const { result } = renderHook(() => useGridColumns());
    expect(result.current).toBe(6);
  });

  it('returns 1 column on the smallest screens', () => {
    setViewportWidth(400);
    const { result } = renderHook(() => useGridColumns());
    expect(result.current).toBe(1);
  });

  it('recomputes the column count on window resize', () => {
    setViewportWidth(1600);
    const { result } = renderHook(() => useGridColumns());
    expect(result.current).toBe(6);

    act(() => {
      setViewportWidth(400);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(1);
  });
});
