import { DefaultModel } from "../models/IModel";
import Order from "../models/Order";
import OrderForwarder from "../models/OrderForwarder";
import Staff from "../models/Staff";
import Review from "../models/Review";
import http from "./http";

export default class StoreOrderServiceApi {
    public static async getStoreOrderList(props: {
        limit?: number;
        orderOffset?: number;
        forwardOffset?: number;
    }) {
        const params: any = {
            ...(props?.limit ? { limit: props?.limit } : {}),
            ...(props?.orderOffset ? { orderOffset: props?.orderOffset } : {}),
            ...(props?.forwardOffset
                ? { forwardOffset: props?.forwardOffset }
                : {}),
        };
        const { data } = await http.get(
            `/store-owner/order?${new URLSearchParams(params).toString()}`
        );

        return {
            orders: data.docs.length ? new Order().parseList(data.docs) : [],
            orderOffsetCount: data.orderOffset,
            forwardOffsetCount: data.forwardOffset,
        };
    }

    public static async getStoreOrderDetail(props: { id: number }) {
        const { data } = await http.get(`/store-owner/order/${props.id}`);
        console.log("data store order detail === ", data);
        return new Order().parse(data);
    }

    public static async readyOrder(props: { id: number, staffIds?: number[] }) {
        let body = {
            staffIds: props.staffIds
        }
        console.log("body owner ready", body);
        const { data } = await http.put(`/store-owner/order-forwarder-ready/${props.id}`, body);
        console.log("data store order ready === ", data);
        return data;
    }

    public static async rejectOrder(props: { id: number }) {
        const { data } = await http.put(`/store-owner/order-forwarder-reject/${props.id}`);
        console.log("data order reject === ", data);
        return data;
    }

    public static async cancelApproveOrder(props: {
        id: number;
        reasonCancel?: string;
    }) {
        const { data } = await http.put(`/store-owner/order-forwarder-cancel/${props.id}`, {
            orderId: props.id,
            reasonCancel: props.reasonCancel || "",
        });
        console.log("data order cancel === ", data);
        return data;
    }

    public static async finishOrder(props: { id: number }) {
        const { data } = await http.put(`/store-owner/order-forwarder-finish/${props.id}`);
        console.log("data order finish === ", data);
        return data;
    }

}
