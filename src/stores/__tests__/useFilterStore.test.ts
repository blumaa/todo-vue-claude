import { describe, expect, test, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useFilterStore } from '../useFilterStore';

describe('useFilterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('initial state is null (no filter)', () => {
    const store = useFilterStore();
    
    expect(store.selectedCategory).toBe(null);
  });

  test('setCategory updates selected category', () => {
    const store = useFilterStore();
    
    store.setCategory('Work');
    expect(store.selectedCategory).toBe('Work');
    
    store.setCategory('Health');
    expect(store.selectedCategory).toBe('Health');
  });

  test('clearFilter resets selected category to null', () => {
    const store = useFilterStore();
    
    store.setCategory('Personal');
    expect(store.selectedCategory).toBe('Personal');
    
    store.clearFilter();
    expect(store.selectedCategory).toBe(null);
  });

  test('setCategory can be called multiple times', () => {
    const store = useFilterStore();
    
    store.setCategory('Work');
    expect(store.selectedCategory).toBe('Work');
    
    store.setCategory('Health');
    expect(store.selectedCategory).toBe('Health');
    
    store.setCategory('Personal');
    expect(store.selectedCategory).toBe('Personal');
  });
});