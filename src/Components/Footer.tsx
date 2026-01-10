import React, { useState } from 'react';
import { Github, Info, Plus, AlertCircle, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApiInfo } from '../hooks/useApiInfo';
import { NewIssueModal } from './NewIssueModal';

export function Footer() {
  const { t } = useTranslation();
  const { version, date } = useApiInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
            <div className="flex items-center space-x-2">
              <a
                href="https://guibranco.github.io/?utm_campaign=project&utm_media=vagas+aggregator&utm_source=apibr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <img
                  alt="Guilherme Branco Stracini"
                  className="rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                  loading="lazy"
                  src="https://guibranco.github.io/photo.png"
                  width="40"
                  height="40"
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {t('footer.developedBy')}
                  </span>
                  <span className="font-medium">
                    Guilherme Branco Stracini
                  </span>
                </div>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('footer.createIssue.button')}</span>
              </button>

              <a
                href="https://github.com/ApiBR/vagas-aggregator-ui/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
              >
                <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('footer.reportIssue')}</span>
              </a>

              <a
                href="https://stats.uptimerobot.com/O7lYOCOP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
              >
                <Activity className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('footer.status')}</span>
              </a>

              <a
                href="https://github.com/ApiBR/vagas-aggregator-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{t('footer.repository')}</span>
              </a>
            </div>
          </div>

          {(version || date) && (
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Info className="w-4 h-4" />
              <span>API Version: {version}</span>
              {date && (
                <>
                  <span className="mx-2">•</span>
                  <span>Last Updated: {new Date(date).toLocaleDateString()}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <NewIssueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}