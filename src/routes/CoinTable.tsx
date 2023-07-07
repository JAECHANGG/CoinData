import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICoin } from "./Coins";

export default function CoinTable({ data }: { data: ICoin[] | undefined }) {
  const navigate = useNavigate();

  const detailPageNavigate = (coinId: string, coinName: string) => {
    navigate(`/${coinId}`, { state: coinName });
  };
  return (
    <TableFill>
      <thead>
        <Tr>
          <Th>순위</Th>
          <Th>종목</Th>
          <Th>기호</Th>
          <Th>가격(USD)</Th>
          <Th>총 시가</Th>
          <Th>거래량(24H)</Th>
          <Th>변동(24H)</Th>
          <Th>변동(7D)</Th>
        </Tr>
      </thead>
      <tbody>
        {data?.slice(0, 100).map((coin) => (
          <Tr
            key={coin.id}
            onClick={() => detailPageNavigate(coin.id, coin.name)}
          >
            <Td>{coin.rank}</Td>
            <Td
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              {coin.name}
            </Td>
            <Td>{coin.symbol}</Td>
            <Td>
              ${Number(coin.quotes.USD.price.toFixed(1)).toLocaleString()}
            </Td>
            <Td>{(coin.quotes.USD.market_cap / 1000000000000).toFixed(2)}T</Td>
            <Td>{(coin.quotes.USD.volume_24h / 1000000000000).toFixed(2)}T</Td>
            <Td>{coin.quotes.USD.percent_change_24h.toFixed(2)}%</Td>
            <Td>{coin.quotes.USD.percent_change_7d.toFixed(2)}%</Td>
          </Tr>
        ))}
      </tbody>
    </TableFill>
  );
}

const TableFill = styled.table`
  background: white;
  border-radius: 3px;
  border-collapse: collapse;
  height: 320px;
  margin: auto;
  max-width: 600px;
  padding: 5px;
  width: 100%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  animation: float 5s infinite;
  margin-bottom: 30px;
`;

const Th = styled.th`
  color: #d5dde5;
  background: #1b1e24;
  border-bottom: 4px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size: 16px;
  font-weight: 100;
  padding: 15px;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  vertical-align: middle;

  &:first-child {
    border-top-left-radius: 3px;
  }
  &:last-child {
    border-top-right-radius: 3px;
  }
`;

const Tr = styled.tr`
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #666b85;
  font-size: 16px;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);

  &:hover td {
    background: #4e5066;
    color: #ffffff;
    border-top: 1px solid #22262e;
    cursor: pointer;
  }
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
  &:nth-child(odd) td {
    background: #ebebeb;
  }
  &:nth-child(odd):hover td {
    background: #4e5066;
  }
  &:last-child td:first-child {
    border-bottom-left-radius: 3px;
  }
  &:last-child td:last-child {
    border-bottom-right-radius: 3px;
  }
`;

const Td = styled.td`
  background: #ffffff;
  padding: 20px;
  text-align: center;
  vertical-align: middle;
  font-weight: 300;
  font-size: 16px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #c1c3d1;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;
