import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todo(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        id
        name
        done
      }
    }
  }
`

export default props => {
  const { id, done } = props
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  return (
    <input
      className="toggle"
      type="checkbox"
      checked={done}
      onChange={e => {
        e.preventDefault()
        toggleTodo({ variables: { id, done: !done } })
      }}
    />
  )
}
