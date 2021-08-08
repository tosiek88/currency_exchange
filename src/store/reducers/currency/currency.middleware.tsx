import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "store/root.reducer";
import { config, getUrl } from "../../config/config";
import {
  CurrencyActionType,
  GET_CURRENCY_LIST_SUCCESS,
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
    .map((i) => i.symbol);

  const allUniqueCurrency = exchangeSymbols.reduce((prev, curr) => {
    const unique = curr.split("/").filter((s) => !prev.includes(s));
    return [...prev, ...unique];
  }, [] as string[]);

  dispatch({
    type: GET_CURRENCY_LIST_SUCCESS,
    payload: {
      avaiableCurrency: allUniqueCurrency,
      currencyPairs: exchangeSymbols,
    },
  });

  subscribeAllPossibleCurrency()(dispatch, getState);
};

export const subscribeAllPossibleCurrency = () => async (
  dispatch: Dispatch<CurrencyActionType>,
  getState: () => RootState
) => {
  const url = `${getUrl()}/subscribe`;
  const socketId = getState().WebsocketReducer.socket?.id;
  const pairs = getState().CurrencyReducer.currencyPairs

  const data = await axios.post(
    url,
    { pairs:[...pairs]},
    { ...getHeaders(socketId) }
  );
  console.debug(data);
};

