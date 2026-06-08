'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient();
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
