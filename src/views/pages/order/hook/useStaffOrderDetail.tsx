import { useState } from "react";
import Order from "../../../../models/Order";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";
import OrderServiceApi from "../../../../services/orderService";
import useUserLoader from "../../../../hook/useUserLoader";
import StoreOrderServiceApi from "../../../../services/storeOrderService";

export default function useStaffOrderDetail() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const [order, setOrder] = useState<Order | null>(null);
    const [customerOrder, setCustomerOrder] = useState<Order | null>(null);
    const { userLoader } = useUserLoader();

    const getOrderDetail = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            if (userLoader?.staffRole === 2) {
                let order = await StoreOrderServiceApi.getStoreOrderDetail({
                    id: props.id,
                });
                setOrder(order);

                return;
            }
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
            if (userLoader?.staffRole === 2) {
                let resp = await StoreOrderServiceApi.rejectOrder({
                    id: props.id,
                });
                await reload(props.id);
                openAlertDialog?.("Thông báo", "Từ chối đơn thành công");
                return;
            }
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

    const readyOrder = async (props: {
        id: number;
        staffIds?: number[];
        onSuccess?: () => void;
    }) => {
        try {
            openLoadingDialog?.();
            if (userLoader?.staffRole === 2) {
                let resp = await StoreOrderServiceApi.readyOrder({
                    id: props.id,
                    staffIds: props.staffIds,
                });

                if (resp?.isReady) {
                    openAlertDialog?.("Thông báo", "Ứng tuyển đơn thành công");
                }

                await reload(props.id);
                return;
            }
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
            if (userLoader?.staffRole === 2) {
                await StoreOrderServiceApi.cancelApproveOrder({
                    id: props.id,
                    reasonCancel: props?.reasonCancel,
                });

                await reload(props.id);
                openAlertDialog?.("Thông báo", "Hủy đơn thành công");
                return;
            }
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
            if (userLoader?.staffRole === 2) {
                await StoreOrderServiceApi.finishOrder({
                    id: props.id,
                });
                openAlertDialog?.("Thông báo", "Hoàn thành đơn thành công");

                await reload(props.id);
                return;
            }
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
