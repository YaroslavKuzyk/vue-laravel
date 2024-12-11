import * as user from "./rest/user";

interface IConfig {
  API: string;
  WEBSOCKET_API: string;
}

export default {
  config: <IConfig>{
    API: "http://localhost:8000",
    WEBSOCKET_API: "ws://localhost:8000",
  },
  user,
};
