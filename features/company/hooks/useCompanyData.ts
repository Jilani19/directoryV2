import { useQuery } from '@tanstack/react-query';

export function useCompanyData<T>(slug: string, category: string) {
  return useQuery<T>({
    queryKey: ['companyData', slug, category],
    queryFn: async () => {
      const res = await fetch(`/api/company/${slug}/${category}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${category} data`);
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour on the client
    refetchOnWindowFocus: false,
  });
}
