import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      const todos = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEY.todo.detail(todo.id), todo);
      });

      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEY.todo.list,
  });
}
