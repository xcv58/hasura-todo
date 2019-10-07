import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'
import { withRouter } from 'react-router-dom'
import { ACTIVE_TODOS_ROUTE, COMPLETED_TODOS_ROUTE } from './constants'

export const ACTIVE_COUNT_SUBSCRIPTION = gql`
  subscription {
    todo_aggregate(where: { done: { _eq: false } }) {
      aggregate {
        count
      }
    }
  }
`

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on todo {
    id
    name
    done
  }
`

export const TODO_SUBSCRIPTION = gql`
  subscription($done: [Boolean!]!) {
    todo(order_by: { created_at: desc }, where: { done: { _in: $done } }) {
      id
      name
      done
    }
  }
`

const TodoList = props => {
  const { route } = props

  let done = [true, false]
  if (route === ACTIVE_TODOS_ROUTE) {
    done = [false]
  } else if (route === COMPLETED_TODOS_ROUTE) {
    done = [true]
  }

  const { loading, error, data } = useSubscription(TODO_SUBSCRIPTION, {
    variables: { done }
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error :(</p>
  }
  const { todo: todos } = data
  const pendingCount = todos.filter(x => !x.done).length

  return (
    <section className="main">
      <ToggleAll {...{ pendingCount }} />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  )
}

export default withRouter(TodoList)
