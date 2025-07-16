import { BaseCard } from '../components/BaseCard';
import { useSelector } from "react-redux";
import { type RootState } from "../stores";
import { ListItem } from "../components/ListItem";
import type { ListItem as ListItemType } from "@/types";

export const PageListDoneItems = () => {
  const { todos }= useSelector((state: RootState) => state.todoList);

  return (
    <BaseCard className="col-start-5 col-span-4 row-start-2">
      <ul className="flex flex-col gap-3">
        {todos
          .filter((todo: ListItemType) => todo.state === "done")
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
