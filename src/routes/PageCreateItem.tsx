import { BaseCard } from "../components/BaseCard";
import { BaseButton } from "../components/BaseButton";
import { useDispatch } from "react-redux";
import { addTodo } from "../stores/todoListStore";
import { CategoryType } from "@/types";

export const PageCreateItem = () => {
  const dispatch = useDispatch();
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    //add todo to the redux store
    evt.preventDefault();
    console.log("evt", evt.target);

    const formData = new FormData(evt.currentTarget);
    const name = formData.get("todo-name") as string;
    const category = formData.get("todo-category") as CategoryType;

    if (name.trim()) {
      dispatch(
        addTodo({
          id: crypto.randomUUID(),
          description: name,
          category,
          state: "pending",
        }),
      );
      evt.currentTarget.reset();
    }
  };

  return (
    <BaseCard className="flex-1 max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="todo-name"> Name </label>
          <input
            className="border border-neutral-300 hover:border-neutral-500 rounded"
            id="todo-name"
            name="todo-name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="todo-category"> Category </label>
          <select
            className="border border-neutral-300 hover:border-neutral-500 rounded"
            id="todo-category"
            name="todo-category"
            required
          >
            <option value={CategoryType.Health}>Health</option>
            <option value={CategoryType.Work}>Work</option>
            <option value={CategoryType.Personal}>Personal</option>
          </select>
        </div>
        <BaseButton type="submit"> Submit </BaseButton>
      </form>
    </BaseCard>
  );
};
