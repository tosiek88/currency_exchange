import { makeStyles } from "@material-ui/core/styles";

export const useStyles = (theme:any) => makeStyles(() => {
  return {
    app: {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.primary.dark
    },
  };
});
