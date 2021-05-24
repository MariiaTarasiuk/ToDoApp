import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button, Grid, TextField } from '@material-ui/core';
import { CREATE_TODO, READ_TODOS } from '../helpers/todo.mutation';

const AddTodoForm = () => {
  const [todoText, setTodo] = useState('');
  const [addTodo] = useMutation(CREATE_TODO);

  const addHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({ variables: { text: todoText }, refetchQueries: [{ query: READ_TODOS }] });
    setTodo('');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((event.target as HTMLInputElement).value);
  }

  return (
    <form onSubmit={addHandler}>
      <Grid container justify="flex-end">
        <Grid item xs={12} >
          <TextField
            id="todo"
            label="Create new todo item:"
            placeholder="add new todo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={todoText}
            onChange={handleChange} />
        </Grid>
        <Button type="submit" variant="outlined" color="primary" disabled={!todoText}>
          Add Todo
      </Button>
      </Grid>
    </form>
  )
}
export default AddTodoForm;