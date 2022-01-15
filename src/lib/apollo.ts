import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache: cache,
  uri: "/api/graphql",

  name: "foosball-my-dudes",
  version: "1.1.0",
  ssrMode: typeof window === "undefined",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
