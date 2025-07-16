import { createSlice } from '@reduxjs/toolkit';
import { type ListItem } from '../types';

interface TodoListState {
  list: ListItem[];
}

const initialState: TodoListState = {
  list: []
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    // Add reducers as needed
  }
});

// Export actions when they are added
// export const { } = todoListSlice.actions;
export default todoListSlice.reducer;