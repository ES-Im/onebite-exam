import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetEmail } from "@/hooks/mutation/use-request-password-reset-email";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("발송 성공", {
        position: "top-center",
      });
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") return;
    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 찾기</div>
        <div className="text-muted-foreground">인증 링크 발송</div>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          disabled={isRequestPasswordResetEmailPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          placeholder="email"
        />
        <Button
          className="w-full"
          onClick={handleSendEmailClick}
          disabled={isRequestPasswordResetEmailPending}
        >
          인증 메일 요청하기
        </Button>
      </div>
    </div>
  );
}
