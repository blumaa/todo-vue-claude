import { BaseCard } from "../BaseCard";
import { BaseButton } from "../BaseButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo, updateTodo } from "../../stores/todoListStore";
import { CategoryType, ListItem } from "@/types";

interface TodoFormProps {
  mode: 'create' | 'edit';
  todo?: ListItem; // Only required when mode is 'edit'
}

export const TodoForm = ({ mode, todo }: TodoFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    
    const formData = new FormData(evt.currentTarget);
    const name = formData.get("todo-name") as string;
    const category = formData.get("todo-category") as CategoryType;

    if (name.trim()) {
      if (mode === 'create') {
        dispatch(addTodo({
          id: crypto.randomUUID(),
          description: name,
          category,
          state: "pending",
        }));
      } else {
        dispatch(updateTodo({
          id: todo!.id,
          description: name,
          category,
        }));
      }
      navigate("/list-pending");
    }
  };

  return (
    <BaseCard className="flex-1 max-w-md mx-auto">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="todo-name">Name</label>
          <input
            className="border border-neutral-300 hover:border-neutral-500 rounded"
            id="todo-name"
            name="todo-name"
            defaultValue={mode === 'edit' ? todo?.description : ''}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="todo-category">Category</label>
          <select
            className="border border-neutral-300 hover:border-neutral-500 rounded"
            id="todo-category"
            name="todo-category"
            defaultValue={mode === 'edit' ? todo?.category : CategoryType.Health}
            required
          >
            <option value={CategoryType.Health}>Health</option>
            <option value={CategoryType.Work}>Work</option>
            <option value={CategoryType.Personal}>Personal</option>
          </select>
        </div>
        <BaseButton type="submit">
          {mode === 'create' ? 'Submit' : 'Update'}
        </BaseButton>
      </form>
    </BaseCard>
  );
};