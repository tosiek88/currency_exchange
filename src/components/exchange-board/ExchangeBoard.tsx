import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ChangeEvent, PropsWithChildren, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectCurrencyAction } from "store/reducers/currency/currency.middleware";
import { RootState } from "store/root.reducer";
import { useStyles } from "./display.styles";

interface SelectCurrencyType {
  onChange: (e: ChangeEvent<{ value: unknown }>) => void;
  value: string;
}

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

const ExchangeBoard: React.FC = () => {
  const classes = useStyles();
  const [exchange, setExchange] = useState({ from: "None", to: "None" });
  const dispatch = useDispatch();
  const amount = useSelector<RootState, number>(
    (state) => state.CurrencyReducer.amount
  );
  const { currency, currencyPairKeys } = useSelector<
    RootState,
    { currency: string[]; currencyPairKeys: string[] }
  >((state) => {
    return {
      currency: [...state.CurrencyReducer.avaiableCurrency, "None"],
      currencyPairKeys: Object.keys(state.CurrencyReducer.currencyPairs),
    };
  });

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

  const setToSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const { from, to } = exchange;
    const newSelction = {
      from,
      to: String(e.target?.value) || to,
    };

    setExchange(newSelction);
    dispatch(SelectCurrencyAction(newSelction));
  };

  const setFromSelectHandler = (e: ChangeEvent<{ value: unknown }>) => {
    const { from, to } = exchange;
    const newSelction = { from: String(e.target?.value) || from, to };
    setExchange(newSelction);
    dispatch(SelectCurrencyAction(newSelction));
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
      {currency && currency[0] !== "" ? (
        <>
          <div className={classes.content}>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <SelectCurrency
                  onChange={setFromSelectHandler}
                  value={exchange.from}
                >
                  {menuItems(currency)}
                </SelectCurrency>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <SelectCurrency
                  onChange={setToSelectHandler}
                  value={exchange.to}
                >
                  {menuItems([...getAvaialbeCurrency(exchange.from), "None"])}
                </SelectCurrency>
              </Grid>
            </Grid>
          </div>
          <div className={classes.content}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl variant="outlined" className={classes.amountInput}>
                  <TextField
                    id="filled-basic"
                    label="Amount"
                    onChange={setAmountHandler}
                    variant="filled"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5">Exchange: </Typography>
                {isNaN(amount) ? 0 : amount}
              </Grid>
            </Grid>
          </div>
        </>
      ) : null}
    </Paper>
  );
};

export default ExchangeBoard;
