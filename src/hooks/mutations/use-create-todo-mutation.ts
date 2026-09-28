import { createTodo } from "@/api/create-todo";
import { QUERY_KEY } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // ["todo", "list"] - detail 부분
      queryClient.setQueryData<Todo>(
        QUERY_KEY.todo.detail(newTodo.id),
        newTodo,
      );
      // ["todo", "detail"] - id 부분
      queryClient.setQueryData<string[]>(QUERY_KEY.todo.list, (prevTodoIds) => {
        if (!prevTodoIds) return [newTodo.id];
        return [...prevTodoIds, newTodo.id];
      });
    },
  });
}
