import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TOGGLE_ALL = gql`
  mutation toggleAll($done: Boolean!) {
    update_todo(_set: { done: $done }, where: { done: { _neq: $done } }) {
      affected_rows
    }
  }
`

export default props => {
  const { activeCount } = props
  const [toggleAll] = useMutation(TOGGLE_ALL)
  return (
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={!activeCount}
      onChange={() => {
        toggleAll({
          variables: { done: !!activeCount }
        })
      }}
    />
  )
}
