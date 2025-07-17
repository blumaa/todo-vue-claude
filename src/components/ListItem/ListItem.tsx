import { useMemo } from "react";
import { type ListItemState } from "../../types";
import { BaseButton } from "../BaseButton";

interface ListItemProps {
  description: string;
  category: string;
  state?: ListItemState;
}

export const ListItem = ({
  description,
  category,
  state = "pending",
}: ListItemProps) => {
  const listItemClasses = useMemo(() => {
    return {
      pending: "",
      done: "line-through",
    }[state];
  }, [state]);

  return (
    <li
      className={`border border-neutral-300 rounded py-2 px-4 flex flex-row items-center gap-2 flex-justify-between ${listItemClasses}`}
      aria-checked={state === "done"}
    >
      <div className="flex flex-col">
        <div className="font-semibold">{description}</div>
        <div className="text-sm">{category}</div>
      </div>
      <div className="flex flex-col gap-1">
        <BaseButton>Complete</BaseButton>
        <BaseButton>Edit</BaseButton>
        <BaseButton>Remove</BaseButton>
      </div>
    </li>
  );
};

