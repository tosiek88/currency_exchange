import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { WebsocketReducer } from "./reducers/websocket/websocket.reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  WebsocketReducer: WebsocketReducer,
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
