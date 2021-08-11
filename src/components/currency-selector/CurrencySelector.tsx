import { FormControl, InputLabel, Select } from "@material-ui/core";
import { SelectCurrencyType } from "components/types";
import { PropsWithChildren } from "react";
import {useStyles} from './currency-selector.styles'

export const CurrencySelector: React.FC<SelectCurrencyType> = ({
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
