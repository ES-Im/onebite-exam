import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { useTodosData } from "@/hooks/queries/use-todos-data";

export default function TodoList() {
  const { data: todoIds, isLoading, error } = useTodosData();
  if (error) return <div>에러!</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <div className="m-10 flex flex-col gap-5">
      <div className="text-bold text-2xl">TodoList</div>
      <TodoEditor />
      {todoIds?.map((id) => (
        <TodoItem key={id} id={id} />
      ))}
    </div>
  );
}
