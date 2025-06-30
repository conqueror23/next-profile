import { ApolloClient, InMemoryCache } from '@apollo/client';


const APPOLO_SERVER_URL = 'http://localhost:5051/api/graphql'
const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  uri: APPOLO_SERVER_URL,
  cache,
  credentials: 'same-origin',
  headers: {
    authorization: 'test ' || '',
  },
});
