import React, { useEffect } from "react";
import io from "socket.io-client";
import axios, { AxiosRequestConfig } from "axios";

const config = {
  trading_api_host: "api-demo.fxcm.com",
  trading_api_port: 443,
  trading_api_proto: "https",
};

const authenticate = (token: string) => {
  const { trading_api_proto, trading_api_host, trading_api_port } = config;
  console.debug(
    `${trading_api_proto}://${trading_api_host}:${trading_api_port}`
  );
  const socket = io(
    `${trading_api_proto}://${trading_api_host}:${trading_api_port}`,
    { query: { access_token: token }, jsonp: false }
  );
  socket.on("connect", async () => {
    console.log("Socket.IO session has been opened: ", socket.id);
    const url = `${trading_api_proto}://${trading_api_host}:${trading_api_port}/subscribe`;
    await axios.post(url, { pairs: "EUR/USD" }, {
      headers: {
        Authorization: `Bearer ${socket.id}${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    } as AxiosRequestConfig);
    socket.on("EUR/USD", (data: any) => {
      console.debug(data);
    });
  });
  socket.on("connect_error", (error: Error) => {
    console.log("Socket.IO session connect error: ", { ...error });
  });
  socket.on("error", (error: string) => {
    console.debug("Socket.IO session error: ", error);
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected, terminating client.");
    process.exit(-1);
  });
};

const getToken = (): string => {
  return process.env.REACT_APP_TOKEN || "";
};

const FxcmSocket: React.FC = () => {
  useEffect(() => {
    authenticate(getToken());
  }, []);
  return <div>test</div>;
};

export { FxcmSocket, authenticate };
