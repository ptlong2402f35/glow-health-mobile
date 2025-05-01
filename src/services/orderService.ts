import { DefaultModel } from "../models/IModel";
import Order from "../models/Order";
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
            docs: new Order().parseList(data.docs),
            pages: data.pages,
            currentPage: data.currentPage,
        };
    }

    public static async getCustomerOrderDetail(props: { id: number }) {
        const { data } = await http.get(`/my-order/${props.id}`);
        console.log("data order detail === ", data);
        return new Order().parse(data);
    }

    public static async getForwardOrders(props: { id: number }) {
        const { data } = await http.get(`/my-order-forwarder/${props.id}`);
        console.log("data order forwarder === ", data);
        return new Order().parseList(data);
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
        let body= {
            staffId: props.staffId,
            addressId: props.addressId,
            voucherCode: props.voucherCode || null,
            staffServicePriceIds: props.staffServicePriceIds,
            paymentMethodId: props.paymentMethodId,
            note: props.note,
            timerTime: props.timerTime,
            fromForwardOrderId: props.fromForwardOrderId,
        }
        const { data } = await http.post("/order", body);

        return data;
    }
}
