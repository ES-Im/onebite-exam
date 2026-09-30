import { requestPasswordResetEmail } from "@/api/auth";
import type { UseMutationCallback } from "@/type";
import { useMutation } from "@tanstack/react-query";

export function useRequestPasswordResetEmail(callback?: UseMutationCallback) {
  return useMutation({
    mutationFn: requestPasswordResetEmail,
    onSuccess: () => {
      if (callback?.onSuccess) callback.onSuccess();
    },
    onError: (error) => {
      if (callback?.onError) callback.onError(error);
    },
  });
}
