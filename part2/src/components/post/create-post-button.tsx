import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import PostEditorModal from "../modal/post-editor-modal";
import { useOpenCreatePostModal } from "@/store/post-editor-modal";

export default function CreatePostButton() {
  const openCreatePostModal = useOpenCreatePostModal();

  return (
    <div
      onClick={openCreatePostModal}
      className="bg-muted text-muted-foreground rouded-xl cursor-pointer px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
}
