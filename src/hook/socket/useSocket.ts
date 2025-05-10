import { useEffect } from "react";
import { getSocket } from "./socket";

export enum SocketEvent {
    OrderCreateToStaff = "order-create-to-staff",
}

export default function useSocket() {
    const socket = getSocket();

    const listen = (event: string, handler: any) => {
        if (!socket) return;
        socket?.on(event, handler);
    };

    const emitEvent = (event: string, data: any) => {
        if (!socket) return;
        socket?.emit(event, data);
    };

    return {
        listen,
        emitEvent,
    };
}
