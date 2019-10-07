import React from 'react'
import 'todomvc-app-css/index.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloProvider } from '@apollo/react-hooks'
import { getMainDefinition } from 'apollo-utilities'
import TodoList from './TodoList'
import NewItem from './NewItem'
import TodoFooter from './TodoFooter'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { VALID_ROUTES, ALL_TODOS_ROUTE } from './constants'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

const App = withRouter(({ location }) => {
  const { pathname } = location
  const route = VALID_ROUTES.includes(pathname) ? pathname : ALL_TODOS_ROUTE
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <NewItem />
      </header>
      <TodoList {...{ route }} />
      <TodoFooter {...{ route }} />
    </div>
  )
})

export default () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)
