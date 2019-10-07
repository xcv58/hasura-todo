import React from 'react'
import classNames from 'classnames'
import {
  ALL_TODOS_ROUTE,
  ACTIVE_TODOS_ROUTE,
  COMPLETED_TODOS_ROUTE
} from './constants'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { CLEAR_COMPLETED } from './query'

const ActiveCounter = ({ activeCount }) => {
  if (!activeCount) {
    return null
  }
  const activeTodoWord = activeCount <= 1 ? 'item' : 'items'
  return (
    <span className="todo-count">
      <strong>{activeCount}</strong> {activeTodoWord} left
    </span>
  )
}

const ClearButton = ({ completedCount }) => {
  const [clearCompleted] = useMutation(CLEAR_COMPLETED)
  if (!completedCount) {
    return null
  }
  return (
    <button className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  )
}

export default props => {
  const { route } = props
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
      <ActiveCounter {...props} />
      <ul className="filters">{links}</ul>
      <ClearButton {...props} />
    </footer>
  )
}
