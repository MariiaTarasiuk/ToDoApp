import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

interface TODO {
  id: string,
  text: string,
  completed: boolean
}

const READ_TODOS = gql`
  query todos {
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

enum TodoStatus {
  open = 0,
  done = 1,
  all = '',
}

const App = () => {
  const [filter, setFilter] = useState(TodoStatus.all);

  const { data, loading, error, refetch } = useQuery(READ_TODOS);
  const [addTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [delTodo] = useMutation(DELETE_TODO);
  let todoInput: HTMLInputElement;


  const addHandler = (event: HTMLFormElement) => {
    event.preventDefault();
    addTodo({ variables: { text: todoInput.value }, refetchQueries: [{ query: READ_TODOS }] });
    todoInput.value = '';
    refetch();
  }

  const removeHandler = (id: string) => {
    delTodo({ variables: { id }, refetchQueries: [{ query: READ_TODOS }] });
    refetch();
  }

  const updateHandler = (id: string) => {
    updateTodo({ variables: { id }, refetchQueries: [{ query: READ_TODOS }] });
    refetch();
  }

  if (loading) { return <p>loading...</p> }
  if (error) { return <p>ERROR</p> }
  if (!data) { return <p>Not found</p> }

  return (
    <div className="app">
      <form onSubmit={(e) => addHandler(e as any)}>
        <h2>Create new todo item:</h2>
        <input type='text' placeholder="add new todo" ref={node => { todoInput = node as HTMLInputElement; }} />
        <button type="submit">Add Todo</button>
      </form>
      <h2>Filter by:</h2>
      <fieldset>
        <input type="radio" name="filter" id="byAll" checked={filter === TodoStatus.all} onChange={() => setFilter(TodoStatus.all)} />
        <label htmlFor="byAll">All</label>
        <input type="radio" name="filter" id="byFalse" checked={filter === TodoStatus.open} onChange={() => setFilter(TodoStatus.open)} />
        <label htmlFor="byFalse">Open</label>
        <input type="radio" name="filter" id="byTrue" checked={filter === TodoStatus.done} onChange={() => setFilter(TodoStatus.done)} />
        <label htmlFor="byTrue">Done</label>
      </fieldset>
      <h2>Todo list:</h2>
      <ul>
        {data && data.todos.filter((td: TODO) => filter === TodoStatus.all ? td : td.completed === !!filter).map((todo: any) =>
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
