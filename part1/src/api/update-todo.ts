import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";
// update - PUT 같은 성질 - 선택적 프라퍼티여야함 => Partial
// id는 필수값이므로 &로 표시
export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("update err");
  const data: Todo = await response.json();
  return data;
}
