import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { WebsocketReducer } from "./reducers/websocket/websocket.reducer";
import thunk from "redux-thunk";
import { CurrencyReducer } from "./reducers/currency/currency.reducer";

const rootReducer = combineReducers({
  WebsocketReducer: WebsocketReducer,
  CurrencyReducer: CurrencyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
