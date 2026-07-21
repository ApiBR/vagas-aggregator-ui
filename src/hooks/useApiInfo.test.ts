import { describe, it, expect, vi, afterEach } from 'vitest';
import { waitFor, renderHook } from '@testing-library/react';
import { useApiInfo } from './useApiInfo';

describe('useApiInfo', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('reads the api version and date from response headers', async () => {
    const headers: Record<string, string> = {
      'x-api-version': '2.3.1',
      'x-api-date': '2026-01-01',
    };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        headers: { get: (key: string) => headers[key.toLowerCase()] ?? null },
      })
    );

    const { result } = renderHook(() => useApiInfo());

    await waitFor(() => {
      expect(result.current.version).toBe('2.3.1');
    });
    expect(result.current.date).toBe('2026-01-01');
  });

  it('leaves version and date null when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network error')));
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useApiInfo());

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
    expect(result.current.version).toBeNull();
    expect(result.current.date).toBeNull();
  });
});
