import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import CoinTable from "./CoinTable";

// 코인 안에 있는 값들의 타입
export interface ICoin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    };
  };
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>virtual asset</title>
      </Helmet>
      <Header>
        <Title>Virtual Asset Top 100</Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : <CoinTable data={data} />}
    </Container>
  );
}

export default Coins;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 850px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
