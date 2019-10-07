import gql from 'graphql-tag'

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on todo {
    id
    name
    done
  }
`

export const TODO_SUBSCRIPTION = gql`
  subscription {
    todo_aggregate(order_by: { created_at: desc }) {
      todos: nodes {
        id
        name
        done
      }
      aggregate {
        count
      }
    }
  }
`

export const CLEAR_COMPLETED = gql`
  mutation {
    delete_todo(where: { done: { _eq: true } }) {
      affected_rows
    }
  }
`
