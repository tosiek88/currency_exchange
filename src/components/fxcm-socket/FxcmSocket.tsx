import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "store/reducers/websocket/websocket.middleware";
import { DISCONNECTED } from "store/reducers/websocket/websocket.types";

const useSetup = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
};

const useBeforeUnload = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch({ type: DISCONNECTED });
    });
  }, [dispatch]);
};

const FxcmSocket: React.FC = () => {
  useSetup();
  useBeforeUnload();

  return <></>;
};

export { FxcmSocket };
