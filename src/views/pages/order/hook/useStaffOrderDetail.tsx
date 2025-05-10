import { useState } from "react";
import Order from "../../../../models/Order";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";
import OrderServiceApi from "../../../../services/orderService";

export default function useStaffOrderDetail() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const [order, setOrder] = useState<Order | null>(null);
    const [customerOrder, setCustomerOrder] = useState<Order | null>(null);

    const getOrderDetail = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let order = await OrderServiceApi.getStaffOrderDetail({
                id: props.id,
            });

            setOrder(order);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const rejectOrder = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let resp = await OrderServiceApi.rejectOrder({
                id: props.id,
            });
            await reload(props.id);
            openAlertDialog?.("Thông báo", "Từ chối đơn thành công");
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const readyOrder = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let resp = await OrderServiceApi.readyOrder({
                id: props.id,
            });

            if (resp?.isReady) {
                openAlertDialog?.("Thông báo", "Ứng tuyển đơn thành công");
            }

            await reload(props.id);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const cancelApproveOrder = async (props: {
        id: number;
        reasonCancel?: string;
    }) => {
        try {
            openLoadingDialog?.();
            await OrderServiceApi.cancelApproveOrder({
                id: props.id,
                reasonCancel: props?.reasonCancel,
            });

            await reload(props.id);
            openAlertDialog?.("Thông báo", "Hủy đơn thành công");
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const finishOrder = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            await OrderServiceApi.finishOrder({
                id: props.id,
            });
            openAlertDialog?.("Thông báo", "Hoàn thành đơn thành công");

            await reload(props.id);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const getCustomerOrderDetail = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let order = await OrderServiceApi.getCustomerOrderDetail({
                id: props.id,
            });

            setCustomerOrder(order);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const reload = async (id: number) => {
        getOrderDetail({ id });
    };

    return {
        order,
        customerOrder,
        getOrderDetail,
        getCustomerOrderDetail,
        rejectOrder,
        readyOrder,
        cancelApproveOrder,
        finishOrder,
        reload,
    };
}
