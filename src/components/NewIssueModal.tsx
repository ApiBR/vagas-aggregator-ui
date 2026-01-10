import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

interface NewIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewIssueModal({ isOpen, onClose }: NewIssueModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="px-4 pb-4 pt-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                {t('footer.createIssue.title')}
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('footer.createIssue.description')}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}