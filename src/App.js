import React from 'react'
import 'todomvc-app-css/index.css'
import { ApolloProvider, useSubscription } from '@apollo/react-hooks'
import TodoList from './TodoList'
import NewItem from './NewItem'
import TodoFooter from './TodoFooter'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { VALID_ROUTES, ALL_TODOS_ROUTE } from './constants'
import { client } from './client'
import { TODO_SUBSCRIPTION } from './query'

const App = withRouter(({ location }) => {
  const { pathname } = location
  const route = VALID_ROUTES.includes(pathname) ? pathname : ALL_TODOS_ROUTE
  const { data, loading, error } = useSubscription(TODO_SUBSCRIPTION)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }
  const { todos } = data.todo_aggregate
  const activeCount = todos.filter(x => !x.done).length
  const completedCount = todos.filter(x => x.done).length
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <NewItem />
      </header>
      <TodoList {...{ activeCount, todos, route }} />
      <TodoFooter {...{ activeCount, completedCount, route }} />
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
