import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: any) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    "& .MuiInputBase-root": {
      background: theme.palette.primary.contrastText,
    },
    "& .MuiList-root": {
      background: theme.palette.primary.contrastText,
    },
  },
  inputLabel: {
    fontSize: "11px",
  },
}));
