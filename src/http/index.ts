'use client';

import BaseService from './base-service';

export type TItemsUsername = {
  avatar_url: string;
  login: string;
  html_url: string;
};

export type TGetGithubUsername = {
  total_count: number;
  incomplete_results: boolean;
  items: TItemsUsername[];
};

export type TGetReposUser = {
  name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  html_url: string;
};

export const getGithubUsername = (
  username: string
): Promise<TGetGithubUsername> => {
  return BaseService({
    method: 'GET',
    path: '/search/users',
    params: {
      q: username,
      per_page: 6,
    },
  }).then((res) => {
    return res;
  });
};

export const getGithubRepo = (username: string): Promise<TGetReposUser> => {
  return BaseService({
    method: 'GET',
    path: `/users/${username}/repos`,
  }).then((res) => {
    return res;
  });
};
