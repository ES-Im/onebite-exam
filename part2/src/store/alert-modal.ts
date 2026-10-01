import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void; // 확인 버튼 클릭
  onNegative?: () => void; // 취소 버튼 클릭
};

type CloseState = { isOpen: false };

type State = CloseState | OpenState; // 모달 오픈 여부

const initialState = {
  isOpen: false,
} as State; // isOpen 상태에 따라 OpenState로 추론될지 CloseState 타입으로 추론될지를 동적으로 관리

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          // isOpen 프로퍼티는 필요없으니 생략
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  return useAlertModalStore((store) => store.actions.open);
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  // 유니온 타입으로 리턴한 건 의도치 않은 방향으로 추론이 될 수 있어 as 단언
  return useAlertModalStore() as typeof store & State;
};
