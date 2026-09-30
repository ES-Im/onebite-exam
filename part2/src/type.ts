import { type Database } from "@/database.typs";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  onMutate?: () => void;
};

export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
