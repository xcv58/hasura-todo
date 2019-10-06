import React, { useRef, useState, useEffect } from 'react'
import classNames from "classnames";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { ESCAPE_KEY, ENTER_KEY } from './constants';

const TOGGLE_TODO = gql`
mutation toggleTodo($id: uuid!, $done: Boolean!) {
  update_todo(where: {id: {_eq: $id}}, _set: {done: $done}) {
    returning {
      id
      name
      done
    }
  }
}
`

const DELETE_TODO = gql`
mutation deleteTodo($id: uuid!) {
  delete_todo(where: {id: {_eq: $id}}) {
    returning {
      id
      name
      done
    }
  }
}
`

const UPDATE_TODO = gql`
mutation updateTodo($id: uuid!, $name: String!) {
  update_todo(where: {id: {_eq: $id}}, _set: {name: $name}) {
    returning {
      id
      name
      done
    }
  }
}
`

const EditField = (props) => {
  const { id, name, setEditing, editing } = props
  const editField = useRef(null)
  const [text, setText] = useState(name)
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => setEditing(false)
  })
  const onSubmit = () => updateTodo({ variables: { id, name: text }})
  useEffect(() => {
    if (editing) {
      editField.current.focus()
    }
  }, [editing])
  return (
    <input
      ref={editField}
      className="edit"
      value={text}
      onBlur={() => {
        onSubmit()
      }}
      onChange={e => setText(e.target.value)}
      onKeyDown={e => {
        if (e.keyCode === ESCAPE_KEY) {
          setText(name)
          setEditing(false)
        } else if (e.keyCode === ENTER_KEY) {
          onSubmit()
        }
      }}
    />
  )

}

export default (props) => {
  const { id, name, done } = props
  const [editing, setEditing] = useState(false)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  return (
    <li className={classNames({
      editing,
      completed: done,
    })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={e => {
            e.preventDefault()
            toggleTodo({ variables: { id, done: !done } })
          }}
        />
        <label onDoubleClick={() => setEditing(true)}>
          {name}
        </label>
        <button
          className="destroy"
          onClick={e => {
            e.preventDefault()
            deleteTodo({ variables: { id }})
          }}
          />
      </div>
      <EditField {...props} {...{ editing, setEditing }} />
    </li>
  )
}
