import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { createUploadLink } from "apollo-upload-client"
import { setContext } from '@apollo/client/link/context'

const Httplink = createUploadLink({
  uri: import.meta.env.VITE_REACT_APP_ROUTE_GRAPHQL,
})
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem(`${import.meta.env.VITE_REACT_APP_ACCESS_TOKEN}`)}` || ""
    }
  }
})
export const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(Httplink)
})
 
export default client;