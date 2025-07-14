import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import { Notification } from '../index';

describe('Notification', () => {
  test('renders notification when visible is true', () => {
    render(Notification, {
      props: {
        message: 'Test notification',
        visible: true
      }
    });

    expect(screen.getByText('Test notification')).toBeTruthy();
  });

  test('does not render notification when visible is false', () => {
    render(Notification, {
      props: {
        message: 'Test notification',
        visible: false
      }
    });

    expect(screen.queryByText('Test notification')).toBeNull();
  });

  test('renders with success styling by default', () => {
    render(Notification, {
      props: {
        message: 'Success message',
        visible: true
      }
    });

    const notification = screen.getByText('Success message');
    expect(notification.classList.contains('bg-green-500')).toBe(true);
    expect(notification.classList.contains('bg-red-500')).toBe(false);
  });

  test('renders with error styling when type is error', () => {
    render(Notification, {
      props: {
        message: 'Error message',
        visible: true,
        type: 'error'
      }
    });

    const notification = screen.getByText('Error message');
    expect(notification.classList.contains('bg-red-500')).toBe(true);
    expect(notification.classList.contains('bg-green-500')).toBe(false);
  });

  test('renders with success styling when type is success', () => {
    render(Notification, {
      props: {
        message: 'Success message',
        visible: true,
        type: 'success'
      }
    });

    const notification = screen.getByText('Success message');
    expect(notification.classList.contains('bg-green-500')).toBe(true);
    expect(notification.classList.contains('bg-red-500')).toBe(false);
  });
});