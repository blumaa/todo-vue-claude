import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import { BaseButton } from '../index';

describe('BaseButton', () => {
  test('on click emits', async () => {
    const { emitted } = render(BaseButton);

    await userEvent.click(screen.getByRole('button'));

    expect(emitted('click')).not.toBeUndefined();
  });
});
