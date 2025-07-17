import { ApolloClient, InMemoryCache } from '@apollo/client';

const APOLLO_SERVER_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:5051/api/graphql';
const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  uri: APOLLO_SERVER_URL,
  cache,
  credentials: 'same-origin',
  headers: {
    authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN || '',
  },
});
