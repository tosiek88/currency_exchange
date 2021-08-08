import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import Display from "./components/display";
import theme from "./theme"
import { useStyles } from "./app.styles";

const App: React.FC = () => {
  const classes = useStyles(theme)();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Display />
      </div>
    </ThemeProvider>
  );
};

export default App;
