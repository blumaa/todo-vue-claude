import { useMemo } from "react";
import { type ListItemState } from "../../types";
import { BaseButton } from "../BaseButton";

interface ListItemProps {
  description: string;
  category: string;
  state?: ListItemState;
  handleComplete?: () => void;
  handleIncomplete?: () => void;
}

export const ListItem = ({
  description,
  category,
  state = "pending",
  handleComplete,
  handleIncomplete,
}: ListItemProps) => {

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
          <BaseButton onClick={handleIncomplete}>
            Mark as Not Done
          </BaseButton>
        ) : (
          <BaseButton onClick={handleComplete}>Complete</BaseButton>
        )}
        <BaseButton>Edit</BaseButton>
        <BaseButton>Remove</BaseButton>
      </div>
    </li>
  );
};
