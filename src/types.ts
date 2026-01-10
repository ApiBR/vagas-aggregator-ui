export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string;
  url: string;
  html_url?: string;
  created_at: string;
  updated_at: string;
  comments: number;
  keywords: string[];
  user: {
    id: number;
    login: string;
    url: string;
    avatar_url: string;
    name?: string;
  };
  labels: {
    name: string;
    type: string;
    color: string;
  }[];
  repository: {
    id: number;
    name: string;
    full_name: string;
    description: string;
    url: string;
    subscribers: number;
    stargazers: number;
    organization: {
      id: number;
      login: string;
      url: string;
      avatar_url: string;
      type: string;
    };
    issues: number;
    authors: Record<string, boolean>;
    mostRecent: number;
    leastRecent: number;
  };
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  url: string;
  issues_count: number;
}

export interface FilterOptions {
  searchQuery: string;
  selectedRepo: string;
  selectedLabel: string;
  selectedCreator: string;
  itemsPerPage: number;
  currentPage: number;
  selectedRepos?: string[];
  selectedLabels?: string[];
  selectedAuthors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description: string | null;
  issues_count: number;
}

export interface Author {
  id: number;
  login: string;
  name?: string;
  url: string;
  avatar_url: string;
  bio?: string;
  followers?: number;
  issues: number;
  lastIssue_at: string;
  repositories: Array<{
    id: number;
    name: string;
    full_name: string;
    description: string;
    url: string;
    organization: {
      login: string;
      avatar_url: string;
    };
  }>;
}