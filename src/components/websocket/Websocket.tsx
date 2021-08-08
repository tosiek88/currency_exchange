import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "store/reducers/websocket/websocket.middleware";

const useSetup=()=>{
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
}

const FxcmSocket: React.FC = () => {
  useSetup();
  console.count("Socket");
  return <></>;
};

export { FxcmSocket };
