import { AUTHENTICATE_API, CONNECTED, DISCONNECTED, ERROR, IDLE, INIT, WebsocketActions } from "./websocket.types";

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
    case INIT:
      return { currentState: "INIT" };
    case AUTHENTICATE_API: {
      return { currentState: "AUTHENTICATE_API" };
    }
    case IDLE:
      return { currentState: "IDLE" };
    case ERROR:
      return { currentState: "ERROR", error: action.payload.error };
    case CONNECTED:
      return { currentState: "CONNECTED", socket: action.payload.socket  };
    case DISCONNECTED:
      return { currentState: "DISCONNECTED", socket: null };
    default:
      return state;
  }
};

export { WebsocketReducer };
