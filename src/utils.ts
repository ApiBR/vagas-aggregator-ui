import type { Repository, PaginatedResponse, GitHubIssue, Label, Author } from './types';
import i18next from 'i18next';

const API_BASE_URL = 'https://apibr.com/vagas/api/v2';

function getLanguageParam(): string {
  return `lang=${i18next.language}`;
}

export async function fetchRepositories(page: number, perPage: number): Promise<PaginatedResponse<Repository>> {
  const response = await fetch(
    `${API_BASE_URL}/repositories?page=${page}&per_page=${perPage}&hide_empty=true&${getLanguageParam()}`
  );
  if (!response.ok) throw new Error('Failed to fetch repositories');
  const data = await response.json();
  return {
    data,
    links: {
      first: response.headers.get('link-first'),
      last: response.headers.get('link-last'),
      prev: response.headers.get('link-prev'),
      next: response.headers.get('link-next'),
    },
    meta: {
      current_page: parseInt(response.headers.get('x-current-page') || '1', 10),
      from: parseInt(response.headers.get('x-from') || '1', 10),
      last_page: parseInt(response.headers.get('x-last-page') || '1', 10),
      links: [],
      path: response.headers.get('x-path') || '',
      per_page: parseInt(response.headers.get('x-per-page') || perPage.toString(), 10),
      to: parseInt(response.headers.get('x-to') || '1', 10),
      total: parseInt(response.headers.get('x-total-results') || '0', 10),
    },
  };
}

export async function fetchLabels(page: number, perPage: number): Promise<PaginatedResponse<Label>> {
  const response = await fetch(
    `${API_BASE_URL}/labels?page=${page}&per_page=${perPage}&${getLanguageParam()}`
  );
  if (!response.ok) throw new Error('Failed to fetch labels');
  const data = await response.json();
  return {
    data,
    links: {
      first: response.headers.get('link-first'),
      last: response.headers.get('link-last'),
      prev: response.headers.get('link-prev'),
      next: response.headers.get('link-next'),
    },
    meta: {
      current_page: parseInt(response.headers.get('x-current-page') || '1', 10),
      from: parseInt(response.headers.get('x-from') || '1', 10),
      last_page: parseInt(response.headers.get('x-last-page') || '1', 10),
      links: [],
      path: response.headers.get('x-path') || '',
      per_page: parseInt(response.headers.get('x-per-page') || perPage.toString(), 10),
      to: parseInt(response.headers.get('x-to') || '1', 10),
      total: parseInt(response.headers.get('x-total-results') || '0', 10),
    },
  };
}

export async function fetchAuthors(page: number, perPage: number): Promise<PaginatedResponse<Author>> {
  const response = await fetch(
    `${API_BASE_URL}/authors?page=${page}&per_page=${perPage}&${getLanguageParam()}`
  );
  if (!response.ok) throw new Error('Failed to fetch authors');
  const data = await response.json();
  return {
    data,
    links: {
      first: response.headers.get('link-first'),
      last: response.headers.get('link-last'),
      prev: response.headers.get('link-prev'),
      next: response.headers.get('link-next'),
    },
    meta: {
      current_page: parseInt(response.headers.get('x-current-page') || '1', 10),
      from: parseInt(response.headers.get('x-from') || '1', 10),
      last_page: parseInt(response.headers.get('x-last-page') || '1', 10),
      links: [],
      path: response.headers.get('x-path') || '',
      per_page: parseInt(response.headers.get('x-per-page') || perPage.toString(), 10),
      to: parseInt(response.headers.get('x-to') || '1', 10),
      total: parseInt(response.headers.get('x-total-results') || '0', 10),
    },
  };
}

export async function fetchAuthorsByRepo(owner: string, repo: string): Promise<Author[]> {
  const response = await fetch(`${API_BASE_URL}/authors/${owner}/${repo}?${getLanguageParam()}`);
  if (!response.ok) throw new Error('Failed to fetch repository authors');
  const data = await response.json();
  return data;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  recentIssuesCount: number;
}

export async function fetchIssues(
  page: number,
  perPage: number,
  term?: string,
  repositories?: string[],
  labels?: string[],
  authors?: string[],
): Promise<{ data: GitHubIssue[]; pagination: PaginationInfo }> {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (term) {
    params.append('term', term);
  }

  if (repositories?.length) {
    repositories.forEach(repo => params.append('repository', repo));
  }

  if (labels?.length) {
    labels.forEach(label => params.append('label', label));
  }

  if (authors?.length) {
    authors.forEach(author => params.append('author', author));
  }

  // Add language parameter
  params.append('lang', i18next.language);

  const response = await fetch(`${API_BASE_URL}/issues?${params}`);
  if (!response.ok) throw new Error('Failed to fetch issues');
  
  const data = await response.json();
  
  // Extract pagination info from headers
  const totalItems = parseInt(response.headers.get('x-total-results') || '0', 10);
  const totalPages = parseInt(response.headers.get('x-total-pages') || '1', 10);
  const currentPage = parseInt(response.headers.get('x-current-page') || '1', 10);
  const recentIssuesCount = parseInt(response.headers.get('x-last-60-days-count') || '0', 10);

  return {
    data,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: perPage,
      recentIssuesCount
    }
  };
}

export function getRepoFromUrl(url: string): { owner: string; name: string } {
  const parts = url.split('/');
  return {
    owner: parts[parts.length - 2],
    name: parts[parts.length - 1],
  };
}