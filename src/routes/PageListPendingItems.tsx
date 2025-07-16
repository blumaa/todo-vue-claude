import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BaseCard } from "../components/BaseCard";
import { ListItem } from "../components/ListItem";
import { type RootState } from "../stores";
import type { ListItem as ListItemType } from "@/types";

export const PageListPendingItems = () => {
  // Select the todos from the Redux store and filter for pending items
  const todos = useSelector((state: RootState) => state.todoList.todos.filter((todo => todo.state === "pending")));

  const hasItems = useMemo(() => {
    return !!todos.length;
  }, [todos.length]);

  return (
    <BaseCard className="col-start-5 col-span-4 row-start-2 row-span-10">
      {!hasItems && <div>No pending Items</div>}

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

