import { applyMiddleware, combineReducers, createStore, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { WebsocketReducer } from "./reducers/websocket/websocket.reducer";
import thunk from "redux-thunk";
import { CurrencyReducer } from "./reducers/currency/currency.reducer";
import { REDUX_PERSIST_STATE } from "./config/config";
import { CurrencyActionType } from "./reducers/currency/currency.types";
import { DISCONNECTED, WebsocketActions } from "./reducers/websocket/websocket.types";

const rootReducer = combineReducers({
  WebsocketReducer: WebsocketReducer,
  CurrencyReducer: CurrencyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const localStorageMiddleware = ({
  getState,
}: {
  getState: () => RootState;
}) => {
  return (next: Dispatch) => (
    action: CurrencyActionType | WebsocketActions
  ) => {
    const result = next(action);
    if (result.type === DISCONNECTED) {
      localStorage.setItem(REDUX_PERSIST_STATE, JSON.stringify(getState(), null, 3));
    }
    return result;
  };
};

const persistedStore = () => {
  const data = localStorage.getItem(REDUX_PERSIST_STATE);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

console.debug(persistedStore());
const store = createStore(
  rootReducer,
  persistedStore(),
  composeEnhancers(applyMiddleware(thunk, localStorageMiddleware))
);

export { store };
