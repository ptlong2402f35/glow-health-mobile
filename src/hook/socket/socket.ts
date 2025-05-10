// socket.js
import { io, Socket } from "socket.io-client";
import { SocketEvent } from "./useSocket";
import { useNavigationState } from "@react-navigation/native";
import { StaffOrderList } from "../../statics/config";
import { initListen, offEvent } from "../emitter/mitt";

let socket: Socket | null = null;

export const initSocket = (token: string, userId?: number): void => {
    console.log("token ====", userId);
    return;
    if (!socket) {
        socket = io("ws://glow-health-backend.vercel.app", {
            auth: { token, userId },
            reconnection: true,
            reconnectionDelay: 10000,
            transports: ['websocket', 'polling'],
        });

        socket?.on("connect", () => {
            console.log("Socket connected:", socket?.id);
        });

        socket?.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });

        socket?.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        initListen(socket);
    }
};

export const getSocket = (): Socket | null => {
    return socket;
};

export const disconnectSocket = (): void => {
    if (socket) {
        offEvent(socket);
        socket.disconnect();
        socket = null;
    }
};

