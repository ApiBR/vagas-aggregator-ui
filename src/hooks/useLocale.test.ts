import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import i18next from '../i18n';
import { enUS, es, ptBR } from 'date-fns/locale';
import { useLocale } from './useLocale';

describe('useLocale', () => {
  afterEach(async () => {
    await i18next.changeLanguage('en');
  });

  it('returns the English locale by default', () => {
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(enUS);
  });

  it('returns the matching date-fns locale for the active language', async () => {
    await i18next.changeLanguage('es');
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(es);
  });

  it('maps pt to the pt-BR date-fns locale', async () => {
    await i18next.changeLanguage('pt');
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(ptBR);
  });

  it('falls back to English for an unsupported language', async () => {
    await i18next.changeLanguage('xx');
    const { result } = renderHook(() => useLocale());
    expect(result.current).toBe(enUS);
  });
});
