import React from 'react'
import classNames from 'classnames'
import { ACTIVE_TODOS, COMPLETED_TODOS } from './constants'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const TodoFooter = props => {
  const { completedCount, location, count, onClearCompleted } = props
  const activeTodoWord = 'item'
  let clearButton = null

  if (completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    )
  }

  const { pathname } = location
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className={classNames({ selected: pathname === '/' })}>
            All
          </Link>
        </li>{' '}
        <li>
          <Link
            to="/active"
            className={classNames({
              selected: pathname.endsWith(ACTIVE_TODOS)
            })}
          >
            Active
          </Link>
        </li>{' '}
        <li>
          <Link
            to="/completed"
            className={classNames({
              selected: pathname.endsWith(COMPLETED_TODOS)
            })}
          >
            Completed
          </Link>
        </li>
      </ul>
      {clearButton}
    </footer>
  )
}

export default withRouter(TodoFooter)
