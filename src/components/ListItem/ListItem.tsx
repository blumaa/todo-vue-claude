import { useMemo } from 'react';
import { type ListItemState } from '../../types';
import { BaseButton } from '../BaseButton';

interface ListItemProps {
  description: string;
  state?: ListItemState;
}

export const ListItem = ({ description, state = 'pending' }: ListItemProps) => {
  const listItemClasses = useMemo(() => {
    return {
      pending: '',
      done: 'line-through',
    }[state];
  }, [state]);

  return (
    <li
      className={`border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2 ${listItemClasses}`}
      aria-checked={state === 'done'}
    >
      <BaseButton>Complete</BaseButton>
      <div className="w-full">
        {description}
      </div>
      <BaseButton>Edit</BaseButton>
      <BaseButton>Remove</BaseButton>
    </li>
  );
};