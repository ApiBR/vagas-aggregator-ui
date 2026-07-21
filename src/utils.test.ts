import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import i18next from './i18n';
import { fetchRepositories, fetchLabels, fetchAuthors, fetchAuthorsByRepo, fetchIssues, getRepoFromUrl } from './utils';

function mockFetchOnce(body: unknown, headers: Record<string, string> = {}, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    headers: {
      get: (key: string) => headers[key.toLowerCase()] ?? null,
    },
    json: async () => body,
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('getRepoFromUrl', () => {
  it('extracts owner and name from a github api url', () => {
    expect(getRepoFromUrl('https://api.github.com/repos/ApiBR/vagas-aggregator-ui')).toEqual({
      owner: 'ApiBR',
      name: 'vagas-aggregator-ui',
    });
  });

  it('handles urls with a trailing slash by returning an empty name', () => {
    expect(getRepoFromUrl('https://api.github.com/repos/ApiBR/')).toEqual({
      owner: 'ApiBR',
      name: '',
    });
  });
});

describe('utils fetch helpers', () => {
  beforeEach(async () => {
    await i18next.changeLanguage('en');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('fetchRepositories builds pagination info from response headers', async () => {
    const fetchMock = mockFetchOnce([{ id: 1 }], {
      'x-current-page': '2',
      'x-total-results': '42',
      'x-last-page': '5',
    });

    const result = await fetchRepositories(2, 10);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/repositories?page=2&per_page=10&hide_empty=true&lang=en')
    );
    expect(result.data).toEqual([{ id: 1 }]);
    expect(result.meta.current_page).toBe(2);
    expect(result.meta.total).toBe(42);
    expect(result.meta.last_page).toBe(5);
  });

  it('fetchRepositories throws when the response is not ok', async () => {
    mockFetchOnce({}, {}, false);
    await expect(fetchRepositories(1, 10)).rejects.toThrow('Failed to fetch repositories');
  });

  it('fetchLabels throws when the response is not ok', async () => {
    mockFetchOnce({}, {}, false);
    await expect(fetchLabels(1, 10)).rejects.toThrow('Failed to fetch labels');
  });

  it('fetchLabels returns data and meta on success', async () => {
    mockFetchOnce([{ id: 1, name: 'bug' }], { 'x-total-results': '3' });
    const result = await fetchLabels(1, 10);
    expect(result.data).toEqual([{ id: 1, name: 'bug' }]);
    expect(result.meta.total).toBe(3);
  });

  it('fetchAuthors throws when the response is not ok', async () => {
    mockFetchOnce({}, {}, false);
    await expect(fetchAuthors(1, 10)).rejects.toThrow('Failed to fetch authors');
  });

  it('fetchAuthorsByRepo returns raw json data', async () => {
    mockFetchOnce([{ id: 1, login: 'octocat' }]);
    const result = await fetchAuthorsByRepo('ApiBR', 'vagas-aggregator-ui');
    expect(result).toEqual([{ id: 1, login: 'octocat' }]);
  });

  it('fetchAuthorsByRepo throws when the response is not ok', async () => {
    mockFetchOnce({}, {}, false);
    await expect(fetchAuthorsByRepo('ApiBR', 'vagas-aggregator-ui')).rejects.toThrow(
      'Failed to fetch repository authors'
    );
  });

  it('fetchIssues appends optional filters as repeated query params', async () => {
    const fetchMock = mockFetchOnce([], {
      'x-total-results': '7',
      'x-total-pages': '1',
      'x-current-page': '1',
      'x-last-60-days-count': '2',
    });

    const result = await fetchIssues(1, 20, 'react', ['repoA', 'repoB'], ['bug'], ['octocat']);

    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain('term=react');
    expect(calledUrl).toContain('repository=repoA');
    expect(calledUrl).toContain('repository=repoB');
    expect(calledUrl).toContain('label=bug');
    expect(calledUrl).toContain('author=octocat');
    expect(result.pagination).toEqual({
      currentPage: 1,
      totalPages: 1,
      totalItems: 7,
      itemsPerPage: 20,
      recentIssuesCount: 2,
    });
  });

  it('fetchIssues omits optional filters when not provided', async () => {
    const fetchMock = mockFetchOnce([], {});
    await fetchIssues(1, 20);
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).not.toContain('term=');
    expect(calledUrl).not.toContain('repository=');
    expect(calledUrl).not.toContain('label=');
    expect(calledUrl).not.toContain('author=');
  });

  it('fetchIssues throws when the response is not ok', async () => {
    mockFetchOnce({}, {}, false);
    await expect(fetchIssues(1, 20)).rejects.toThrow('Failed to fetch issues');
  });
});
