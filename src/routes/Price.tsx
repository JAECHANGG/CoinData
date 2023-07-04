import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { PriceData } from "./Coin";

interface PriceProps {
  tickersData: PriceData;
}

const PriceBox = styled.div`
  /* border-bottom: 1px dashed black; */
  padding: 10px;
`;

const PriceSpan = styled.span``;

export default function Price() {
  const { tickersData } = useOutletContext<PriceProps>();

  return (
    <>
      <PriceBox>
        <span
          style={{
            color:
              tickersData.quotes.USD.percent_change_15m > 0 ? "blue" : "red",
          }}
        >
          percent of 15 minute ago :{" "}
          {+tickersData.quotes.USD.percent_change_15m} %
        </span>
      </PriceBox>
      <PriceBox>
        <span
          style={{
            color:
              tickersData.quotes.USD.percent_change_30m > 0 ? "blue" : "red",
          }}
        >
          percent of 30 minute ago : {tickersData.quotes.USD.percent_change_30m}{" "}
          %
        </span>
      </PriceBox>
      <PriceBox>
        <span
          style={{
            color:
              tickersData.quotes.USD.percent_change_1h > 0 ? "blue" : "red",
          }}
        >
          percent of 1 hour ago : {tickersData.quotes.USD.percent_change_1h} %
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          percent of 6 hour ago : {tickersData.quotes.USD.percent_change_6h} %
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          percent of 1 day ago : {tickersData.quotes.USD.percent_change_24h} %
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          percent of 1 weekend ago : {tickersData.quotes.USD.percent_change_7d}{" "}
          %
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          percent of 1 month ago :{tickersData.quotes.USD.percent_change_30d} %
        </span>
      </PriceBox>
      <PriceBox>
        <span>
          percent of 1 year ago : {tickersData.quotes.USD.percent_change_1y} %
        </span>
      </PriceBox>
    </>
  );
}
