import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import { useParams } from "react-router";

export default function TodoDetailPage() {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, error } = useTodoDataById(String(id), "DETAIL");
  if (isLoading) return <div>로딩</div>;
  if (error) return <div> 에러</div>;
  return <div>{data?.content}</div>;
}
