import { BaseCard } from "../BaseCard";
import { BaseButton } from "../BaseButton";
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
    <BaseCard className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
      <h3 className="text-lg font-semibold">
        {getPageName(location.pathname)}
      </h3>
      <div className="flex gap-2">
        <Link to="/create" className="btn">
          <BaseButton>Create</BaseButton>
        </Link>
        <Link to="/list-pending" className="btn">
          <BaseButton>Pending</BaseButton>
        </Link>
        <Link to="/list-done" className="btn">
          <BaseButton>Done</BaseButton>
        </Link>
      </div>
    </BaseCard>
  );
};
