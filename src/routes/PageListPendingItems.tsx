import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BaseCard } from "../components/BaseCard";
import { ListItem } from "../components/ListItem";
import { selectPendingTodos } from "../selectors/todoSelectors";
import type { ListItem as ListItemType } from "@/types";

export const PageListPendingItems = () => {
  // Use memoized selector to prevent unnecessary re-renders
  const todos = useSelector(selectPendingTodos);

  const hasItems = useMemo(() => {
    return !!todos.length;
  }, [todos.length]);

  return (
    <BaseCard className="flex-1 min-w-md mx-auto">
      {!hasItems && <div>No pending Items</div>}

      <ul className="flex flex-col gap-3">
        {todos
          .map((todo: ListItemType) => (
            <ListItem
              key={todo.id}
              description={todo.description}
              category={todo.category}
              state={todo.state}
            />
          ))}
      </ul>
    </BaseCard>
  );
};

