import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: (deletedTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEY.todo.detail(deletedTodo.id),
      });

      queryClient.setQueryData<string[]>(QUERY_KEY.todo.list, (prevTodoIds) => {
        if (!prevTodoIds) return [];
        return prevTodoIds.filter((id) => id !== deletedTodo.id);
      });
    },
  });
}
