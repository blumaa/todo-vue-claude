import { BaseCard } from "../BaseCard";
import { Link, useLocation } from "react-router-dom";

export const TheHeader = () => {
  const location = useLocation();

  const getPageName = (pathname: string): string => {
    switch (pathname) {
      case "/create":
        return "Create Todo";
      case "/list-pending":
        return "Pending Todos";
      case "/list-done":
        return "Completed Todos";
      case "/":
        return "Home";
      default:
        return "Todo App";
    }
  };

  return (
    <BaseCard className="col-span-full grid auto-flow-col items-center">
      <h3>{getPageName(location.pathname)}</h3>
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
