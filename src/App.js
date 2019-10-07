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
import TodoFooter from './footer'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

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

export default () => {
  // console.log(window.location.href);
  // const { href } = window.location;
  // let nowShowing = ALL_TODOS;
  // if (href.endsWith(`/#/${ACTIVE_TODOS}`)) {
  //   nowShowing = ACTIVE_TODOS;
  // } else if (href.endsWith(`/#/${COMPLETED_TODOS}`)) {
  //   nowShowing = COMPLETED_TODOS;
  // }

  return (
    <Router>
      <ApolloProvider client={client}>
        <div>
          <header className="header">
            <h1>todos</h1>
            <NewItem />
          </header>
          <TodoList />
          <TodoFooter />
        </div>
      </ApolloProvider>
    </Router>
  )
}
