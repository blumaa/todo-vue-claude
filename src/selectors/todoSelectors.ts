import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../stores';

// Base selector to get all todos
export const selectAllTodos = (state: RootState) => state.todoList.todos;

// Memoized selector for pending todos
export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => todo.state === "pending")
);

// Memoized selector for done todos
export const selectDoneTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(todo => todo.state === "done")
);

// Memoized selector to get todo by id
export const selectTodoById = createSelector(
  [selectAllTodos, (_state: RootState, todoId: string) => todoId],
  (todos, todoId) => todos.find(todo => todo.id === todoId)
);
