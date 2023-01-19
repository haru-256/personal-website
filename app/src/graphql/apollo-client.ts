import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { HttpLink, from } from '@apollo/client'

export default function initApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_CONTENTFUL_ENDPOINT,
  })
  const setAuthorizationLink = setContext((_, previousContext) => {
    const { headers } = previousContext
    return {
      ...previousContext,
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
    }
  })

  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link: from([setAuthorizationLink, httpLink]),
    cache: cache,
  })

  return client
}
