import { useTheme } from './useTheme';
import { useCallback, useEffect, useState } from 'react';

// Tailwind's scanner only generates CSS for class names that appear literally
// in source — `lg:grid-cols-${columns}` is invisible to it, so those classes
// never get compiled and the grid silently stays capped at sm:grid-cols-2.
// Keying off this map keeps every literal class name visible to the scanner.
export const GRID_COLS_CLASSES: Record<number, string> = {
  1: 'grid grid-cols-1 gap-4',
  2: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
  5: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4',
  6: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4',
};

export function useGridColumns() {
  const { fontSize } = useTheme();

  const getColumnCount = useCallback(() => {
    const width = window.innerWidth;

    // Base number of columns on viewport width and font size
    if (width >= 1536) { // 2XL screens
      return fontSize <= 16 ? 6 :
             fontSize <= 18 ? 5 :
             fontSize <= 20 ? 4 : 3;
    }
    if (width >= 1280) { // XL screens
      return fontSize <= 16 ? 5 :
             fontSize <= 18 ? 4 : 3;
    }
    if (width >= 1024) { // LG screens
      return fontSize <= 16 ? 4 :
             fontSize <= 18 ? 3 : 2;
    }
    if (width >= 768) { // MD screens
      return fontSize <= 16 ? 3 : 2;
    }
    if (width >= 640) { // SM screens
      return 2;
    }
    return 1; // XS screens
  }, [fontSize]);

  const [columns, setColumns] = useState(getColumnCount);

  useEffect(() => {
    function handleResize() {
      setColumns(getColumnCount());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getColumnCount]);

  return columns;
}