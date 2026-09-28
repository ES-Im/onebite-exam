import { create } from "zustand";
import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine({ count: 0 }, (set, get) => ({
            actions: {
              increase: () => {
                set((state) => {
                  state.count += 1;
                });
              },
              decrease: () => {
                set((state) => {
                  state.count -= 1;
                });
              },
            },
          })),
        ),
      ),
      // persist 두번째 인수
      {
        name: "countStore", // 스토리지 이름
        partialize: (store) => ({
          count: store.count,
        }),
        storage: createJSONStorage(() => sessionStorage), // 로컬이 아닌 세션스토리지에 저장
      },
    ),
    // devtools 두번째 인수
    {
      name: "countStore",
    },
  ),
);

useCountStore.subscribe(
  (store) => store.count, // 셀렉터 : 구독 대상
  (count, prevCount) => {
    // 리스너 : (현재 값, 이전 값)
    console.log(count, prevCount);
    const store = useCountStore.getState(); // store의 값을 불러오기도 가능
    // useCountStore.setState((store) => ({ }))
  },
);

export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useActions = () => {
  return useCountStore((store) => store.actions);
};
