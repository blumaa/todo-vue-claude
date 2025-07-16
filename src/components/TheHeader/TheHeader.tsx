import { BaseCard } from "../BaseCard";
import { Link } from "react-router-dom";

export const TheHeader = () => {
  return (
    <BaseCard className="col-span-full grid auto-flow-col items-center">
      <h3>Page Name</h3>
      <div className="grid auto-flow-col gap-2 justify-end">
        <Link to="/create" className="btn">
          Create
        </Link>
        <Link to="/list-pending" className="btn">
          Pending
        </Link>
        <Link to="/list-done" className="btn">
          Done
        </Link>
      </div>
    </BaseCard>
  );
};

