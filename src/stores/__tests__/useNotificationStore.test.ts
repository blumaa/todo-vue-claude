import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useNotificationStore } from '../useNotificationStore';

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('initial state is correct', () => {
    const store = useNotificationStore();
    
    expect(store.message).toBe('');
    expect(store.visible).toBe(false);
    expect(store.type).toBe('success');
  });

  test('showNotification sets message and makes visible', () => {
    const store = useNotificationStore();
    
    store.showNotification('Test message');
    
    expect(store.message).toBe('Test message');
    expect(store.visible).toBe(true);
    expect(store.type).toBe('success');
  });

  test('showNotification with error type sets correct type', () => {
    const store = useNotificationStore();
    
    store.showNotification('Error message', 'error');
    
    expect(store.message).toBe('Error message');
    expect(store.visible).toBe(true);
    expect(store.type).toBe('error');
  });

  test('notification auto-hides after 3 seconds', () => {
    const store = useNotificationStore();
    
    store.showNotification('Test message');
    expect(store.visible).toBe(true);
    
    vi.advanceTimersByTime(3000);
    
    expect(store.visible).toBe(false);
    expect(store.message).toBe('');
    expect(store.type).toBe('success');
  });

  test('hideNotification clears notification immediately', () => {
    const store = useNotificationStore();
    
    store.showNotification('Test message', 'error');
    expect(store.visible).toBe(true);
    expect(store.message).toBe('Test message');
    expect(store.type).toBe('error');
    
    store.hideNotification();
    
    expect(store.visible).toBe(false);
    expect(store.message).toBe('');
    expect(store.type).toBe('success');
  });

  test('showNotification clears existing timeout', () => {
    const store = useNotificationStore();
    
    store.showNotification('First message');
    vi.advanceTimersByTime(1000); // 1 second
    
    store.showNotification('Second message');
    vi.advanceTimersByTime(2000); // 2 seconds (3 total)
    
    // Should still be visible because new timeout was set
    expect(store.visible).toBe(true);
    expect(store.message).toBe('Second message');
    
    vi.advanceTimersByTime(1000); // 1 more second (4 total, 3 since second message)
    
    expect(store.visible).toBe(false);
  });
});