import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { FxcmSocket } from "./components/websocket/Websocket";
import theme from "./theme";
import { useStyles } from "./app.styles";
import ExchangeBoard from "./components/exchange-board/ExchangeBoard";

const App: React.FC = () => {
  const classes = useStyles(theme)();
  return (
    <>
      <FxcmSocket />
      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <ExchangeBoard />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
