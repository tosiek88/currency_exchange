import { config, getUrl } from "store/config/config";
import io from "socket.io-client";
import { Dispatch } from "redux";
import {
  AUTHENTICATE_API,
  CONNECTED,
  DISCONNECTED,
  ERROR,
  IDLE,
} from "store/reducers/websocket/websocket.types";
import { RootState } from "store/root.reducer";
import { getAvaiableList } from "../currency/currency.middleware";

export const authenticate = () => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
): Promise<any> => {
  let socket: any;
  const { trading_api_token } = config;
  socket = await io(getUrl(), {
    query: { access_token: trading_api_token },
  });
  dispatch({ type: AUTHENTICATE_API });

  socket.on("connect", () => {
    dispatch({ type: CONNECTED, payload: { socket } });
    getAvaiableList()(dispatch, getState);
  });

  dispatch({ type: IDLE });
  socket.on("connect_error", (error: Error) => {
    dispatch({ type: ERROR, payload: { error } });
  });
  socket.on("error", (error: string) => {
    dispatch({ type: ERROR, payload: { error } });
  });
  socket.on("disconnect", () => {
    dispatch({ type: DISCONNECTED });
    process.exit(-1);
  });
};

