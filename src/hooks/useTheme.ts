import { useState, useEffect } from 'react';

interface ThemeState {
  isDark: boolean;
  isHighContrast: boolean;
  fontSize: number;
}

const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 16;

export function useTheme() {
  const [theme, setTheme] = useState<ThemeState>(() => {
    const saved = localStorage.getItem('theme');
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || DEFAULT_FONT_SIZE.toString(), 10);
    
    if (saved) {
      return {
        isDark: saved === 'dark',
        isHighContrast: savedHighContrast,
        fontSize: savedFontSize
      };
    }
    return {
      isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
      isHighContrast: window.matchMedia('(prefers-contrast: more)').matches,
      fontSize: DEFAULT_FONT_SIZE
    };
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme.isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    if (theme.isHighContrast) {
      root.classList.add('high-contrast');
      localStorage.setItem('highContrast', 'true');
    } else {
      root.classList.remove('high-contrast');
      localStorage.setItem('highContrast', 'false');
    }

    root.style.fontSize = `${theme.fontSize}px`;
    localStorage.setItem('fontSize', theme.fontSize.toString());
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(prev => ({ ...prev, isDark: e.matches }));
      }
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('highContrast')) {
        setTheme(prev => ({ ...prev, isHighContrast: e.matches }));
      }
    };

    darkModeQuery.addEventListener('change', handleDarkModeChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const increaseFontSize = () => {
    setTheme(prev => ({
      ...prev,
      fontSize: Math.min(prev.fontSize + 2, MAX_FONT_SIZE)
    }));
  };

  const decreaseFontSize = () => {
    setTheme(prev => ({
      ...prev,
      fontSize: Math.max(prev.fontSize - 2, MIN_FONT_SIZE)
    }));
  };

  const resetFontSize = () => {
    setTheme(prev => ({
      ...prev,
      fontSize: DEFAULT_FONT_SIZE
    }));
  };

  return {
    ...theme,
    toggleDark: () => setTheme(prev => ({ ...prev, isDark: !prev.isDark })),
    toggleContrast: () => setTheme(prev => ({ ...prev, isHighContrast: !prev.isHighContrast })),
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  };
}