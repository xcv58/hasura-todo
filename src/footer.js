import React from 'react'
import classNames from 'classnames'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './constants'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class TodoFooter extends React.Component {
  render() {
    var activeTodoWord = 'item'
    var clearButton = null

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}
        >
          Clear completed
        </button>
      )
    }

    const { pathname } = this.props.location
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
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
}

export default withRouter(TodoFooter)
