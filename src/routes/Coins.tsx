import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

// 코인 안에 있는 값들의 타임
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* 링크를 통해 데이터를 다른 화면으로 보낼 수 있는 방법 (비하인드 더 씬 or state) */}
              {/* 여기에서는 Coin.tsx로 이 파일에서 받아온 API 데이터들을 보내주는 것 */}
              {/* 굳이 두 번 받아올 필요 없이 성능면에서나 코드면에서 더 좋음 */}
              {/* 홈 화면을 거치지 않고 바로 Coin 상세페이지로 들어가면 클릭해서 state를 보내주지 않았기 때문에 즉, API를 받아오지 않았기 때문에 에러가 뜬다. */}
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {/* 각각의 코인이 갖고 있는 심볼 값이 주소의 마지막이랑 같기 때문에 동적으로 처리해줌 */}
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  // 패딩 값에 따라 a의 범위가 달라진다.
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  // Coin에 마우스를 올렸을 때 a태그를 타겟으로 함. => 여기에서 a태그는 Link태그
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
