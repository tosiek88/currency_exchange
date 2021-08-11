import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { CurrencySelector } from "components/currency-selector/CurrencySelector";
import { ExchangeRow } from "components/echange/Exchange";
import { menuItems } from "components/exchange-currency/ExchangeCurrency";
import { ChangeEventHandlerType } from "components/types";
import { useCurrenciesSelector } from "hooks/selectors";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SELECT_BASE_CURRENCY_SUCCESS } from "store/reducers/currency/currency.types";
import { RootState } from "store/root.reducer";
import { useStyles } from "./exchange-board.styles";

const ExchangeBoard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const baseCurrency = useSelector<RootState, string>(
    (state) => state.CurrencyReducer.baseCurrency
  );
  const { fromCurrencies, toCurrencies } = useMemo(
    () => useCurrenciesSelector,
    []
  )(baseCurrency);

  const setBaseSelectHandler = (e: ChangeEventHandlerType) => {
    dispatch({ type: SELECT_BASE_CURRENCY_SUCCESS, payload: e.target.value });
  };

  const rows = toCurrencies.map((toCurrency) => {
    return (
      <ExchangeRow
        key={`${baseCurrency}-${toCurrency}`}
        from={baseCurrency}
        to={toCurrency}
      />
    );
  });

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5">Exchange Board</Typography>
      </div>
      <div className={classes.content}>
        <CurrencySelector onChange={setBaseSelectHandler} value={baseCurrency} label={'Base Currency'}>
          {menuItems(fromCurrencies)}
        </CurrencySelector>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Currencies</TableCell>
                <TableCell align="right">Buy</TableCell>
                <TableCell align="right">Sell</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default ExchangeBoard;
