import React from 'react';
import { Sun, Moon, Contrast, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { 
    isDark, 
    isHighContrast, 
    fontSize,
    toggleDark, 
    toggleContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleDark}
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-warning" />
        ) : (
          <Moon className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <button
        onClick={toggleContrast}
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Toggle high contrast"
      >
        <Contrast className={`w-5 h-5 ${isHighContrast ? 'text-success' : 'text-gray-400'}`} />
      </button>
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-lg">
        <button
          onClick={decreaseFontSize}
          className="p-1 rounded hover:bg-gray-600 transition-colors"
          aria-label="Decrease font size"
        >
          <ZoomOut className="w-4 h-4 text-gray-400" />
        </button>
        <button
          onClick={resetFontSize}
          className="p-1 rounded hover:bg-gray-600 transition-colors"
          aria-label="Reset font size"
          title="Reset font size"
        >
          <RotateCcw className="w-4 h-4 text-gray-400" />
        </button>
        <button
          onClick={increaseFontSize}
          className="p-1 rounded hover:bg-gray-600 transition-colors"
          aria-label="Increase font size"
        >
          <ZoomIn className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-xs text-gray-400 ml-1">{fontSize}px</span>
      </div>
    </div>
  );
}