import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePagination, DOTS } from '../hooks/usePagination';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalPagesCount: totalPages,
    siblingCount
  });

  if (currentPage === 0 || totalPages === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  let dotsCounter = 0;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className={clsx(
          'p-2 rounded-md border dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'text-gray-600 dark:text-gray-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex space-x-1">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <span
                key={`dots-${dotsCounter++}`}
                className="px-4 py-2 text-gray-600 dark:text-gray-400"
              >
                &#8230;
              </span>
            );
          }

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber as number)}
              className={clsx(
                'px-4 py-2 rounded-md transition-colors duration-200',
                currentPage === pageNumber
                  ? 'bg-primary text-white'
                  : 'border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === lastPage}
        className={clsx(
          'p-2 rounded-md border dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'text-gray-600 dark:text-gray-400',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}