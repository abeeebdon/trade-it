'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});
export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const invalidateQueries = async (queryKey: QueryKey) => {
  return queryClient.invalidateQueries({ queryKey });
};
