import { Grid, TableCell, TableRow, Typography } from "@material-ui/core";
import { useStyles } from "./exchange.styles";
import { useExchangeSelector, useRatioSelector } from "hooks/selectors";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Exchange } from "store/reducers/currency/currency.types";
import { RootState } from "store/root.reducer";

export const ExchangeComponent: React.FC = () => {
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

export interface ExchangeRowProps {
  from: string;
  to: string;
}
export const ExchangeRow: React.FC<ExchangeRowProps> = ({
  from,
  to,
}: ExchangeRowProps) => {
  const { buy, sell } = useRatioSelector({ from, to });
  // const { exchangeHeaders, exchangeLabel } = useStyles();
  return (
    <TableRow>
      <TableCell align="right">{to}</TableCell>
      <TableCell align="right">{buy.toFixed(2)}</TableCell>
      <TableCell align="right">{sell.toFixed(2)}</TableCell>
    </TableRow>
  );
};
