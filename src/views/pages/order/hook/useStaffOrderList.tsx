import { useEffect, useState } from "react";
import Order from "../../../../models/Order";
import useUserLoader from "../../../../hook/useUserLoader";
import { navigate } from "../../../../NavigationService";
import OrderServiceApi from "../../../../services/orderService";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";

export default function useStaffOrderList() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const { userLoader, isLogin, user } = useUserLoader();
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderOffset, setOrderOffset] = useState<number>(0);
    const [forwardOffset, setForwardOffset] = useState<number>(0);
    if (!isLogin || userLoader?.role !== 3) {
        navigate("Home");
    }

    const getOrderList = async (init?: boolean) => {
        try {
            openLoadingDialog?.();
            if(init) {
                let {
                    orders: newOrders,
                    orderOffsetCount,
                    forwardOffsetCount,
                } = await OrderServiceApi.getStaffOrderList({
                    orderOffset: 0,
                    forwardOffset: 0,
                });
                setOrders([ ...newOrders]);
                setOrderOffset(orderOffsetCount);
                setForwardOffset(forwardOffsetCount);
                closeLoadingDialog?.();
                return;
            }
            let {
                orders: newOrders,
                orderOffsetCount,
                forwardOffsetCount,
            } = await OrderServiceApi.getStaffOrderList({
                orderOffset,
                forwardOffset,
            });
            setOrders([...orders, ...newOrders]);
            setOrderOffset(orderOffsetCount);
            setForwardOffset(forwardOffsetCount);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const readyOrder = async (props: {
        id: number;
        onFail?: (msg?: string) => void;
        onSuccess?: () => void;
    }) => {
        try {
            openLoadingDialog?.();
            await OrderServiceApi.readyOrder({ id: props.id });
            props.onSuccess?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            props.onFail?.(message);
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");

        } finally {
            closeLoadingDialog?.();
        }
    };

    const rejectOrder = async (props: {
        id: number;
        onFail?: (msg?: string) => void;
        onSuccess?: () => void;
    }) => {
        try {
            openLoadingDialog?.();
            await OrderServiceApi.rejectOrder({ id: props.id });
            props.onSuccess?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            props.onFail?.(message);
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");

        } finally {
            closeLoadingDialog?.();
        }
    };

    const reload = () => {
        getOrderList(true);
    };

    return {
        userLoader,
        isLogin,
        orders,
        getOrderList,
        readyOrder,
        rejectOrder,
        reload,
        user
    };
}
