import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React, {
  ChangeEvent,
  PropsWithChildren,
  ReactEventHandler,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Exchange,
  Pair,
  SELECT_CURRENCY_SUCCESS,
} from "store/reducers/currency/currency.types";
import { RootState } from "store/root.reducer";
import { useStyles } from "./display.styles";
import _ from "lodash";

interface SelectCurrencyType {
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  value: string;
}

export type ChangeEventHandlerType = ChangeEvent<{ value: unknown }>;

interface ExchangePropsType {
  exchange: { buy: number; sell: number };
}

export const determineExchange = (from: string, pair: Pair) => {
  const currencies = pair.symbol.split("/");
  const index = currencies.indexOf(from);
  if (pair.rate === undefined) {
    return { buy: 1, sell: 1 };
  }
  const rate = pair.rate || [];

  if (index === 0) {
    return { buy: rate[0], sell: rate[1] };
  } else {
    return { buy: 1 / rate[0], sell: 1 / rate[1] };
  }
};

export const useExchangeSelector = () =>
  useSelector<
    RootState,
    { buy: number; sell: number; from: string; to: string }
  >((state) => {
    const { from, to } = state.CurrencyReducer.exchange;
    if (from === "None" || to === "None") {
      return { buy: 1, sell: 1, from, to };
    }
    const { currencyPairs } = state.CurrencyReducer;
    const entries = Object.entries(currencyPairs);

    const [key] = entries.find(([key]) => {
      return key.includes(from) && key.includes(to);
    }) || ["None/None"];

    const pair = currencyPairs[key];
    return { ...determineExchange(from, pair), from, to };
  }, _.isEqual);

const returnEmptyIfNone = (currency: string) =>
  currency === "None" ? "" : currency;

const ExchangeComponent: React.FC = () => {
  const { to } = useSelector<RootState, Exchange>(
    (state) => state.CurrencyReducer.exchange,
    _.isEqual
  );
  const { buy, sell } = useExchangeSelector();
  const { exchangeHeaders, exchangeLabel } = useStyles();
  const amount = useSelector<RootState, number>((state) => {
    const amount = state.CurrencyReducer.amount;
    return isNaN(amount) ? 1 : amount;
  });
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Typography className={exchangeHeaders} variant="h6">
            Rates:{" "}
          </Typography>
          <Typography variant="subtitle2">
            Buy: {`${buy.toFixed(4)}`}
          </Typography>
          <Typography variant="subtitle2">
            Sell: {`${sell.toFixed(4)}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={exchangeHeaders} variant="h6">
            {" "}
            Exchange:{" "}
          </Typography>
          <Typography className={exchangeLabel} variant="subtitle2">
            Buy:{" "}
          </Typography>
          {`${(amount * buy).toFixed(2)} ${to}`}
          <Typography className={exchangeLabel} variant="subtitle2">
            Sell:
          </Typography>{" "}
          {`${(amount * sell).toFixed(2)} ${to}`}
        </Grid>
      </Grid>
    </>
  );
};

export const SelectCurrency: React.FC<SelectCurrencyType> = ({
  onChange,
  value,
  children,
}: PropsWithChildren<SelectCurrencyType>) => {
  const classes = useStyles();
  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel className={classes.inputLabel}>Select Currency</InputLabel>
      <Select id="base-currency" value={value} onChange={onChange}>
        {children}
      </Select>
    </FormControl>
  );
};

const useSelctedCurrency = () => 
  useSelector<RootState, { from: string; to: string }>(
    (state) => state.CurrencyReducer.exchange,
    _.isEqual
  );


const useCurrenciesSelector = (from: string) =>
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

const ExchangeBoard: React.FC = () => {
  const classes = useStyles();
  const { from, to }=useSelctedCurrency()
  const { fromCurrencies, toCurrencies } = useMemo(
    () => useCurrenciesSelector,
    []
  )(from);
  const dispatch = useDispatch();

  const setToSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const newSelction = {
      from,
      to: String(e.target?.value) || to,
    };
    dispatch({ type: SELECT_CURRENCY_SUCCESS, payload: newSelction });
  };

  const setFromSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const newSelction = { from: String(e.target?.value) || from, to: "None" };
    dispatch({ type: SELECT_CURRENCY_SUCCESS, payload: newSelction });
  };

  const setAmountHandlerChange = (e: ChangeEventHandlerType) =>
    setAmount(String(e.target.value));

  const setAmountHandlerLoad: ReactEventHandler<HTMLDivElement> = (e) => {
    console.debug(e);
    setAmount(String(e));
  };

  const setAmount = (amount: string) => {
    dispatch({
      type: "SET_AMOUNT_SUCCESS",
      payload: { amount: parseInt(amount) },
    });
  };
  const menuItems = (items: string[]) =>
    items.map((c, i) => {
      return (
        <MenuItem key={i} value={c}>
          {c}
        </MenuItem>
      );
    });
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Exchange Currency</Typography>
      </div>
      {fromCurrencies && fromCurrencies[0] !== "" ? (
        <>
          <div className={classes.content}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <SelectCurrency onChange={setFromSelectHandler} value={from}>
                  {menuItems(fromCurrencies)}
                </SelectCurrency>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <SelectCurrency onChange={setToSelectHandler} value={to}>
                  {menuItems(toCurrencies)}
                </SelectCurrency>
              </Grid>
            </Grid>
          </div>
          <div className={classes.content}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <FormControl variant="outlined" className={classes.amountInput}>
                  <OutlinedInput
                    id="filled-basic"
                    defaultValue={1}
                    startAdornment={
                      <InputAdornment
                        style={{ background: "red" }}
                        position="start"
                      >
                        {returnEmptyIfNone(from)}{" "}
                      </InputAdornment>
                    }
                    onChange={setAmountHandlerChange}
                    onLoad={setAmountHandlerLoad}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <ExchangeComponent />
              </Grid>
            </Grid>
          </div>
        </>
      ) : null}
    </Paper>
  );
};

export default ExchangeBoard;
