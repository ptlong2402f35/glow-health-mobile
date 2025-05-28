import Pusher from "pusher-js/react-native";
import * as Device from "expo-device";

import PusherService from "../../services/pusherService";
import { getCurrentRouteName, navigationRef } from "../../NavigationService";
import { MyOrderDetail, MyOrderPendingDetail, StaffOrderList } from "../../statics/config";
import { emitter, EmitterEvent } from "../emitter/mitt";
import useToast from "../useToast";
import {CommonComponentsWrapContext} from "../../common/commonComponentContextWrap"
export default class PusherConfig {
    static instance: Pusher = new Pusher("d3c6fad28f3cf1931a88", {
        cluster: "ap1",
    });
    static channels: Set<string> = new Set();
    static isSub: boolean = false;
    static ctx = CommonComponentsWrapContext;
    async init() {
        PusherConfig.instance.connection.bind("state_change", (states: any) => {
            const previousState = states.previous;
            const currentState = states.current;

            console.log(
                `puhser status change: ${previousState} to ${currentState}`
            );

            // if (currentState === "disconnected") {
            //     PusherConfig.channels.clear();
            //     PusherConfig.isSub = false;
            // }

            // if (currentState === 'connected') {
            //     this.subcribe(PusherConfig.userId);
            //   }
        });

        return PusherConfig.instance;
    }

    async subcribe(userId?: number) {
        try {
            console.log("pusher is sub", PusherConfig.isSub);
            console.log("pusher is userId", userId);
            if (PusherConfig.isSub || !userId) return;
            console.log("pusher authentication userId", userId);
            if (userId) {
                const channel = PusherConfig.instance.subscribe(
                    `pusher-channel-${userId}`
                );
                channel.bind("order-create-to-staff", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    if (getCurrentRouteName() === StaffOrderList) {
                        console.log("force reload staff order list =====");
                        emitter.emit(EmitterEvent.ReloadStaffOrderList);
                    }
                    // console.log(JSON.stringify(data));
                });
                channel.bind("reload-detail-order", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    if (getCurrentRouteName() === MyOrderDetail) {
                        console.log("force reload staff order list =====");
                        emitter.emit(EmitterEvent.ReloadStaffOrderList);
                    }
                    // console.log(JSON.stringify(data));
                });
                channel.bind("redirect-screen-in-pending", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    if (getCurrentRouteName() === MyOrderPendingDetail) {
                        emitter.emit(EmitterEvent.Redirect, data);
                    }
                    // console.log(JSON.stringify(data));
                });
                channel.bind("order-ready-to-customer", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    if (getCurrentRouteName() === MyOrderPendingDetail) {
                        emitter.emit(EmitterEvent.ReloadForwardOrder, data);
                    }
                });
                channel.bind("order-switch-to-staff", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    emitter.emit(EmitterEvent.Redirect, data);
                });
                channel.bind("redirect-screen", function (data: any) {
                    console.log(`Event data: ${JSON.stringify(data)}`);
                    console.log(`current screen:`, getCurrentRouteName());
                    emitter.emit(EmitterEvent.Redirect, data);
                });
                channel.bind("login-success", () => {
                    console.log("LOGIN SUCCESS CONNECT PUSHER DONE");
                    alert("Pusher subscribe done");
                });
                channel.bind("notification", (data: any) => {
                    if (!Device.isDevice) {
                        console.log("notification data push ===", data);
                        emitter.emit(EmitterEvent.ShowToast);
                    }
                    console.log("notification data push ===", data);
                    emitter.emit(EmitterEvent.ShowToast, data);
                });

                PusherConfig.channels.add(`pusher-channel-${userId}`);
                PusherConfig.isSub = true;
            }
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.error(message);
        }
    }

    async unsub() {
        for (let channel of PusherConfig.channels) {
            PusherConfig.instance.unsubscribe(channel);
        }

        PusherConfig.channels.clear();
        PusherConfig.isSub = false;

        console.log("xxx Unsub done");
    }

    async disconnect() {
        PusherConfig.channels.clear();
        PusherConfig.isSub = false;
        PusherConfig.instance.disconnect();
    }

    getInstance() {
        if (!PusherConfig.instance) {
            this.init();
        }

        return PusherConfig.instance;
    }
}
