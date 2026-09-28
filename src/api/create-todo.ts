import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

export async function createTodo(content: string) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      // id는 자동으로 생성된다.
      content,
      isDone: false,
    }),
  });

  if (!response.ok) throw new Error("error");
  const data: Todo = await response.json();

  return data;
}
