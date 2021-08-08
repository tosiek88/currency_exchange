export const INIT = "INIT";
export const GET_CURRENCY_LIST_SUCCESS = "GET_CURRENCY_LIST_SUCCESS";
export const UPDATE_PAIR_SUCCESS = "UPDATE_PAIR_SUCCESS";

interface InitActionType{
  type: typeof INIT;
}

interface GetCurrencyListSuccessAction{
  type: typeof GET_CURRENCY_LIST_SUCCESS
  payload: {avaiableCurrency:string[], 
  currencyPairs:{[x:string]:{symbol:string, visible:boolean, order:number}}};
}

interface UpdatePairSuccessAction{
  type: typeof UPDATE_PAIR_SUCCESS, 
  payload: {[x:string]:{rate:number[]}}, 
}

export type CurrencyActionType = InitActionType | GetCurrencyListSuccessAction | UpdatePairSuccessAction
