import React from 'react'
import classNames from 'classnames'
import {
  ALL_TODOS_ROUTE,
  ACTIVE_TODOS_ROUTE,
  COMPLETED_TODOS_ROUTE
} from './constants'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const TodoFooter = props => {
  const { completedCount, route, count, onClearCompleted } = props
  const activeTodoWord = 'item'
  let clearButton = null

  if (completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    )
  }

  const links = [
    { to: ALL_TODOS_ROUTE, name: 'All' },
    { to: ACTIVE_TODOS_ROUTE, name: 'Active' },
    { to: COMPLETED_TODOS_ROUTE, name: 'Completed' }
  ].map(({ to, name }) => (
    <li key={to}>
      <Link key={to} to={to} className={classNames({ selected: route === to })}>
        {name}
      </Link>
    </li>
  ))
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">{links}</ul>
      {clearButton}
    </footer>
  )
}

export default withRouter(TodoFooter)
