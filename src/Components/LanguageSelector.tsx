import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';
import { useFloating, useInteractions, useClick, useDismiss, FloatingFocusManager, offset, flip, shift } from '@floating-ui/react';
import { clsx } from 'clsx';

const languages = [
  { 
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/w40/us.png',
    flagAlt: 'USA flag',
    label: 'English (US)'
  },
  { 
    code: 'pt',
    name: 'Português',
    flag: 'https://flagcdn.com/w40/br.png',
    flagAlt: 'Brazil flag',
    label: 'Português (BR)'
  },
  { 
    code: 'es',
    name: 'Español',
    flag: 'https://flagcdn.com/w40/es.png',
    flagAlt: 'Spain flag',
    label: 'Español'
  },
  { 
    code: 'it',
    name: 'Italiano',
    flag: 'https://flagcdn.com/w40/it.png',
    flagAlt: 'Italy flag',
    label: 'Italiano'
  }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(4),
      flip(),
      shift()
    ]
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setIsOpen(false);
  };

  const handleKeyPress = useCallback((e: React.KeyboardEvent, lang: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageChange(lang);
    }
  }, []);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-gray-700 dark:text-gray-300',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'transition-colors duration-200'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Languages className="w-5 h-5" aria-hidden="true" />
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.flagAlt}
          className="w-5 h-4 object-cover rounded"
          loading="lazy"
        />
        <span className="text-sm font-medium hidden sm:inline-block">
          {currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={clsx(
              'z-50 min-w-[200px]',
              'bg-white dark:bg-gray-800',
              'border border-gray-200 dark:border-gray-700',
              'rounded-lg shadow-lg',
              'py-1'
            )}
            role="listbox"
            aria-label="Available languages"
            tabIndex={-1}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                onKeyPress={(e) => handleKeyPress(e, lang.code)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2',
                  'text-sm text-left',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'transition-colors duration-200'
                )}
                role="option"
                aria-selected={i18n.language === lang.code}
                tabIndex={0}
              >
                <img
                  src={lang.flag}
                  alt={lang.flagAlt}
                  className="w-5 h-4 object-cover rounded"
                  loading="lazy"
                />
                <span className="flex-1 font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}