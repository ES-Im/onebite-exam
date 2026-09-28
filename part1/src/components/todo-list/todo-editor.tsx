import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { createTodo } from "@/api/create-todo";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";

export default function TodoList() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [state, setState] = useState("");

  const onHandleClick = () => {
    mutate(state);
    setState("");
  };

  return (
    <div className="flex gap-2">
      <Input
        className="mr-1"
        placeholder="입력"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Button disabled={isPending} onClick={onHandleClick}>
        추가
      </Button>
    </div>
  );
}
