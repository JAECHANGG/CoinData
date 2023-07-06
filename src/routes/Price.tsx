import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchPriceHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useEffect, useState } from "react";

interface ITickerPriceData {
  market_cap: number;
  price: number;
  timestamp: string;
  volume_24h: number;
}

export default function Price() {
  const [selection, setSelection] = useState("one_month");
  const { coinId } = useParams();
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<ITickerPriceData[]>(
    ["price", coinId],
    () => fetchPriceHistory(coinId as string)
  );

  const upDateSelection = (timeline: string) => {
    setSelection((_) => timeline);
  };

  const upDateApexChart = (timeline: string) => {
    switch (timeline) {
      case "one_weekend":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date().getTime() - 60 * 60 * 24 * 7 * 1000,
          new Date().getTime()
        );
        break;
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date().getTime() - 60 * 60 * 24 * 30 * 1000,
          new Date().getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date().getTime() - 60 * 60 * 24 * 180 * 1000,
          new Date().getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date().getTime() - 60 * 60 * 24 * 364 * 1000,
          new Date().getTime()
        );
        break;
      default:
    }
  };

  useEffect(() => {
    // selection이 useState라서 비동기 작동을 하여 동기처리를 위한 useEffect를 사용함
    upDateApexChart(selection);
  }, [selection]);

  return (
    <>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <div>
          <div className="toolbar">
            <button
              onClick={() => upDateSelection("one_weekend")}
              className={selection === "one_weekend" ? "active" : ""}
            >
              1W
            </button>
            &nbsp;
            <button
              onClick={() => upDateSelection("one_month")}
              className={selection === "one_month" ? "active" : ""}
            >
              1M
            </button>
            &nbsp;
            <button
              onClick={() => upDateSelection("six_months")}
              className={selection === "six_months" ? "active" : ""}
            >
              6M
            </button>
            &nbsp;
            <button
              onClick={() => upDateSelection("one_year")}
              className={selection === "one_year" ? "active" : ""}
            >
              1Y
            </button>
          </div>
          <ApexChart
            type="area"
            series={[
              {
                name: "Price",
                data: data?.map((price) => [
                  price.timestamp,
                  price.price,
                ]) as [],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                id: "area-datetime",
                type: "area",
                height: 400,
                width: 500,
                zoom: {
                  autoScaleYaxis: true,
                },
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              xaxis: {
                type: "datetime",
                tickAmount: 6,
              },
              dataLabels: {
                enabled: false,
              },
              tooltip: {
                x: {
                  format: "dd MMM yyyy",
                },
              },
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.7,
                  stops: [0, 100],
                },
              },
            }}
            selection={selection}
          />
        </div>
      )}
    </>
  );
}
