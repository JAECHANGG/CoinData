import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useOutletContext } from "react-router-dom";

interface IHistoryData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

interface IFilterHistoryData {
  x: Date;
  y: number[];
}

export default function Chart() {
  // 하위 컴포넌트에서 useOutletContext()훅을 이용해서 props를 받아올 수 있다.
  const { coinId } = useOutletContext<ChartProps>();
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistoryData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      // refetchInterval: 5000,
    }
  );

  // ApexChart series props는 내가 보내고 싶은 data를 받는다.
  // series data [] 가 받아야 하는 건 number인데 나는 data?.map() 으로 읽어올때랑 아닐때를 구분해서 받아야 한다.
  // 읽어오면 number이지만 못 읽어오면 undefind가 되서 문제가 된다. 그래서 저 형식이 number로 강제해주면 해결된다.
  // 저 데이터는 number 배열이다! 라고 강제로 설정하기 => data?.map((price) => price.close) as number[]
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => ({
                x: new Date(price.time_close),
                y: [price.open, price.high, price.low, price.close],
              })) as IFilterHistoryData[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 400,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            xaxis: {
              // type: "datetime"이 categories에서 각각 뿌려주는 날짜를 day / Month 형식으로 나타내준다.
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
}
