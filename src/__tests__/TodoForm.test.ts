
import { describe, test, expect } from "vitest";
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import PageCreateItem from '@/routes/PageCreateItem.vue';
import PageEditItem from '@/routes/PageEditItem.vue';
import { useTodoListStore } from '@/stores/useTodoListStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/create', component: PageCreateItem },
    { path: '/edit/:id', component: PageEditItem },
    { path: '/list-pending', component: { template: '<div>Pending</div>' } }
  ]
});

describe('TodoForm', () => {
  test('add new item with validation', async () => {
    await router.push('/create');
    const user = userEvent.setup();
    
    render(PageCreateItem, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Test successful creation
    await user.type(nameInput, 'New todo item');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(submitButton);

    // Form should clear after successful submission
    expect(nameInput).toHaveProperty('value', '');
    expect(categorySelect).toHaveProperty('value', '');
  });

  test('edit item with validation', async () => {
    const pinia = createPinia();
    const store = useTodoListStore(pinia);
    store.addItem('[Personal] Edit this item');
    const itemId = store.list[0].id;
    
    await router.push(`/edit/${itemId}`);
    const user = userEvent.setup();
    
    render(PageEditItem, {
      global: {
        plugins: [pinia, router]
      }
    });

    // Wait for the component to populate the form
    await screen.findByDisplayValue('Edit this item');

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    // Form should be pre-filled
    expect(nameInput).toHaveProperty('value', 'Edit this item');
    expect(categorySelect).toHaveProperty('value', 'Personal');

    // Test successful update
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated item');
    await user.selectOptions(categorySelect, 'Health');
    await user.click(updateButton);

    expect(nameInput).toHaveProperty('value', 'Updated item');
  });
});
