import { describe, test, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { todoListSlice, addTodo, updateTodo, completeTodo, removeTodo } from '../stores/todoListStore';
import { CategoryType } from '../types';

const createTestStore = () => {
  return configureStore({
    reducer: {
      todoList: todoListSlice.reducer
    }
  });
};

describe('todoListStore', () => {
  test('adds new todo', () => {
    const store = createTestStore();
    const todo = {
      id: '1',
      description: 'Test todo',
      category: CategoryType.Work,
      state: 'pending' as const
    };

    store.dispatch(addTodo(todo));
    
    const state = store.getState().todoList;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0]).toEqual(todo);
  });

  test('updates existing todo', () => {
    const store = createTestStore();
    const todo = {
      id: '1',
      description: 'Test todo',
      category: CategoryType.Work,
      state: 'pending' as const
    };

    store.dispatch(addTodo(todo));
    store.dispatch(updateTodo({
      id: '1',
      description: 'Updated todo',
      category: CategoryType.Personal
    }));
    
    const state = store.getState().todoList;
    expect(state.todos[0].description).toBe('Updated todo');
    expect(state.todos[0].category).toBe(CategoryType.Personal);
  });

  test('completes todo', () => {
    const store = createTestStore();
    const todo = {
      id: '1',
      description: 'Test todo',
      category: CategoryType.Work,
      state: 'pending' as const
    };

    store.dispatch(addTodo(todo));
    store.dispatch(completeTodo({ id: '1' }));
    
    const state = store.getState().todoList;
    expect(state.todos[0].state).toBe('done');
  });

  test('removes todo', () => {
    const store = createTestStore();
    const todo = {
      id: '1',
      description: 'Test todo',
      category: CategoryType.Work,
      state: 'pending' as const
    };

    store.dispatch(addTodo(todo));
    store.dispatch(removeTodo({ id: '1' }));
    
    const state = store.getState().todoList;
    expect(state.todos).toHaveLength(0);
  });
});