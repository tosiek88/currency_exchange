import {
  CurrencyActionType,
  GET_CURRENCY_LIST_SUCCESS,
  INIT,
  UPDATE_PAIR_SUCCESS,
  SELECT_CURRENCY_SUCCESS,
  SET_AMOUNT_SUCCESS,
  CurrencyState,
} from "./currency.types";

const initState: CurrencyState = {
  currentState: INIT,
  avaiableCurrency: ["None"],
  baseCurrenty: "EUR/USD",
  currencyPairs: {
    "None/None": { symbol: "None/None", visible: true, order: 0, rate:[]},
  },
  exchange: { from: "None", to: "None", rate: { sell: 0, buy: 0, ratio: 0 } },
  amount: 0,
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
        currentState: UPDATE_PAIR_SUCCESS,
        currencyPairs: {
          ...state.currencyPairs,
          [key]: { ...state.currencyPairs[key], ...value },
        },
      };
    }
    case SELECT_CURRENCY_SUCCESS: {
      return {
        ...state,
        currentState: SELECT_CURRENCY_SUCCESS,
        exchange: action.payload,
      };
    }
    case SET_AMOUNT_SUCCESS: {
      return {
        ...state,
        currentState: SET_AMOUNT_SUCCESS,
        amount: action.payload.amount,
      };
    }
    default:
      return state;
  }
};

export { CurrencyReducer };
