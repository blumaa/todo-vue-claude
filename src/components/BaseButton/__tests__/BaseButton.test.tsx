import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BaseButton } from '../index';

describe('BaseButton', () => {
  test('on click emits', async () => {
    const mockClick = vi.fn();
    render(<BaseButton onClick={mockClick}>Click me</BaseButton>);

    await userEvent.click(screen.getByRole('button'));

    expect(mockClick).toHaveBeenCalled();
  });
});