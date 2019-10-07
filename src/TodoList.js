import React from 'react'
import TodoItem from './TodoItem'
import ToggleAll from './ToggleAll'
import { ACTIVE_TODOS_ROUTE, COMPLETED_TODOS_ROUTE } from './constants'

export default props => {
  const { activeCount, todos, route } = props
  let filteredTodos = todos
  if (route === ACTIVE_TODOS_ROUTE) {
    filteredTodos = todos.filter(x => !x.done)
  } else if (route === COMPLETED_TODOS_ROUTE) {
    filteredTodos = todos.filter(x => x.done)
  }

  return (
    <section className="main">
      <ToggleAll {...{ activeCount }} />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </section>
  )
}
