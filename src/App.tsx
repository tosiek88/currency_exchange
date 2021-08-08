import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import Display from "./components/display/Display";
import { FxcmSocket } from "./components/websocket/Websocket";
import theme from "./theme";
import { useStyles } from "./app.styles";

const App: React.FC = () => {
  const classes = useStyles(theme)();
  return (
    <>
      <FxcmSocket/>
      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <Display />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
