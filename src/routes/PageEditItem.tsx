import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { TodoForm } from "../components/TodoForm";
import { selectTodoById } from "../selectors/todoSelectors";
import { RootState } from "../stores";

export const PageEditItem = () => {
  const { id } = useParams<{ id: string }>();
  const todo = useSelector((state: RootState) => selectTodoById(state, id!));

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return <TodoForm mode="edit" todo={todo} />;
};