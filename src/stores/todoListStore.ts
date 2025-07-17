import { createSlice } from "@reduxjs/toolkit";
import { type ListItem } from "../types";

interface TodoListState {
  todos: ListItem[];
}

const initialState: TodoListState = {
  todos: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});

// Export actions when they are added
export const { addTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
