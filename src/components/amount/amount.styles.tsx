import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: any) => ({
  amountInput: {
    margin: theme.spacing(1),
    minWidth: 100,
    width:"150px",
    "& .MuiInputBase-root": {
      background: theme.palette.primary.contrastText,
    },
    "& .MuiList-root": {
      background: theme.palette.primary.contrastText,
    },
  },
}));
