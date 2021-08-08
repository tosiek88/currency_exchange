import { config, getUrl } from "store/config/config";
import io from "socket.io-client";
import { Dispatch } from "redux";
import {
  AUTHENTICATE_API,
  WebsocketActions,
} from "store/reducers/websocket/websocket.types";
import { RootState } from "store/root.reducer";


// socket.on("connect", async () => {
//   const url = `${trading_api_proto}://${trading_api_host}:${trading_api_port}/subscribe`;
//   await axios.post(url, { pairs: "EUR/USD" }, {
//     headers: {
//       Authorization: `Bearer ${socket.id}${token}`,
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   } as AxiosRequestConfig);
//   socket.on("EUR/USD", (data: any) => {
//     console.debug(data);
//   });
// });

export const Authenticate = () => async (
  dispatch: Dispatch<WebsocketActions>
): Promise<void> => {
  dispatch({ type: AUTHENTICATE_API });
  const { trading_api_token } = config;
  const socket = await io(getUrl(), {
    query: { access_token: trading_api_token },
  });

  socket.on("connect", () => {
    dispatch({ type: "IDLE", payload: { socket } });
  });

  socket.on("connect_error", (error: Error) => {
    dispatch({ type: "ERROR", payload: { error } });
  });
  socket.on("error", (error: string) => {
    dispatch({ type: "ERROR", payload: { error } });
  });
  socket.on("disconnect", () => {
    dispatch({ type: "DISCONNECT" });
    process.exit(-1);
  });

  return socket;
};
