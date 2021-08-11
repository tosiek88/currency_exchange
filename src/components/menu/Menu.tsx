import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ExchangeBoard from "components/exchange-board/ExchangeBoard";
import { ExchangeCurrency } from "components/exchange-currency/ExchangeCurrency";
import { useStyles } from "./menu.style";

export const Menu = () => {
  const classes = useStyles();
  return (
    <>
      <Router>
        <Paper className={classes.root}>
          <Tabs indicatorColor="secondary" textColor="primary" centered value={false}>
              <Tab label="Exchange Currency" component={Link} to="/exchange-currency"/>
              <Tab label="Exchange Board" component={Link} to="/exchange-board"/>
          </Tabs>
        </Paper>

        <Switch>
          <Route path="/exchange-currency">
            <ExchangeCurrency />
          </Route>
          <Route path="/exchange-board">
            <ExchangeBoard />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
