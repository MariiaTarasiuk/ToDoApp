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

const UPDATE_TODO = gql`
mutation UpdateTodo($id: String!){
  updateTodo(id: $id)
}`

const DELETE_TODO = gql`
  mutation RemoveTodo($id: String!){ 
    removeTodo(id: $id)
  }
`;

const App = () => {

  const { data, loading, error, refetch } = useQuery(READ_TODOS);
  const [addTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [delTodo] = useMutation(DELETE_TODO);
  let todoInput: HTMLInputElement;


  const addHandler = (event: HTMLFormElement) => {
    event.preventDefault();
    addTodo({ variables: { text: todoInput.value } });
    refetch();
  }

  const removeHandler = (id: string) => {
    delTodo({ variables: { id } });
    refetch();
  }

  const updateHandler = (id: string) => {
    updateTodo({ variables: { id } });
    refetch();
  }

  return (
    <div className="app">
      <form onSubmit={(e) => addHandler(e as any)}>
        <input type='text' placeholder="add new todo" ref={node => { todoInput = node as HTMLInputElement; }} />
        <button type="submit">Add Todo</button>
      </form>
      {loading && <p>loading...</p>}
      {error && <p>ERROR</p>}
      {!data && <p>Not found</p>}
      <ul>
        {data && data.todos.map((todo: any) =>
          <li key={todo.id}>
            <input type="checkbox" name="status" id={todo.id} checked={todo.completed} onChange={() => { updateHandler(todo.id) }} />
            <span className={todo.completed ? "complete" : "open"}>{todo.text}</span>
            <button onClick={() => removeHandler(todo.id)}>X</button>
          </li>
        )}
      </ul>
    </div >
  );
}

export default App;
