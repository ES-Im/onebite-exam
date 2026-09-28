import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { combine } from "zustand/middleware";
import type { Todo } from "@/types";

const initialState: {
  todos: Todo[];
} = {
  todos: [],
};

const useTodosStore = create(
  immer(
    combine(initialState, (set) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            state.todos.push({
              id: new Date().getTime(),
              content: content,
            });
          });
        },
        deleteTodo: (targetId: number) => {
          set((state) => {
            state.todos = state.todos.filter((it) => it.id !== targetId);
          });
        },
      },
    })),
  ),
);

export const useCreateTodo = () => {
  return useTodosStore((store) => store.actions.createTodo);
};

export const useDeleteTodo = () => {
  return useTodosStore((store) => store.actions.deleteTodo);
};

export const useTodo = () => {
  return useTodosStore((store) => store.todos);
};
