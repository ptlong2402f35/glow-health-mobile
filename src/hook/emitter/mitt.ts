import { useNavigationState } from "@react-navigation/native";
import { SocketEvent } from "../socket/useSocket";
import { StaffOrderList } from "../../statics/config";
import mitt from "mitt";
import { Socket } from "socket.io-client";

export enum EmitterEvent {
    ReloadStaffOrderList = "reloadStaffOrderList",
    ShowToast = "ShowToast",
    Redirect = "Redirect",
    ReloadForwardOrder = "ReloadForwardOrder",
    ReloadMyOrderDetail = "ReloadMyOrderDetail",
}

export const emitter = mitt();

export const initListen = (socket: Socket | null) => {
    if (!socket) return;
    socket?.on(SocketEvent.OrderCreateToStaff, (msg) => {
        const currentRouteName = useNavigationState((state) => {
            const route = state.routes[state.index];
            return route.name;
        });
        if(currentRouteName === StaffOrderList) {
            console.log("force reload staff order list =====");
            emitter.emit(EmitterEvent.ReloadStaffOrderList);
        }
    });

};

export const offEvent = (socket: Socket | null) => {
    if(!socket) return;

    socket?.off(SocketEvent.OrderCreateToStaff);

}