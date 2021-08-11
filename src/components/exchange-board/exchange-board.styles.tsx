import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: any) => ({
  root: {
    fontFamily: "Roboto",
    color: theme.palette.primary.contrastText,
    width: "500px",
    height: "500px",
    backgroundColor: theme.palette.primary.light,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    borderRadius: "2px",
    boxShadow: `10px 7px 50px ${theme.palette.primary.main}`,
  },
  header: {
    width: "100%",
    height: "80px",
    padding: "25px 15px",
    backgroundColor: theme.palette.primary.dark,
  },
  content: {
    margin: "50px",
  },
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
}));
