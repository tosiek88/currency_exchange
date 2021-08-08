import { keys } from "@material-ui/core/styles/createBreakpoints";
import {
  CurrencyActionType,
  GET_CURRENCY_LIST_SUCCESS,
  INIT,
  UPDATE_PAIR_SUCCESS,
} from "./currency.types";

export interface CurrencyState {
  currentState: string;
  avaiableCurrency: string[];
  currencyPairs: {
    [x: string]: { symbol: string; visible: boolean; order: number };
  };
  baseCurrenty: string;
}
const initState: CurrencyState = {
  currentState: INIT,
  avaiableCurrency: [],
  baseCurrenty: "EUR/USD",
  currencyPairs: {},
};

const CurrencyReducer = (
  state = { ...initState },
  action: CurrencyActionType
): CurrencyState => {
  switch (action.type) {
    case INIT:
      //or get from  local store
      return state;
    case GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        currentState: GET_CURRENCY_LIST_SUCCESS,
        currencyPairs: { ...action.payload?.currencyPairs },
        avaiableCurrency: [...action.payload?.avaiableCurrency],
      };
    case UPDATE_PAIR_SUCCESS: {
      const [key, value] = Object.entries(action.payload)[0];
      return {
        ...state,
        currencyPairs: {
          ...state.currencyPairs,
          [key]: { ...state.currencyPairs[key], ...value },
        },
      };
    }
    default:
      return state;
  }
};

export { CurrencyReducer };
