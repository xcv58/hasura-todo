import React, { useRef } from 'react'
import { ENTER_KEY } from './constants'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { TODO_LIST } from './TodoList'

const ADD_TODO = gql`
  mutation addTodo($name: String!) {
    insert_todo(objects: [{ name: $name }]) {
      returning {
        id
        name
        done
      }
    }
  }
`

export default () => {
  const inputEl = useRef(null)
  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    update(cache, { data }) {
      const { todo } = cache.readQuery({ query: TODO_LIST })
      cache.writeQuery({
        query: TODO_LIST,
        data: { todo: data.insert_todo.returning.concat(todo) }
      })
    },
    onCompleted() {
      inputEl.current.value = ''
      inputEl.current.focus()
    }
  })
  return (
    <input
      ref={inputEl}
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={event => {
        if (event.keyCode !== ENTER_KEY) {
          return
        }
        event.preventDefault()
        const name = inputEl.current.value
        addTodo({ variables: { name } })
      }}
      disabled={loading}
      autoFocus={true}
    />
  )
}
