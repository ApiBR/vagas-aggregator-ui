import React from 'react';

interface SkeletonCardProps {
  type: 'issue' | 'repository' | 'author';
}

export function SkeletonCard({ type }: SkeletonCardProps) {
  if (type === 'issue') {
    return (
      <div className="card rounded-lg animate-pulse">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
            <div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>

          {/* Dates */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>

          {/* Title and Content */}
          <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4" />
          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>

          {/* Labels */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-16 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full" />
                <div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
              </div>
              <div className="w-28 h-8 bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'repository') {
    return (
      <div className="card rounded-lg animate-pulse">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full" />
            <div className="flex-1">
              <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>

          {/* Labels */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-16 h-6 bg-gray-200 dark:bg-gray-600 rounded-full" />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-24 h-8 bg-gray-200 dark:bg-gray-600 rounded" />
            ))}
          </div>

          {/* Contributors */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full ring-2 ring-white dark:ring-gray-800" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Author card skeleton
  return (
    <div className="card rounded-lg animate-pulse">
      <div className="p-6">
        {/* Author Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full" />
          <div>
            <div className="w-40 h-6 bg-gray-200 dark:bg-gray-600 rounded mb-2" />
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded mx-auto mb-1" />
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Last Activity */}
        <div className="w-48 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-4" />

        {/* Bio */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2">
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded" />
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>
      </div>
    </div>
  );
}