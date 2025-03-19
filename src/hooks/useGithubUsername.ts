'use client';

import { getGithubUsername } from '@/http';
import { useQuery } from '@tanstack/react-query';

export const useGithubUsername = (debouncedUsername: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['githubUsername', debouncedUsername],
    queryFn: async () => {
      const res = await getGithubUsername(debouncedUsername);

      return res.items;
    },
    enabled: !!debouncedUsername,
  });

  return {
    data,
    isLoading,
  };
};
