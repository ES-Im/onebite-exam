import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdataPassword } from "@/hooks/mutation/auth/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { mutate: updatePw, isPending } = useUpdataPassword({
    onSuccess: () => {
      toast.info("성공", { position: "top-center" });
      navigate("/");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
      setPassword("");
    },
  });

  const handleUpdataPasswordClick = () => {
    if (password.trim() === "") return;
    updatePw(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">비밀번호 바꾸기</div>
        <div className="text-muted-foreground">인증 링크 발송</div>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          placeholder="email"
        />
        <Button
          disabled={isPending}
          className="w-full"
          onClick={handleUpdataPasswordClick}
        >
          비밀번호 변경하기
        </Button>
      </div>
    </div>
  );
}
