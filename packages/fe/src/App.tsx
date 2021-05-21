import React from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const READ_TODOS = gql`
  query todos{
    todos {
      id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!){ 
    removeTodo(id: $id)
  }
`;

const App = () => {

  const { data, loading, error } = useQuery(READ_TODOS);
  const [delTodo] = useMutation(DELETE_TODO);

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  return (
    <div className="app">
      <ul>
        {data.todos.map((todo: any) =>
          <li key={todo.id}>
            <span className={todo.completed ? "complete" : "open"}>{todo.text}</span>
            <button onClick={() => { delTodo({ variables: { id: todo.id } }); window.location.reload(); }}>X</button>
          </li>
        )}
      </ul>
    </div >
  );
}

export default App;
