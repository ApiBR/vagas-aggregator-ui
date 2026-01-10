import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ShareButtonProps {
  className?: string;
}

export function ShareButton({ className }: ShareButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: url
        });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="share-button">
      <button
        onClick={handleShare}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${className}`}
        title={t('common.shareFilters')}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            {t('common.copied')}
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            {t('common.share')}
          </>
        )}
      </button>
    </div>
  );
}