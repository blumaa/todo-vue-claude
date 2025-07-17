import { useMemo } from "react";
import { BaseCard } from '../components/BaseCard';
import { useSelector } from "react-redux";
import { ListItem } from "../components/ListItem";
import { selectDoneTodos } from "../selectors/todoSelectors";
import type { ListItem as ListItemType } from "@/types";
import { useDispatch } from "react-redux";
import { inCompleteTodo } from "../stores/todoListStore";

export const PageListDoneItems = () => {
  const todos = useSelector(selectDoneTodos);
  const dispatch = useDispatch();

  const handleIncompleteTodo = (id: string) => {
    dispatch(inCompleteTodo({ id }));
  };

  const hasItems = useMemo(() => {
    return !!todos.length;
  }, [todos.length]);

  return (
    <BaseCard className="flex-1 min-w-md mx-auto">
      {!hasItems && <div>No Completed Items. Get to work!</div>}

      <ul className="flex flex-col gap-3">
        {todos
          .map((todo: ListItemType) => (
            <ListItem
              key={todo.id}
              description={todo.description}
              category={todo.category}
              state={todo.state}
              handleIncomplete={() => handleIncompleteTodo(todo.id)}
            />
          ))}
      </ul>
    </BaseCard>
  );
};
