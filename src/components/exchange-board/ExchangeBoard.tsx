import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/root.reducer";
import { useStyles } from "./display.styles";

const ExchangeBoard: React.FC = () => {
  const classes = useStyles();
  const currency = useSelector<RootState, string[]>((state) => {
    return state.CurrencyReducer.avaiableCurrency;
  });

  const value = useSelector<RootState, any>((state) => {
    return state.CurrencyReducer.currencyPairs;
  });

  const menuItems = currency.map((c) => {
    return (
      <MenuItem key={c} value={c}>
        {c}
      </MenuItem>
    );
  });
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Exchange Currency</Typography>
      </div>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={4} alignContent="center">
            {currency && currency[0] !== "" ? (
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>Base Currency</InputLabel>
                <Select
                  id="base-currency"
                  value={currency[0]}
                  onChange={() => {}}
                >
                  {menuItems}
                </Select>
              </FormControl>
            ) : null}
          </Grid>
          <Grid item xs={4} alignContent="center"></Grid>
          <Grid item xs={4} alignContent="center"></Grid>
        </Grid>
      </div>
      <div>{JSON.stringify(value, null, 2)}</div>
    </Paper>
  );
};

export default ExchangeBoard;
