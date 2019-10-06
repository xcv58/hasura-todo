import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll';

export const TODO_LIST = gql`
{
  todo(order_by: { created_at: desc } ) {
    id
    name
    done
  }
  todo_aggregate(where: {done: {_eq: false}}) {
    aggregate {
      count
    }
  }
}

`

export default () => {
  const { loading, error, data } = useQuery(TODO_LIST)
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }
  const { todo: todos, todo_aggregate: { aggregate: { count: pendingCount } } } = data

  return (
    <section className="main">
      <ToggleAll {...{ pendingCount }}/>
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
    </label>
      <ul className="todo-list">
        {todos.map(todo => (<TodoItem key={todo.id} {...todo} />))}
      </ul>
    </section>
  )
}
