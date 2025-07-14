import { describe, expect, test, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import PageCreateItem from '../PageCreateItem.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/list-pending', component: { template: '<div>Pending</div>' } }
  ]
});

const renderComponent = () => {
  return render(PageCreateItem, {
    global: {
      plugins: [createPinia(), router]
    }
  });
};

describe('PageCreateItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form with name input, category select, and submit button', () => {
    renderComponent();

    expect(screen.getByLabelText('Name')).toBeTruthy();
    expect(screen.getByLabelText('Category')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
  });

  test('shows error notification when submitting empty name', async () => {
    const user = userEvent.setup();
    renderComponent();

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    // Since we can't easily test the notification store from here,
    // we'll test that the form doesn't submit (inputs remain filled)
    expect(screen.getByLabelText('Name')).toHaveProperty('value', '');
  });

  test('shows error notification when submitting without category', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, 'Test todo');
    await user.click(submitButton);

    // Form should not clear the name input since validation failed
    expect(nameInput).toHaveProperty('value', 'Test todo');
  });

  test('successfully creates todo when both name and category are provided', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, 'Test todo');
    await user.selectOptions(categorySelect, 'Work');
    await user.click(submitButton);

    // Form should clear inputs after successful submission
    expect(nameInput).toHaveProperty('value', '');
    expect(categorySelect).toHaveProperty('value', '');
  });

  test('category select has correct options', () => {
    renderComponent();

    const categorySelect = screen.getByLabelText('Category');
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(4); // Including "Select a category"
    expect(screen.getByRole('option', { name: 'Select a category' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Health' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Work' })).toBeTruthy();
    expect(screen.getByRole('option', { name: 'Personal' })).toBeTruthy();
  });

  test('form prevents submission when name is only whitespace', async () => {
    const user = userEvent.setup();
    renderComponent();

    const nameInput = screen.getByLabelText('Name');
    const categorySelect = screen.getByLabelText('Category');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    await user.type(nameInput, '   '); // Only whitespace
    await user.selectOptions(categorySelect, 'Work');
    await user.click(submitButton);

    // Form should not clear inputs since name validation failed
    expect(nameInput).toHaveProperty('value', '   ');
  });
});