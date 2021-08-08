import {
  CurrencyActionType,
  GET_CURRENCY_LIST_SUCCESS,
  INIT,
} from "./currency.types";

export interface CurrencyState {
  currentState: string;
  avaiableCurrency: string[];
  currencyPairs: {[x:string]:{symbol:string, visible:boolean, order:number}};
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
        avaiableCurrency: [...action.payload?.avaiableCurrency]
      };
    default:
      return state;
  }
};

export { CurrencyReducer };
