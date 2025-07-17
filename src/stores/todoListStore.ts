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
    inCompleteTodo: (state, action) => {
      state.todos.find((todo) => todo.id === action.payload.id)!.state = "pending";
    },
    completeTodo: (state, action) => {
      state.todos.find((todo) => todo.id === action.payload.id)!.state = "done";
    },
  },
});

// Export actions when they are added
export const { addTodo, completeTodo, inCompleteTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
