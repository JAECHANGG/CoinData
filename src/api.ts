import axios from "axios";

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  const { data } = await axios.get(`${BASE_URL}/tickers`);
  try {
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCoinInfo(coinId: string) {
  const { data } = await axios.get(`${BASE_URL}/coins/${coinId}`);
  try {
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCoinTickers(coinId: string) {
  const { data } = await axios.get(`${BASE_URL}/tickers/${coinId}`);
  try {
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchCoinHistory(coinId: string) {
  const { data } = await axios.get(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  );
  try {
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchPriceHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 364;
  const { data } = await axios.get(
    `${BASE_URL}/tickers/${coinId}/historical?start=${startDate}&interval=1d`
  );
  try {
    return data;
  } catch (e) {
    console.log(e);
  }
}
