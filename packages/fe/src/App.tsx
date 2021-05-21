import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const App = () => {

  const { data, loading, error } = useQuery(READ_TODOS);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="app">
      <ul>
        {data.todos.map((todo: any) =>
          <li key={todo.id}>
            <span className={todo.completed ? "complete" : "open"}>{todo.text}</span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
