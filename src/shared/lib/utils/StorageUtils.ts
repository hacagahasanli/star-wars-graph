import { type PersistedClient, type Persister } from "@tanstack/react-query-persist-client";

export function createLocalStoragePersister(): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      try {
        localStorage.setItem("REACT_QUERY_CACHE", JSON.stringify(client));
      } catch (error) {
        console.error("Failed to persist query cache:", error);
      }
    },
    restoreClient: async () => {
      try {
        const cachedData = localStorage.getItem("REACT_QUERY_CACHE");
        if (!cachedData) {
          return undefined;
        }
        return JSON.parse(cachedData) as PersistedClient;
      } catch (error) {
        console.error("Failed to restore query cache:", error);
        return undefined;
      }
    },
    removeClient: async () => {
      try {
        localStorage.removeItem("REACT_QUERY_CACHE");
      } catch (error) {
        console.error("Failed to remove query cache:", error);
      }
    },
  };
}
