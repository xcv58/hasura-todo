import React, { useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TODO_LIST } from './TodoList';

const TOGGLE_ALL = gql`
mutation toggleAll($done: Boolean!) {
  update_todo(_set: {done: $done}, where: {done: {_neq: $done}}) {
    affected_rows
  }
}
`

export default (props) => {
  const { pendingCount } = props
  const [toggleAll] = useMutation(TOGGLE_ALL, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: TODO_LIST }]
  })
  return (
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={!pendingCount}
      onChange={() => {
        toggleAll({
          variables: { done: !!pendingCount }
        })
      }}
    />
  )
}
