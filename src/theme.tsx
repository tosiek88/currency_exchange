import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#4c566a",
      main: "#3b4252",
      dark: "#2e3440",
      contrastText: "#d8dee9",
    },
    secondary: {
      light: "#88c0d0",
      main: "#81a1c1",
      dark: "#5e81ac",
      contrastText:"#e5e9f0"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
