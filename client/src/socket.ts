import { io } from "socket.io-client";

const serverUrl = "http://localhost:8088";

export const socket = io(serverUrl, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("token"),
  },
});
