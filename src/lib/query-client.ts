import { QueryClient } from '@tanstack/react-query';

/**
 * App-wide React Query client with mobile-friendly defaults.
 *
 * To add offline cache persistence later:
 *   npx expo install @tanstack/react-query-persist-client @tanstack/query-async-storage-persister
 * then wrap the provider with <PersistQueryClientProvider> using AsyncStorage.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min — avoid refetch storms on every focus
      gcTime: 1000 * 60 * 30,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
