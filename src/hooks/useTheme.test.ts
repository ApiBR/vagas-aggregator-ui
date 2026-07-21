import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useTheme } from './useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'high-contrast');
    document.documentElement.style.fontSize = '';
  });

  it('defaults font size to 16 and syncs it to the document', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.fontSize).toBe(16);
    expect(document.documentElement.style.fontSize).toBe('16px');
  });

  it('restores persisted theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('highContrast', 'true');
    localStorage.setItem('fontSize', '20');

    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(true);
    expect(result.current.isHighContrast).toBe(true);
    expect(result.current.fontSize).toBe(20);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
  });

  it('toggleDark flips isDark and updates the document class', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleDark();
    });

    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('increaseFontSize increases up to the maximum of 24', () => {
    // fontSize is only restored from storage when a 'theme' key is also present.
    localStorage.setItem('theme', 'light');
    localStorage.setItem('fontSize', '24');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.increaseFontSize();
    });

    expect(result.current.fontSize).toBe(24);
  });

  it('decreaseFontSize decreases down to the minimum of 12', () => {
    localStorage.setItem('theme', 'light');
    localStorage.setItem('fontSize', '12');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.decreaseFontSize();
    });

    expect(result.current.fontSize).toBe(12);
  });

  it('resetFontSize resets to the default of 16', () => {
    localStorage.setItem('theme', 'light');
    localStorage.setItem('fontSize', '24');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.resetFontSize();
    });

    expect(result.current.fontSize).toBe(16);
  });
});
