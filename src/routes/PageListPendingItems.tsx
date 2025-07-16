import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BaseCard } from '../components/BaseCard';
import { ListItem } from '../components/ListItem';
import { type RootState } from '../stores';

export const PageListPendingItems = () => {
  const list = useSelector((state: RootState) => state.todoList.list);

  const hasItems = useMemo(() => {
    return !!list.length;
  }, [list.length]);

  return (
    <BaseCard className="col-start-5 col-span-4 row-start-2 row-span-10">
      {!hasItems && <div>No pending Items</div>}

      <ul className="flex flex-col gap-3">
        <ListItem description="Make the Todo list work" />
        <ListItem description="Make the ListItem Component" state="done" />
      </ul>
    </BaseCard>
  );
};