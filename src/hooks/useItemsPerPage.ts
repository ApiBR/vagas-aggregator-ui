import { useState, useEffect } from 'react';

export function useItemsPerPage(defaultValue = 100) {
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = localStorage.getItem('itemsPerPage');
    return saved ? parseInt(saved, 10) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  return {
    itemsPerPage,
    setItemsPerPage
  };
}