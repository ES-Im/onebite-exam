import { updatePassword } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useUpdataPassword(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onError: (error) => {
      if (callback?.onError) callback.onError(error);
    },
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
  });
}
