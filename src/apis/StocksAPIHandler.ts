import Stock from "../types/Stock";

interface StockSuccessResponse {
  count: number;
  next_url?: string;
  results: Stock[];
  request_id: string;
  status: "OK";
}

interface StockFailureResponse {
  error: string;
  request_id: string;
  status: "ERROR";
}

type StockResponse = StockSuccessResponse | StockFailureResponse;

export const getStocksByExchange = (
  exchange: string,
  limit: number,
  search?: string
): Promise<StockResponse> => {
  const searchParams = new URLSearchParams({
    market: "stocks",
    active: "true",
    apiKey: process.env.API_KEY ?? "",
    limit: String(limit),
    exchange,
  });

  if (typeof search === "string") {
    searchParams.append("search", search);
  }

  return fetch(
    `${process.env.BASE_URL}/tickers?${searchParams.toString()}`
  ).then((response) => response.json());
};

export const getMoreStocks = (cursor: string): Promise<StockResponse> => {
  const searchParams = new URLSearchParams({
    cursor,
    apiKey: process.env.API_KEY ?? "",
  });

  return fetch(
    `${process.env.BASE_URL}/tickers?${searchParams.toString()}`
  ).then((response) => response.json());
};
