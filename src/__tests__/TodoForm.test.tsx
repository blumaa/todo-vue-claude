import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { TodoForm } from '../components/TodoForm/TodoForm';
import { todoListSlice } from '../stores/todoListStore';
import { CategoryType } from '../types';

const mockStore = configureStore({
  reducer: {
    todoList: todoListSlice.reducer
  },
  preloadedState: {
    todoList: {
      todos: []
    }
  }
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('TodoForm', () => {
  test('renders create form correctly', () => {
    render(
      <TestWrapper>
        <TodoForm mode="create" />
      </TestWrapper>
    );
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('renders edit form with existing todo data', () => {
    const todo = {
      id: '1',
      description: 'Test todo',
      category: CategoryType.Work,
      state: 'pending' as const
    };

    render(
      <TestWrapper>
        <TodoForm mode="edit" todo={todo} />
      </TestWrapper>
    );
    
    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('work');
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
  });

  test('submits create form with valid data', () => {
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');
    
    render(
      <TestWrapper>
        <TodoForm mode="create" />
      </TestWrapper>
    );
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New todo' }
    });
    fireEvent.change(screen.getByLabelText('Category'), {
      target: { value: CategoryType.Personal }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(mockDispatch).toHaveBeenCalled();
  });
});