import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Outlet } from "react-router-dom";
import { CiLight, CiDark } from "react-icons/ci";

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IsDarkBtn = styled.div`
  padding: 20px 30px 0 0;
  cursor: pointer;
`;

export default function Header() {
  // Atom의 Value를 수정하기 위해서 useSetRecoilState()를 사용한다.
  // useState의 setState와 같은 방식으로 작동한다.
  // const setDarkAtom = useRecoilState(isDarkAtom);

  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Wrap>
        <IsDarkBtn onClick={toggleDarkAtom}>
          {darkAtom ? <CiLight fontSize={30} /> : <CiDark fontSize={30} />}
        </IsDarkBtn>
      </Wrap>
      <Outlet />
    </>
  );
}
