import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CiLight, CiDark, CiHome } from "react-icons/ci";

function Header() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const [darkAtom, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <>
      <Wrap>
        {coinId && (
          <IsHomeBtn onClick={() => navigate("/CoinData")}>
            <CiHome fontSize={30} />
          </IsHomeBtn>
        )}
        <IsDarkBtn onClick={toggleDarkAtom}>
          {darkAtom ? <CiLight fontSize={30} /> : <CiDark fontSize={30} />}
        </IsDarkBtn>
      </Wrap>
      <Outlet />
    </>
  );
}

export default Header;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IsHomeBtn = styled.div`
  padding: 20px 30px 0 0;
  cursor: pointer;
`;

const IsDarkBtn = styled.div`
  padding: 20px 30px 0 0;
  cursor: pointer;
`;
