import { WebsocketActions } from "./websocket.types";

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
export interface WebsocketState {
  currentState: string;
  socket?: any;
  error?: Error | string;
}
const WebsocketReducer = (
  state = { currentState: "INIT" },
  action: WebsocketActions
): WebsocketState => {
  switch (action.type) {
    case "INIT":
      return { currentState: "INIT" };
    case "AUTHENTICATE_API": {
      return { currentState: "AUTHENTICATE_API" };
    }
    case "IDLE":
      return { currentState: "IDLE", socket: action.payload.socket };
    case "ERROR":
      return { currentState: "ERROR", error: action.payload.error };
    case "DISCONNECT":
      return { currentState: "DISCONNECT", socket: null };
    default:
      return state;
  }
};

export { WebsocketReducer };
