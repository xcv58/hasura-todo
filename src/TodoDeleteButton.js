import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const DELETE_TODO = gql`
  mutation deleteTodo($id: uuid!) {
    delete_todo(where: { id: { _eq: $id } }) {
      returning {
        id
        name
        done
      }
    }
  }
`

export default props => {
  const { id } = props
  const [deleteTodo] = useMutation(DELETE_TODO)
  return (
    <button
      className="destroy"
      onClick={e => {
        e.preventDefault()
        deleteTodo({ variables: { id } })
      }}
    />
  )
}
