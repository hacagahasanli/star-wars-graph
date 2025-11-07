import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createLocalStoragePersister } from "~/shared/lib/utils/StorageUtils";

import type { HOC } from "./types/HOC";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const persister = createLocalStoragePersister();

const withReactQuery: HOC = (Component) => (props) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return (
              query.state.status === "success" && query.state.data !== undefined
            );
          },
        },
      }}
    >
      <Component {...props} />
    </PersistQueryClientProvider>
  );
};

export default withReactQuery;
