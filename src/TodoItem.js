import React, { useState } from 'react'
import classNames from 'classnames'
import EditField from './EditField'
import TodoToggle from './TodoToggle'
import TodoDeleteButton from './TodoDeleteButton'

export default props => {
  const { name, done } = props
  const [editing, setEditing] = useState(false)
  return (
    <li
      className={classNames({
        editing,
        completed: done
      })}
    >
      <div className="view">
        <TodoToggle {...props} />
        <label onDoubleClick={() => setEditing(true)}>{name}</label>
        <TodoDeleteButton {...props} />
      </div>
      <EditField {...props} {...{ editing, setEditing }} />
    </li>
  )
}
