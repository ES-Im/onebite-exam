import { Link, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full w-full max-w-175 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-5" src={logo} alt="한입 로그의 로고" />
            <div className="font-bold">한입 로그</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              {/* shadcn/ui과 함께 제공되는 아이콘 팩(Lucide React 라이브러리) */}
              <SunIcon />
            </div>
            <img className="h-6" src={defaultAvatar} />
          </div>
        </div>
      </header>

      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        {/* 페이지 컴포넌트가 실제로 렌더링이 될 위치를 지정하는 컴포넌트 */}
        <Outlet />
      </main>

      <footer className="text-muted-foreground border-t py-10 text-center">
        @author
      </footer>
    </div>
  );
}
