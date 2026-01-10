import { useTheme } from './useTheme';
import { useEffect, useState } from 'react';

export function useGridColumns() {
  const { fontSize } = useTheme();
  const [columns, setColumns] = useState(getColumnCount());

  function getColumnCount() {
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
  }

  useEffect(() => {
    function handleResize() {
      setColumns(getColumnCount());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fontSize]);

  return columns;
}