import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "store/root.reducer";
import { config, getUrl } from "../../config/config";
import {
  ApiPair,
  CurrencyActionType,
  GET_CURRENCY_LIST_SUCCESS,
  Pair,
  SELECT_CURRENCY_SUCCESS,
  UPDATE_PAIR_SUCCESS,
} from "./currency.types";

interface Instrument {
  symbol: string;
  order: number;
  visible: boolean;
}

interface InstrumentList {
  instrument: Instrument[];
}

const getHeaders = (socketId: string) => {
  return {
    headers: {
      Authorization: `Bearer ${socketId}${config.trading_api_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const getAvaiableList = () => async (
  dispatch: Dispatch<CurrencyActionType>,
  getState: () => RootState
) => {
  const url = `${getUrl()}/trading/get_instruments`;
  const socketId = getState().WebsocketReducer.socket?.id;

  const { data } = await axios.get(url, { ...getHeaders(socketId) });
  const { instrument }: InstrumentList = data.data;

  const exchangeSymbols = instrument
    .filter((i) => {
      return i.symbol.match(/\//);
    })
    .sort((a, b) => a.order - b.order)
    .reduce((prev, curr) => {
      return { ...prev, [curr.symbol]: { ...curr } };
    }, {});

  const allUniqueCurrency = Object.keys(exchangeSymbols).reduce(
    (prev, curr) => {
      const unique = curr.split("/").filter((s) => !prev.includes(s));
      return [...prev, ...unique];
    },
    [] as string[]
  );

  dispatch({
    type: GET_CURRENCY_LIST_SUCCESS,
    payload: {
      avaiableCurrency: allUniqueCurrency,
      currencyPairs: exchangeSymbols,
    },
  });

  subscribeAllPossibleCurrency()(dispatch, getState);
};

export const determineExchange = (from: string, pair: Pair) => {
  const key = Object.keys(pair)[0];
  const currencies = key.split("/");
  const index = currencies.indexOf(from);
  if (index === 0) {
    return { buy: pair[key].rate[0], sell: pair[key].rate[0] };
  } else {
    return { buy: 1 / pair[key].rate[0], sell: 1 / pair[key].rate[0] };
  }
};

export const SelectCurrencyAction = (
  { from, to } = { from: "None", to: "None" }
) => async (
  dispatch: Dispatch<CurrencyActionType>,
  getState: () => RootState
) => {
  if (from === "None" || to === "None") {
    dispatch({
      type: SELECT_CURRENCY_SUCCESS,
      payload: { from, to, rate: { buy: 0, sell: 0, ratio: 0 } },
    });
    return;
  }

  const entries = Object.entries(getState().CurrencyReducer.currencyPairs);

  const [key] =
    entries.find(([key]) => {
      return key.includes(from) && key.includes(to);
    }) || [];
  }


  // const pair = getState().CurrencyReducer.currencyPairs[key];
  // determineExchange(from, pair)
};

export const subscribeAllPossibleCurrency = () => async (
  dispatch: Dispatch<CurrencyActionType>,
  getState: () => RootState
) => {
  const url = `${getUrl()}/subscribe`;
  const { socket } = getState().WebsocketReducer;
  const { currencyPairs } = getState().CurrencyReducer;
  const currencyPairsKeys = Object.keys(currencyPairs);

  const { data } = await axios.post(
    url,
    { pairs: [...currencyPairsKeys] },
    { ...getHeaders(socket.id) }
  );

  data.pairs.forEach((pair: { Symbol: string; Rates: number[] }) => {
    updatePairRate({ [pair.Symbol]: { rate: [...pair.Rates] } })(
      dispatch,
      getState
    );
  });

  currencyPairsKeys.forEach((p) => {
    socket.on(`${p}`, (data: any) => {
      // updatePairRate({ [p]: { rate: [...JSON.parse(data).Rates] } })(
      //   dispatch,
      //   getState
      // );
    });
  });
};

export const updatePairRate = (pair: Pair) => async (
  dispatch: Dispatch<CurrencyActionType>,
  getState: () => RootState
) => {
  dispatch({ type: UPDATE_PAIR_SUCCESS, payload: pair });
};
