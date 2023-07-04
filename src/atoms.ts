import { atom } from "recoil";

// atom은 두 가지를 요구하는데 첫 번째는 key로 유니크해야한다.
// 두 번째는 default 값이 필요하다.

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
