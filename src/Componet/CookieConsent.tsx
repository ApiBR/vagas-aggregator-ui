import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = React.useState(() => {
    return !localStorage.getItem('cookieConsent');
  });

  if (!isVisible) return null;

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Cookie className="w-6 h-6 text-primary" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('cookies.message')}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAccept}
              className="btn-primary px-6 py-2 rounded-md text-sm font-medium"
            >
              {t('cookies.accept')}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}