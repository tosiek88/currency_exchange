export const config = {
  trading_api_host: "api-demo.fxcm.com",
  trading_api_port: 443,
  trading_api_proto: "https",
  trading_api_token: process.env.REACT_APP_TOKEN || "",
};

export const getUrl = () => {
  const { trading_api_proto, trading_api_host, trading_api_port } = config;
  return `${trading_api_proto}://${trading_api_host}:${trading_api_port}`;
};
