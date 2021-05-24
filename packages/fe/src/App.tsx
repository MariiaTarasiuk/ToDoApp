import React, { useState } from 'react';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { TODO, TodoStatus } from './helpers/todo.model';
import { DELETE_TODO, READ_TODOS, UPDATE_TODO } from './helpers/todo.mutation';
import AddTodoForm from './components/AddTodoForm';
import TodoFilterSet from './components/TodoFilterSet';
import TodoList from './components/TodoList';

const App = () => {
  const [filter, setFilter] = useState('all');

  const { data, loading, error } = useQuery(READ_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [delTodo] = useMutation(DELETE_TODO);

  const removeHandler = (id: string) => {
    delTodo({ variables: { id }, refetchQueries: [{ query: READ_TODOS }] });
  }
  const updateHandler = (id: string) => {
    updateTodo({ variables: { id }, refetchQueries: [{ query: READ_TODOS }] });
  }
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((event.target as HTMLInputElement).value);
  };

  if (loading) { return <Skeleton /> }
  if (error) { return <Typography variant="h2">ERROR</Typography> }
  if (!data) { return <Typography variant="h2">Not found</Typography> }
  const todoItems = data ? data.todos.filter((td: TODO) => TodoStatus[filter] === 2 ? td : td.completed === !!TodoStatus[filter]) : [];

  return (
    <Container className="app">
      <Typography variant="h2">Todo App</Typography>
      <AddTodoForm />
      <TodoFilterSet filter={filter} handleFilterChange={handleFilterChange} />
      <TodoList items={todoItems} updateHandler={updateHandler} removeHandler={removeHandler} />
    </Container >
  );
}

export default App;
