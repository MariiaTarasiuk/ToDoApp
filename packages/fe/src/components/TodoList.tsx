import React from 'react';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TODO } from '../helpers/todo.model';

interface TODOprops {
  items: TODO[],
  updateHandler: (id: string) => void,
  removeHandler: (id: string) => void
}

const TodoList = ({ items, updateHandler, removeHandler }: TODOprops) => {
  return (
    <List>
      {items.map((td: TODO) => {
        const labelId = `checkbox-list-label-${td.id}`;
        return (
          <ListItem key={td.id} role={undefined} dense button onClick={(e) => updateHandler(td.id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                color="primary"
                checked={td.completed}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={td.text} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="remove" onClick={(e) => removeHandler(td.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  )
}

export default TodoList;