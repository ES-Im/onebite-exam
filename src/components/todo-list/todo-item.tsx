import { Button } from "../ui/button";
import { Link } from "react-router";
import type { Todo } from "@/types";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation";
import { useDeleteTodo } from "@/store/todos";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");
  if (!todo) throw new Error("Todo Data Undefined");
  const { content, isDone } = todo;

  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const { mutate: updateTodo } = useUpdateTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const handleCheckbocClick = () => {
    updateTodo({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border-1 p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeleteTodoPending}
          type={"checkbox"}
          checked={isDone}
          onChange={handleCheckbocClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>

      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant="destructive"
      >
        삭제
      </Button>
    </div>
  );
}
