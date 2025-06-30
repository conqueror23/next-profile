import type { NextPage } from 'next'
import { useQuery, gql, ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from '../lib/apoloClient';

const GraphQLUI: NextPage = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <>
        <GraphQLQuerySection />
      </>
    </ApolloProvider>
  )
}

const GraphQLQuerySection = () => {

  const HELLO_QUERY = gql`
  query {
      hello
    }
  `
  const { loading, error, data } = useQuery(HELLO_QUERY);
  console.log("fetching error", error)
  console.log("data", data)
  return (
    <>
      <h1> GraphqlQuery Section</h1>
      <p>
        {data?.hello}
      </p>

    </>
  )


}

export default GraphQLUI
