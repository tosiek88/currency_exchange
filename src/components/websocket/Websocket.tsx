import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Authenticate } from "store/reducers/websocket/websocket.middleware";
import { INIT, WebsocketState } from "store/reducers/websocket/websocket.types";
import { RootState } from "store/root.reducer";

const FxcmSocket: React.FC = () => {
  const wsState = useSelector<RootState, WebsocketState>(
    ({ WebsocketReducer }) => WebsocketReducer
  );
  const dispatch = useDispatch();
  if (wsState.currentState === INIT) {
    dispatch(Authenticate());
  }
  return <></>;
};

export { FxcmSocket };
