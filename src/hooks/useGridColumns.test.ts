import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGridColumns, GRID_COLS_CLASSES } from './useGridColumns';

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

describe('GRID_COLS_CLASSES', () => {
  it('spells out every lg:grid-cols-N class literally, for every possible column count', () => {
    // Tailwind's scanner only compiles class names that appear literally in
    // source; a template string like `lg:grid-cols-${columns}` is invisible
    // to it and silently produces no CSS. This locks in that every value
    // useGridColumns() can return has a matching literal class string.
    expect(GRID_COLS_CLASSES[1]).toContain('grid-cols-1');
    expect(GRID_COLS_CLASSES[2]).toContain('sm:grid-cols-2');
    for (let columns = 3; columns <= 6; columns++) {
      expect(GRID_COLS_CLASSES[columns]).toContain(`lg:grid-cols-${columns}`);
    }
  });
});
