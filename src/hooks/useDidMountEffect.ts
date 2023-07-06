import { useEffect, useRef } from "react";

// 최초 렌더링 시 useEffect 실행을 막아주는 hook 입니다.
// useRef : 값이 변해도 컴포넌트의 리렌더링이 일어나지 않고, 리렌더링이 일어나도 값이 유지되는 특징이 있습니다.
// 최초 렌더링  시 didMount 가 flase 이므로 if 문이 실행되지 않고 else 문이 실행되어 첫 렌더링 시 실행을 막아줍니다.

const useDidMountEffect = (func: () => void, deps: [string]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
