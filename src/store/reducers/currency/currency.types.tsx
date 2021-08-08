export const INIT = "INIT";
export const GET_CURRENCY_LIST_SUCCESS = "GET_CURRENCY_LIST_SUCCESS";

interface InitActionType{
  type: typeof INIT;
}

interface GetCurrencyListSuccessAction{
  type: typeof GET_CURRENCY_LIST_SUCCESS
  payload: {avaiableCurrency:string[], 
  currencyPairs:{[x:string]:{symbol:string, visible:boolean, order:number}}};
}

export type CurrencyActionType = InitActionType | GetCurrencyListSuccessAction
