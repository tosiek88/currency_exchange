import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { FxcmSocket } from "./components/fxcm-socket/FxcmSocket";
import theme from "./theme";
import { useStyles } from "./app.styles";
import { Menu } from "./components/menu/Menu";

const App: React.FC = () => {
  const classes = useStyles(theme)();
  return (
    <>
      <FxcmSocket />
      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <Menu />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
