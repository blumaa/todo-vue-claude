import { describe, expect, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import { Filter } from '../index';
import { useFilterStore } from '@/stores/useFilterStore';

const renderComponent = () => {
  const pinia = createPinia();
  return render(Filter, {
    global: {
      plugins: [pinia]
    }
  });
};

describe('Filter', () => {
  beforeEach(() => {
    // Reset any existing state
  });

  test('renders all filter buttons', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'All' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Health' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Work' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Personal' })).toBeTruthy();
  });

  test('All button is selected by default', () => {
    renderComponent();

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton.classList.contains('bg-blue-500')).toBe(true);
    expect(allButton.classList.contains('text-white')).toBe(true);
  });

  test('clicking category button updates filter', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const filterStore = useFilterStore(pinia);
    
    render(Filter, {
      global: {
        plugins: [pinia]
      }
    });

    const workButton = screen.getByRole('button', { name: 'Work' });
    await user.click(workButton);

    expect(filterStore.selectedCategory).toBe('Work');
    expect(workButton.classList.contains('bg-blue-500')).toBe(true);
    expect(workButton.classList.contains('text-white')).toBe(true);
  });

  test('clicking All button clears filter', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const filterStore = useFilterStore(pinia);
    
    render(Filter, {
      global: {
        plugins: [pinia]
      }
    });

    // First set a filter
    const healthButton = screen.getByRole('button', { name: 'Health' });
    await user.click(healthButton);
    expect(filterStore.selectedCategory).toBe('Health');

    // Then clear it
    const allButton = screen.getByRole('button', { name: 'All' });
    await user.click(allButton);
    expect(filterStore.selectedCategory).toBe(null);
  });

  test('only one button can be selected at a time', async () => {
    const user = userEvent.setup();
    renderComponent();

    const workButton = screen.getByRole('button', { name: 'Work' });
    const healthButton = screen.getByRole('button', { name: 'Health' });
    const allButton = screen.getByRole('button', { name: 'All' });

    // Click Work
    await user.click(workButton);
    expect(workButton.classList.contains('bg-blue-500')).toBe(true);
    expect(healthButton.classList.contains('bg-blue-500')).toBe(false);
    expect(allButton.classList.contains('bg-blue-500')).toBe(false);

    // Click Health
    await user.click(healthButton);
    expect(workButton.classList.contains('bg-blue-500')).toBe(false);
    expect(healthButton.classList.contains('bg-blue-500')).toBe(true);
    expect(allButton.classList.contains('bg-blue-500')).toBe(false);

    // Click All
    await user.click(allButton);
    expect(workButton.classList.contains('bg-blue-500')).toBe(false);
    expect(healthButton.classList.contains('bg-blue-500')).toBe(false);
    expect(allButton.classList.contains('bg-blue-500')).toBe(true);
  });
});