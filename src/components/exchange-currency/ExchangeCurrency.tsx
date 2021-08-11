import React, { ChangeEvent, useMemo } from "react";
import { SELECT_CURRENCY_SUCCESS } from "store/reducers/currency/currency.types";
import { CurrencySelector } from "components/currency-selector/CurrencySelector";
import { ExchangeComponent } from "components/echange/Exchange";
import { useStyles } from "./exchange-currency.styles";
import { Amount } from "components/amount/Amount";
import { useDispatch } from "react-redux";
import { useCurrenciesSelector, useSelctedCurrency } from "hooks/selectors";
import { Grid, MenuItem, Paper, Typography } from "@material-ui/core";

export const menuItems = (items: string[]) =>
  items.map((c, i) => {
    return (
      <MenuItem key={i} value={c}>
        {c}
      </MenuItem>
    );
  });

export const ExchangeCurrency: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { from, to } = useSelctedCurrency();
  const { fromCurrencies, toCurrencies } = useMemo(
    () => useCurrenciesSelector,
    []
  )(from);

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
                <CurrencySelector onChange={setFromSelectHandler} value={from}>
                  {menuItems(fromCurrencies)}
                </CurrencySelector>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <CurrencySelector onChange={setToSelectHandler} value={to}>
                  {menuItems(toCurrencies)}
                </CurrencySelector>
              </Grid>
            </Grid>
          </div>
          <div className={classes.content}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Amount />
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
