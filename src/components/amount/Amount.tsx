import React, { useCallback, useEffect } from "react";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { returnEmptyIfNone, useSelctedCurrency } from "hooks/selectors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/root.reducer";
import { useStyles } from "./amount.styles";
import { useFormik } from "formik";

export const validate = (values: { amount: string }) => {
  const errors = {} as any;
  if (!values.amount) {
    errors.amount = "Required";
  } else if (values.amount.length > 4) {
    errors.amount = "Must be 4 characters or less";
  } else if (!(parseInt(values.amount) > 0)) {
    errors.amount = "Must be a number greater than 0";
  }
  return errors;
};

export const Amount: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { from } = useSelctedCurrency();
  const amount = useSelector<RootState, number>((state) => {
    const amount = state.CurrencyReducer.amount;
    return isNaN(amount) || amount===null? 1 : amount;
  });
  const formik = useFormik({
    initialValues: {
      amount: `${amount}`,
    },
    validate,
    onSubmit: (values) => {},
  });

  const setAmount = useCallback(
    (amount: string) => {
      dispatch({
        type: "SET_AMOUNT_SUCCESS",
        payload: { amount: parseInt(amount) },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    if (formik.isValid) {
      setAmount(formik.values.amount);
    }
  }, [formik, setAmount]);

  return (
    <FormControl variant="outlined" className={classes.amountInput}>
      <OutlinedInput
        id="filled-basic"
        name="amount"
        error={formik.errors?true:false}
        defaultValue={formik.values.amount}
        startAdornment={
          <InputAdornment position="start">
            {returnEmptyIfNone(from)}{" "}
          </InputAdornment>
        }
        onChange={formik.handleChange}
      />
      {formik.errors ? (
        <Typography
          style={{ color: "red" }}
          variant="caption"
          display="block"
          gutterBottom
        >
          {formik.errors.amount}
        </Typography>
      ) : null}
    </FormControl>
  );
};
