import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'

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
  subscription {
    todo(order_by: { created_at: desc }) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`

export default () => {
  const { loading, error, data } = useSubscription(TODO_SUBSCRIPTION)
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
