import { createSlice } from "@reduxjs/toolkit";
import { type ListItem } from "../types";

interface TodoListState {
  todos: ListItem[];
}

const initialState: TodoListState = {
  todos: [
    { id: "1", description: "todo 1", state: "pending" },
    { id: "2", description: "todo 2", state: "done" },
    { id: "3", description: "todo 3", state: "pending" },
  ],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

// Export actions when they are added
// export const { } = todoListSlice.actions;
export default todoListSlice.reducer;

