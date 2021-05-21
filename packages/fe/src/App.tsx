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

const CREATE_TODO = gql`
mutation CreateTodo($text: String!){
  createTodo(text: $text)
}`

const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!){ 
    removeTodo(id: $id)
  }
`;

const App = () => {

  const { data, loading, error } = useQuery(READ_TODOS);
  const [delTodo] = useMutation(DELETE_TODO);
  const [addTodo] = useMutation(CREATE_TODO);
  let todoInput: HTMLInputElement;

  if (loading) return <p>loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;

  const addHandler = (event: HTMLFormElement) => {
    event.preventDefault();
    addTodo({ variables: { text: todoInput.value } });
    window.location.reload();
  }

  const removeHandler = (id: string) => {
    delTodo({ variables: { id } }); window.location.reload();
  }

  return (
    <div className="app">
      <form onSubmit={(e) => addHandler(e as any)}>
        <input type='text' placeholder="add new todo" ref={node => { todoInput = node as HTMLInputElement; }} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {data.todos.map((todo: any) =>
          <li key={todo.id}>
            <input type="checkbox" name="status" id={todo.id} checked={todo.completed} />
            <span className={todo.completed ? "complete" : "open"}>{todo.text}</span>
            <button onClick={() => removeHandler(todo.id)}>X</button>
          </li>
        )}
      </ul>
    </div >
  );
}

export default App;
