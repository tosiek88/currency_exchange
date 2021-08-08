export const INIT = "INIT";
export const AUTHENTICATE_API = "AUTHENTICATE_API";
export const IDLE = "IDLE";
export const ERROR = "ERROR";
export const DISCONNECT = "DISCONNECT";

export interface WebsocketPayloadType {
  socket?: any;
  currentState?: string;
  error?: Error | string;
}

export interface WebsocketState {
  currentState?: string;
  socket?: any;
  error?: Error | string;
}

interface InitActionType {
  type: typeof INIT;
  payload?: WebsocketPayloadType;
}

interface AuthenticateActionType {
  type: typeof AUTHENTICATE_API;
  payload?: WebsocketPayloadType;
}

interface IdleActionType {
  type: typeof IDLE;
  payload: WebsocketPayloadType;
}

interface ErrorActionType {
  type: typeof ERROR;
  payload: WebsocketPayloadType;
}

interface DisconnectActionType {
  type: typeof DISCONNECT;
  payload?: WebsocketPayloadType;
}

export type WebsocketActions =
  | InitActionType
  | AuthenticateActionType
  | IdleActionType
  | ErrorActionType
  | DisconnectActionType;
