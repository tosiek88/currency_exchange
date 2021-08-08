import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { TestReducer } from "./reducer/test.reducer";

const rootReducer = combineReducers({
  TestReducer: TestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});
const store = createStore(rootReducer, composeEnhancers());

export { store };
