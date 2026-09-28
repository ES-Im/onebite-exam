import { updateTodo } from "@/api/update-todo";
import { QUERY_KEY } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/types";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEY.todo.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEY.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            // 업데이트 된 것만 업데이트
            ...prevTodo,
            ...updatedTodo,
          };
        },
      );

      return {
        prevTodo,
      };
    },

    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEY.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },

    // onSettled는 useTodoDataById에서 타입(LIST or DETAIL) 별로
    // 패칭 enabled 설정했기 때문에 제거
  });
}
