import _ from "lodash";
import { useSelector } from "react-redux";
import { ApiPair, Pair } from "store/reducers/currency/currency.types";
import { RootState } from "store/root.reducer";

export const useSelctedCurrency = () =>
  useSelector<RootState, { from: string; to: string }>(
    (state) => state.CurrencyReducer.exchange,
    _.isEqual
  );

export const useCurrenciesSelector = (from: string) =>
  useSelector<RootState, { fromCurrencies: string[]; toCurrencies: string[] }>(
    (state) => {
      const currencyPairKeys = Object.keys(state.CurrencyReducer.currencyPairs);
      const getAvaialbeCurrency = (from: string) => {
        return currencyPairKeys
          .filter((currencyKey) => {
            const match = currencyKey.includes(from);
            return match;
          })
          .map((currencyPair: string) => {
            return currencyPair
              .split("/")
              .filter((currency) => currency !== from)[0];
          });
      };
      return {
        fromCurrencies: [...state.CurrencyReducer.avaiableCurrency, "None"],
        toCurrencies: [...getAvaialbeCurrency(from), "None"],
      };
    },
    _.isEqual
  );

const getPair = (from: string, to:string, currencyPairs: ApiPair) => {
  const entries = Object.entries(currencyPairs);
  const [key] = entries.find(([key]) => {
    return key.includes(from) && key.includes(to);
  }) || ["None/None"];

  return currencyPairs[key];
};

export const useExchangeSelector = () =>
  useSelector<RootState,{ buy: number; sell: number; from: string; to: string }
  >((state) => {
    const { from, to } = state.CurrencyReducer.exchange;
    if (from === "None" || to === "None") {
        return { buy: 1, sell: 1, from, to };
    }
  const { currencyPairs } = state.CurrencyReducer;
    const pair = getPair(from,to, currencyPairs);
    return { ...determineExchange(from, pair), from, to };
  }, _.isEqual);


export const useRatioSelector = ({ from, to }: { from: string; to: string }) =>
  useSelector<RootState, { buy: number; sell: number }>((state) => {
    if (from === "None" || to === "None") {
      return { buy: 1, sell: 1, from, to };
    }
    const { currencyPairs } = state.CurrencyReducer;
    const pair = getPair(from, to, currencyPairs);
    return { ...determineExchange(from, pair), from, to };
  }, _.isEqual);



export const returnEmptyIfNone = (currency: string) =>
  currency === "None" ? "" : currency;

export const determineExchange = (from: string, pair: Pair) => {
  const currencies = pair.symbol.split("/");
  const index = currencies.indexOf(from);
  if (pair.rate === undefined) {
    return { buy: 1, sell: 1 };
  }
  const rate = pair.rate || [];

  if (index === 0) {
    return { buy: rate[1], sell: rate[0] };
  } else {
    return { buy: 1 / rate[1], sell: 1 / rate[0] };
  }
};
