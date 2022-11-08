import React, {StrictMode} from 'react'
import {ColorModeScript} from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client'
import {client} from './graphql/ApolloClient' 

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(
  <ApolloProvider client={client}>
    <ColorModeScript />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)
