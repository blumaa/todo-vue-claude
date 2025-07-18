import { describe, expect, test } from 'vitest';
import { selectAllTodos, selectPendingTodos, selectDoneTodos, selectTodoById } from '../selectors/todoSelectors';

const mockState = {
  todoList: {
    todos: [
      { id: '1', description: 'Test todo 1', state: 'pending', category: 'work' },
      { id: '2', description: 'Test todo 2', state: 'done', category: 'health' },
      { id: '3', description: 'Test todo 3', state: 'pending', category: 'personal' }
    ]
  }
};

describe('todoSelectors', () => {
  test('selectAllTodos returns all todos', () => {
    const result = selectAllTodos(mockState);
    expect(result).toHaveLength(3);
  });

  test('selectPendingTodos returns only pending todos', () => {
    const result = selectPendingTodos(mockState);
    expect(result).toHaveLength(2);
    expect(result[0].state).toBe('pending');
  });

  test('selectDoneTodos returns only done todos', () => {
    const result = selectDoneTodos(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].state).toBe('done');
  });

  test('selectTodoById returns correct todo', () => {
    const result = selectTodoById(mockState, '2');
    expect(result?.description).toBe('Test todo 2');
  });

  test('selectTodoById returns undefined for non-existent id', () => {
    const result = selectTodoById(mockState, 'nonexistent');
    expect(result).toBeUndefined();
  });
});