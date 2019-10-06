import React, { useRef, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ESCAPE_KEY, ENTER_KEY } from './constants'

const UPDATE_TODO = gql`
  mutation updateTodo($id: uuid!, $name: String!) {
    update_todo(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
        done
      }
    }
  }
`

export default props => {
  const { id, name, setEditing, editing } = props
  const editField = useRef(null)
  const [text, setText] = useState(name)
  const [updateTodo, { loading }] = useMutation(UPDATE_TODO, {
    onCompleted: () => setEditing(false)
  })
  const onSubmit = () => {
    updateTodo({ variables: { id, name: text } })
  }
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
      disabled={loading}
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
