import { useMemo } from "react";
import { type ListItemState } from "../../types";
import { BaseButton } from "../BaseButton";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { completeTodo, inCompleteTodo, removeTodo } from "../../stores/todoListStore";

interface ListItemProps {
  id: string;
  description: string;
  category: string;
  state?: ListItemState;
}

export const ListItem = ({
  id,
  description,
  category,
  state = "pending",
}: ListItemProps) => {
  const dispatch = useDispatch();

  const handleCompleteTodo = () => {
    dispatch(completeTodo({ id }));
  };

  const handleIncompleteTodo = () => {
    dispatch(inCompleteTodo({ id }));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo({ id }));
  };

  const listItemClasses = useMemo(() => {
    return {
      pending: "",
      done: "line-through",
    }[state];
  }, [state]);

  return (
    <li
      className={`border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2 flex-justify-between`}
      aria-checked={state === "done"}
    >
      <div className={`flex flex-col ${listItemClasses}`}>
        <div className="font-semibold">{description}</div>
        <div className="text-sm">{category}</div>
      </div>
      <div className="flex flex-col gap-1">
        {state === "done" ? (
          <BaseButton onClick={handleIncompleteTodo}>
            Mark as Not Done
          </BaseButton>
        ) : (
          <BaseButton onClick={handleCompleteTodo}>Complete</BaseButton>
        )}
        <Link to={`/edit/${id}`}>
          <BaseButton>Edit</BaseButton>
        </Link>
        <BaseButton onClick={handleRemoveTodo}>Remove</BaseButton>
      </div>
    </li>
  );
};
