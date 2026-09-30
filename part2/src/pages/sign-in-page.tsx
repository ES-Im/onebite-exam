import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@/hooks/mutation/use-sign-in";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithOAuth } from "@/hooks/mutation/use-sign-in-with-oauth";
import { generateErrorMessage } from "@/lib/error";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn } = useSignIn({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      setPassword("");
    },
  });

  const { mutate: signInWithOAuth } = useSignInWithOAuth({
    onError: (error) => {
      toast(generateErrorMessage(error), { position: "top-center" });
    },
  });
  const handleSignInClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signIn({ email, password });
  };

  const handleSignInWithAOuthClick = () => {
    signInWithOAuth("github");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">Sign-in</div>
      <div className="flex flex-col gap-2">
        <Input
          className="py-6"
          type="email"
          placeholder="exaple@naver.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="py-6"
          type="password"
          placeholder="xxx"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={handleSignInClick} className="w-full">
          로그인
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={handleSignInWithAOuthClick}
        >
          <img className="h-full" src={gitHubLogo} />
          GitHub 로그인
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link to={"/sign-up"} className="text-muted-foreground hover:underline">
          계정이 없다면? 회원가입
        </Link>
        <Link
          to={"/forget-password"}
          className="text-muted-foreground hover:underline"
        >
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
