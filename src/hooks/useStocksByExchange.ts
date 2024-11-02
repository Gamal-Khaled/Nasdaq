import { useCallback, useState } from "react";

import Stock from "../types/Stock";
import useToggle from "./useToggle";
import { getMoreStocks, getStocksByExchange } from "../apis/StocksAPIHandler";
import { extractParam } from "../utils";

const useStocksByExchange = (exchange: string) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [stocksListCursor, setStocksListCursor] = useState<string | null>();

  const [loading, toggleLoading] = useToggle();
  const [loadingMore, toggleLoadingMore] = useToggle();

  const loadStocks = useCallback(() => {
    toggleLoading();
    return getStocksByExchange(exchange, 36)
      .then((response) => {
        if (response.status === "OK") {
          setStocks(response.results);
          if (response.next_url) {
            setStocksListCursor(extractParam(response.next_url, "cursor"));
          } else {
            setStocksListCursor(null);
          }
        } else {
          throw response;
        }
      })
      .finally(toggleLoading);
  }, []);

  const loadMore = useCallback(() => {
    if (stocksListCursor) {
      toggleLoadingMore();
      return getMoreStocks(stocksListCursor)
        .then((response) => {
          if (response.status === "OK") {
            setStocks((oldData) => [...oldData, ...response.results]);
            if (response.next_url) {
              setStocksListCursor(extractParam(response.next_url, "cursor"));
            } else {
              setStocksListCursor(null);
            }
          } else {
            throw response;
          }
        })
        .finally(toggleLoadingMore);
    }
  }, [stocksListCursor]);

  return {
    data: stocks,
    loading,
    loadingMore,
    loadStocks,
    loadMore,
  };
};

export default useStocksByExchange;
