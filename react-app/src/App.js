import React from 'react';
import logo from './logo.svg';
import 'todomvc-app-css/index.css'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import TodoList from './TodoList';
import NewItem from './NewItem';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <header className="header">
          <h1>todos</h1>
          <NewItem />
        </header>
        <TodoList />
        {/* {footer} */}
      </div>
    </ApolloProvider>
  );
}

