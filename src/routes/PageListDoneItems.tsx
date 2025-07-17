import { useMemo } from "react";
import { BaseCard } from '../components/BaseCard';
import { useSelector } from "react-redux";
import { ListItem } from "../components/ListItem";
import { selectDoneTodos } from "../selectors/todoSelectors";
import type { ListItem as ListItemType } from "@/types";

export const PageListDoneItems = () => {
  const todos = useSelector(selectDoneTodos);

  const hasItems = useMemo(() => {
    return !!todos.length;
  }, [todos.length]);

  return (
    <BaseCard className="flex-1 max-w-2xl mx-auto">
      {!hasItems && <div>No Completed Items. Get to work!</div>}

      <ul className="flex flex-col gap-3">
        {todos
          .map((todo: ListItemType) => (
            <ListItem
              key={todo.id}
              description={todo.description}
              state={todo.state}
            />
          ))}
      </ul>
    </BaseCard>
  );
};
