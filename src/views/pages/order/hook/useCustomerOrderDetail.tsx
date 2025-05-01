import { useState } from "react";
import Order from "../../../../models/Order";
import OrderServiceApi from "../../../../services/orderService";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";

export default function useCustomerOrderDetail() {
    const {openLoadingDialog, closeLoadingDialog} = useLoadingDialog();
    const {openAlertDialog, closeAlertDialog} = useAlertDialog();
    const [order, setOrder] = useState<Order | null>(null);
    const [forwardOrder, setForwardOrder] = useState<Order[] | null>(null);

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
            afterCall?.();
        }
        catch (err: any) {
            let message = err?.response?.data?.message;
            console.log("error", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const getForwardOrder = async (orderId: number) => {
        try {
            openLoadingDialog?.();
            let forwardOrders = await OrderServiceApi.getForwardOrders({id: orderId});
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

    return {
        order,
        forwardOrder,
        getOrderDetail,
        cancelOrderByCustomer,
        getForwardOrder
    }
}