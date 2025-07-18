import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ListItem } from '../components/ListItem/ListItem';
import { todoListSlice } from '../stores/todoListStore';

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

describe('ListItem', () => {
  test('renders pending item correctly', () => {
    render(
      <TestWrapper>
        <ListItem
          id="1"
          description="Test todo"
          category="work"
          state="pending"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Complete' })).toBeInTheDocument();
  });

  test('renders done item with strikethrough', () => {
    render(
      <TestWrapper>
        <ListItem
          id="1"
          description="Test todo"
          category="work"
          state="done"
        />
      </TestWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Mark as Not Done' })).toBeInTheDocument();
  });

  test('dispatches complete action when complete button clicked', () => {
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');
    
    // First add a todo to the store
    mockStore.dispatch({ type: 'todoList/addTodo', payload: { id: '1', description: 'Test todo', category: 'work', state: 'pending' } });
    
    render(
      <TestWrapper>
        <ListItem
          id="1"
          description="Test todo"
          category="work"
          state="pending"
        />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Complete' }));
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('dispatches remove action when remove button clicked', () => {
    const mockDispatch = vi.spyOn(mockStore, 'dispatch');
    
    render(
      <TestWrapper>
        <ListItem
          id="1"
          description="Test todo"
          category="work"
          state="pending"
        />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(mockDispatch).toHaveBeenCalled();
  });
});