import { BaseCard } from '../BaseCard';

export const TheHeader = () => {
  return (
    <BaseCard className="col-span-full grid auto-flow-col items-center">
      <h3>Page Name</h3>
      <div className="grid auto-flow-col gap-2 justify-end">
        <button>Create</button>
        <button>Pending</button>
        <button>Done</button>
      </div>
    </BaseCard>
  );
};