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
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pair } from "store/reducers/currency/currency.types";
import { RootState } from "store/root.reducer";
import { useStyles } from "./display.styles";
import _ from "lodash";

interface SelectCurrencyType {
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  value: string;
}

interface ExchangePropsType {
  exchange: { from: string; to: string };
  amount: number;
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

export const useExchangeSelector = (
  { from, to } = { from: "None", to: "None" }
) =>
  useSelector<RootState, { buy: number; sell: number }>((state) => {
    if (from === "None" || to === "None") {
      return { buy: 1, sell: 1 };
    }
    const { currencyPairs } = state.CurrencyReducer;
    const entries = Object.entries(currencyPairs);

    const [key] = entries.find(([key]) => {
      return key.includes(from) && key.includes(to);
    }) || ["None/None"];

    const pair = currencyPairs[key];
    return determineExchange(from, pair);
  }, _.isEqual);

const Exchange: React.FC<ExchangePropsType> = ({ exchange, amount }) => {
  const { buy, sell } = useExchangeSelector(exchange);
  amount = isNaN(amount) ? 1 : amount;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Rates: </Typography>
          <Typography variant="subtitle2">
            Buy: {`${buy.toFixed(4)}`}
          </Typography>
          <Typography variant="subtitle2">
            Sell: {`${sell.toFixed(4)}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> Exchange: </Typography>
          <Typography variant="subtitle2">
            Buy: {`${(amount * buy).toFixed(2)}`}
          </Typography>
          <Typography variant="subtitle2">
            Sell: {`${(amount * sell).toFixed(2)}`}
          </Typography>
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
  const [exchange, setExchange] = useState({ from: "None", to: "None" });
  const { fromCurrencies, toCurrencies } = useMemo(
    () => useCurrenciesSelector,
    []
  )(exchange.from);
  const dispatch = useDispatch();
  const amount = useSelector<RootState, number>(
    (state) => state.CurrencyReducer.amount
  );

  const setToSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const { from, to } = exchange;
    const newSelction = {
      from,
      to: String(e.target?.value) || to,
    };
    setExchange(newSelction);
  };

  const setFromSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const { from } = exchange;
    const newSelction = { from: String(e.target?.value) || from, to: "None" };
    setExchange(newSelction);
  };

  const setAmountHandler = (e: ChangeEvent<{ value: unknown }>) =>
    setAmount(String(e.target.value));

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
                <SelectCurrency
                  onChange={setFromSelectHandler}
                  value={exchange.from}
                >
                  {menuItems(fromCurrencies)}
                </SelectCurrency>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <SelectCurrency
                  onChange={setToSelectHandler}
                  value={exchange.to}
                >
                  {menuItems(toCurrencies)}
                </SelectCurrency>
              </Grid>
            </Grid>
          </div>
          <div className={classes.content}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.amountInput}>
                  <OutlinedInput
                    id="filled-basic"
                    defaultValue={1}
                    startAdornment={
                      <InputAdornment
                        style={{ background: "red" }}
                        position="start"
                      >
                        {exchange.from}{" "}
                      </InputAdornment>
                    }
                    onChange={setAmountHandler}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Exchange exchange={exchange} amount={amount} />
              </Grid>
            </Grid>
          </div>
        </>
      ) : null}
    </Paper>
  );
};

export default ExchangeBoard;
