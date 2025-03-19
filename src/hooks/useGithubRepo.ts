import { getGithubRepo } from '@/http';
import { useQuery } from '@tanstack/react-query';

export const useGithubRepo = (username: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['githubRepos', username],
    queryFn: async () => {
      const response = await getGithubRepo(username);

      return response;
    },
    enabled: !!username,
  });

  return {
    data,
    isLoading,
  };
};
