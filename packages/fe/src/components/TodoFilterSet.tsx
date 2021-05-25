import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';

interface TODO_FILTERS_SET_Props {
  filter: string,
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TodoFilterSet = ({ filter, handleFilterChange }: TODO_FILTERS_SET_Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter by</FormLabel>
      <RadioGroup row aria-label="filters" name="filters" value={filter} onChange={handleFilterChange} >
        <FormControlLabel value="all" control={<Radio color="primary" />} label="All" />
        <FormControlLabel value="open" control={<Radio color="primary" />} label="Open" />
        <FormControlLabel value="done" control={<Radio color="primary" />} label="Done" />
      </RadioGroup>
    </FormControl>
  )
}

export default TodoFilterSet;