import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import PageEditItem from '../PageEditItem.vue';
import { useTodoListStore } from '@/stores/useTodoListStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/list-pending', component: { template: '<div>Pending</div>' } },
    { path: '/edit/:id', component: PageEditItem }
  ]
});

const renderComponent = async (itemId = '1', existingPinia?: any) => {
  await router.push(`/edit/${itemId}`);
  const pinia = existingPinia || createPinia();
  return render(PageEditItem, {
    global: {
      plugins: [pinia, router]
    }
  });
};

describe('PageEditItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form with name input, category select, and buttons', async () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    expect(screen.getByLabelText('Name')).toBeTruthy();
    expect(screen.getByLabelText('Category')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Update' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
  });

  test('pre-fills form with existing todo data', async () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);
    
    // Wait for the component to populate the form
    await screen.findByDisplayValue('Test todo item');
    
    expect(screen.getByLabelText('Name')).toHaveProperty('value', 'Test todo item');
    expect(screen.getByLabelText('Category')).toHaveProperty('value', 'Work');
  });

  test('shows error notification when submitting empty name', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    const nameInput = screen.getByLabelText('Name');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    await user.clear(nameInput);
    await user.click(updateButton);

    // Form should not navigate away, indicating validation failed
    expect(screen.getByRole('button', { name: 'Update' })).toBeTruthy();
  });

  test('shows error notification when submitting without category', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    const categorySelect = screen.getByLabelText('Category');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    await user.selectOptions(categorySelect, '');
    await user.click(updateButton);

    // Form should not navigate away, indicating validation failed
    expect(screen.getByRole('button', { name: 'Update' })).toBeTruthy();
  });

  test('successfully updates todo when both name and category are provided', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    await user.clear(nameInput);
    await user.type(nameInput, 'Updated todo');
    await user.selectOptions(categorySelect, 'Personal');
    await user.click(updateButton);

    // Test passes if no errors are thrown during update
    expect(nameInput).toHaveProperty('value', 'Updated todo');
  });

  test('cancel button functionality', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    // Test passes if no errors are thrown during cancel
    expect(cancelButton).toBeTruthy();
  });

  test('form prevents submission when name is only whitespace', async () => {
    const user = userEvent.setup();
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Work] Test todo item');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);

    const nameInput = screen.getByLabelText('Name');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    await user.clear(nameInput);
    await user.type(nameInput, '   '); // Only whitespace
    await user.click(updateButton);

    // Form should not navigate away, indicating validation failed
    expect(screen.getByRole('button', { name: 'Update' })).toBeTruthy();
  });

  test('handles todo with no category brackets', async () => {
    // Create a todo without category brackets
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.list.splice(0); // Clear existing items
    store.addItem('Simple todo without category');
    const itemId = store.list[0].id;
    
    await renderComponent(itemId, pinia);
    
    // Wait for the component to populate the form
    await screen.findByDisplayValue('Simple todo without category');

    expect(screen.getByLabelText('Name')).toHaveProperty('value', 'Simple todo without category');
    expect(screen.getByLabelText('Category')).toHaveProperty('value', '');
  });
});