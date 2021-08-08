import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./display.styles";

const Display: React.FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div  className={classes.header}>
        <Typography variant="h5">Exchange Currency</Typography>
      </div>
      <div>test</div>
    </Paper>
  );
};

Display.displayName = "Display";
export default Display;
