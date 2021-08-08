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
    console.debug(state.CurrencyReducer);
    return state.CurrencyReducer.avaiableCurrency;
  });

  const menuItems = currency.map((c) => {
    return <MenuItem value={c}>{c}</MenuItem>;
  });
  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Exchange Currency</Typography>
      </div>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={4} alignContent="center">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel>Base Currency</InputLabel>
              <Select id="base-currency" value={menuItems[0]} onChange={() => {}}>
                {menuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} alignContent="center"></Grid>
          <Grid item xs={4} alignContent="center"></Grid>
        </Grid>
        <Typography>
       Currency Exchange 
       Ammount 
        </Typography>
      </div>
    </Paper>
  );
};

export default ExchangeBoard;
