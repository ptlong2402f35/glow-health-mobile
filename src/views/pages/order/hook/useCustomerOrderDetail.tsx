import { useState } from "react";
import Order from "../../../../models/Order";
import OrderServiceApi from "../../../../services/orderService";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";
import OrderForwarder from "../../../../models/OrderForwarder";

export default function useCustomerOrderDetail() {
    const {openLoadingDialog, closeLoadingDialog} = useLoadingDialog();
    const {openAlertDialog, closeAlertDialog} = useAlertDialog();
    const [order, setOrder] = useState<Order | null>(null);
    const [forwardOrder, setForwardOrder] = useState<OrderForwarder[] | null>(null);

    const getOrderDetail = async (orderId: number) => {
        try {
            openLoadingDialog?.();
            let data = await OrderServiceApi.getCustomerOrderDetail({id: orderId});
            setOrder(data);
        }
        catch (err: any) {
            let message = err?.response?.data?.message;
            console.log("error", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const cancelOrderByCustomer = async (orderId: number, afterCall?: () => void) => {
        try {
            openLoadingDialog?.();
            let data = await OrderServiceApi.cancelMyOrder({id: orderId});
            openAlertDialog?.("Thông báo", "Hủy đơn thành công", () => afterCall?.())
            // afterCall?.();
        }
        catch (err: any) {
            let message = err?.response?.data?.message;
            console.log("error", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const getForwardOrder = async (orderId: number, lat?: number | null, long?: number | null) => {
        try {
            openLoadingDialog?.();
            let forwardOrders = await OrderServiceApi.getForwardOrders({id: orderId, lat, long});
            setForwardOrder(forwardOrders);
        }
        catch (err: any) {
            let message = err?.response?.data?.message;
            console.log("error", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const switchForwardOrder = async (baseOrderId: number, forwardOrderId: number, successCall?: (id?:number) => void) => {
        try {
            openLoadingDialog?.();
            let resp = await OrderServiceApi.switchOrder({baseOrderId, forwardOrderId});
            closeLoadingDialog?.();
            successCall?.(resp.orderId || 0);
        }
        catch (err: any) {
            let message = err?.response?.data?.message;
            console.log("error", message);
            openAlertDialog?.("Thông báo", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    } 

    return {
        order,
        forwardOrder,
        getOrderDetail,
        cancelOrderByCustomer,
        getForwardOrder,
        switchForwardOrder
    }
}