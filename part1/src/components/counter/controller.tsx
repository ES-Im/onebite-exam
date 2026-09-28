import { useActions } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  const { increase, decrease } = useActions();

  return (
    <div className="m-10">
      <Button onClick={increase}>+</Button>
      <Button onClick={decrease}>-</Button>
    </div>
  );
}
