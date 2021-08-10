export const INIT = "INIT";
export const GET_CURRENCY_LIST_SUCCESS = "GET_CURRENCY_LIST_SUCCESS";
export const UPDATE_PAIR_SUCCESS = "UPDATE_PAIR_SUCCESS";
export const SELECT_CURRENCY_SUCCESS = "SELECT_CURRENCY_SUCCESS";
export const SET_AMOUNT_SUCCESS = "SET_AMOUNT_SUCCESS";

export interface ApiPair {
  [x: string]: {
    symbol: string;
    visible: boolean;
    order: number;
    rate?: number[];
  };
}

export interface Pair {
  symbol: string;
  visible: boolean;
  order: number;
  rate?: number[];
}

export interface CurrencyState {
  currentState: string;
  avaiableCurrency: string[];
  currencyPairs: ApiPair;
  baseCurrenty: string;
  exchange: Exchange;
  amount: number;
}

export interface Rate {
  sell: number;
  buy: number;
  ratio: number;
}

export interface Exchange {
  from: string;
  to: string;
  rate: Rate;
}

interface InitActionType {
  type: typeof INIT;
}

interface GetCurrencyListSuccessAction {
  type: typeof GET_CURRENCY_LIST_SUCCESS;
  payload: {
    avaiableCurrency: string[];
    currencyPairs: ApiPair;
  };
}

interface UpdatePairSuccessAction {
  type: typeof UPDATE_PAIR_SUCCESS;
  payload: { [x: string]: { rate: number[] } };
}

interface SelectCurrencySuccessAction {
  type: typeof SELECT_CURRENCY_SUCCESS;
  payload: Exchange;
}

interface SetAmountSuccessAction {
  type: typeof SET_AMOUNT_SUCCESS;
  payload: { amount: number };
}

export type CurrencyActionType =
  | InitActionType
  | GetCurrencyListSuccessAction
  | UpdatePairSuccessAction
  | SelectCurrencySuccessAction
  | SetAmountSuccessAction;
