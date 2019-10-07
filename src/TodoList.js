import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'
import { withRouter } from 'react-router-dom'

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
  const { pathname } = props.location
  console.log({ pathname })

  let done = [true, false]
  if (pathname === '/active') {
    done = [false]
  } else if (pathname === '/completed') {
    done = [true]
  }

  const { loading, error, data } = useSubscription(TODO_SUBSCRIPTION, {
    variables: { done }
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    console.log(error)
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
