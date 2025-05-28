import { DefaultModel } from "../models/IModel";
import Order from "../models/Order";
import OrderForwarder from "../models/OrderForwarder";
import Staff from "../models/Staff";
import http from "./http";

export default class OrderServiceApi {
    public static async getStaffOrderList(props: {
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
            `/order?${new URLSearchParams(params).toString()}`
        );

        return {
            orders: data.docs.length ? new Order().parseList(data.docs) : [],
            orderOffsetCount: data.orderOffset,
            forwardOffsetCount: data.forwardOffset,
        };
    }

    public static async getStaffOrderDetail(props: { id: number }) {
        const { data } = await http.get(`/order/${props.id}`);
        console.log("data order detail === ", data);
        return new Order().parse(data);
    }

    public static async getCustomerOrderList(props: {
        page?: number;
        perPage?: number;
    }) {
        const params: any = {
            ...(props?.page ? { page: props?.page } : {}),
            perPage: props?.perPage || 10,
        };
        const { data } = await http.get(
            `/my-order?${new URLSearchParams(params).toString()}`
        );
        console.log("data get my order === ", data);
        return {
            docs: data.docs.length ? new Order().parseList(data.docs) : [],
            pages: data.pages,
            currentPage: data.currentPage,
        };
    }

    public static async getCustomerOrderDetail(props: { id: number }) {
        const { data } = await http.get(`/my-order/${props.id}`);
        console.log("data order detail === ", data);
        return new Order().parse(data);
    }

    public static async getForwardOrders(props: {
        id: number;
        lat?: number | null;
        long?: number | null;
    }) {
        let params: any = {
            ...(props.lat ? { lat: props.lat } : {}),
            ...(props.long ? { long: props.long } : {}),
            useCoordinate: props.lat || props.long ? true : false,
        };
        const { data } = await http.get(
            `/my-order-forwarder/${props.id}?${new URLSearchParams(
                params
            ).toString()}`
        );
        console.log("data order forwarder === ", data);
        return new OrderForwarder().parseList(data);
    }

    public static async cancelMyOrder(props: { id: number }) {
        const { data } = await http.post(`/cancel-my-order/${props.id}`);
        console.log("data cancel my order === ", data);
        return data;
    }

    public static async readyOrder(props: { id: number }) {
        const { data } = await http.put(`/order-ready/${props.id}`);
        console.log("data order ready === ", data);
        return data;
    }

    public static async rejectOrder(props: { id: number }) {
        const { data } = await http.put(`/order-reject/${props.id}`);
        console.log("data order reject === ", data);
        return data;
    }

    public static async cancelApproveOrder(props: {
        id: number;
        reasonCancel?: string;
    }) {
        const { data } = await http.put(`/order-cancel/${props.id}`, {
            orderId: props.id,
            reasonCancel: props.reasonCancel || "",
        });
        console.log("data order cancel === ", data);
        return data;
    }

    public static async finishOrder(props: { id: number }) {
        const { data } = await http.put(`/order-finish/${props.id}`);
        console.log("data order finish === ", data);
        return data;
    }

    public static async switchOrder(props: {
        baseOrderId: number;
        forwardOrderId: number;
    }) {
        const { data } = await http.post(`/order-switch-to-forwarder`, {
            baseOrderId: props.baseOrderId,
            forwardOrderId: props.forwardOrderId,
        });
        console.log("data order switched === ", data);
        return data;
    }

    public static async createOrder(props: {
        staffId: number;
        addressId: number;
        voucherCode?: string;
        staffServicePriceIds?: number[];
        paymentMethodId: number;
        note?: string;
        timerTime?: Date;
        fromForwardOrderId?: number;
    }) {
        let body = {
            staffId: props.staffId,
            addressId: props.addressId,
            voucherCode: props.voucherCode || null,
            staffServicePriceIds: props.staffServicePriceIds,
            paymentMethodId: props.paymentMethodId,
            note: props.note,
            timerTime: props.timerTime,
            fromForwardOrderId: props.fromForwardOrderId,
        };
        const { data } = await http.post("/order", body);

        return data;
    }

    public static async reviewMyOrder(props: {
        orderId?: number;
        rate?: number;
        note?: string;
    }) {
        let body = {
            orderId: props.orderId,
            rate: props.rate,
            note: props.note || "",
        };
        const { data } = await http.put("/review-my-order", body);

        return data;
    }
}
