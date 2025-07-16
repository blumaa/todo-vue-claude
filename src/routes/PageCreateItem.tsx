import { BaseCard } from '../components/BaseCard';
import { BaseButton } from '../components/BaseButton';

export const PageCreateItem = () => {
  const onSubmit = () => {};

  return (
    <BaseCard className="col-start-5 col-span-4 row-start-2 row-span-10">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="todo-name"> Name </label>
          <input className="border border-neutral-300 hover:border-neutral-500 rounded" id="todo-name" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="todo-category"> Category </label>
          <select
            className="border border-neutral-300 hover:border-neutral-500 rounded"
            id="todo-category"
          >
            <option value="Health">Health</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <BaseButton type="submit"> Submit </BaseButton>
      </form>
    </BaseCard>
  );
};