import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BaseCard } from "../components/BaseCard";
import { ListItem } from "../components/ListItem";
import { type RootState } from "../stores";
import type { ListItem as ListItemType } from "@/types";

export const PageListPendingItems = () => {
  const { todos }= useSelector((state: RootState) => state.todoList);

  const hasItems = useMemo(() => {
    return !!todos.length;
  }, [todos.length]);

  return (
    <BaseCard className="col-start-5 col-span-4 row-start-2 row-span-10">
      {!hasItems && <div>No pending Items</div>}

      <ul className="flex flex-col gap-3">
        {todos
          .filter((todo: ListItemType) => todo.state === "pending")
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

