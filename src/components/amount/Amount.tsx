import React, { ReactEventHandler } from "react";
import { FormControl, InputAdornment, OutlinedInput } from "@material-ui/core";
import { ChangeEventHandlerType } from "components/types";
import { returnEmptyIfNone, useSelctedCurrency } from "hooks/selectors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/root.reducer";
import {useStyles} from './amount.styles'

export const Amount: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { from } = useSelctedCurrency();
  const amount = useSelector<RootState, number>((state) => {
    const amount = state.CurrencyReducer.amount;
    return isNaN(amount) ? 1 : amount;
  });
  const setAmount = (amount: string) => {
    dispatch({
      type: "SET_AMOUNT_SUCCESS",
      payload: { amount: parseInt(amount) },
    });
  };

  const setAmountHandlerChange = (e: ChangeEventHandlerType) =>
    setAmount(String(e.target.value));

  const setAmountHandlerLoad: ReactEventHandler<HTMLDivElement> = (e) => {
    setAmount(String(e));
  };
  return (
    <FormControl variant="outlined" className={classes.amountInput}>
      <OutlinedInput
        id="filled-basic"
        defaultValue={amount || 1}
        startAdornment={
          <InputAdornment style={{ background: "red" }} position="start">
            {returnEmptyIfNone(from)}{" "}
          </InputAdornment>
        }
        onChange={setAmountHandlerChange}
        onLoad={setAmountHandlerLoad}
      />
    </FormControl>
  );
};
