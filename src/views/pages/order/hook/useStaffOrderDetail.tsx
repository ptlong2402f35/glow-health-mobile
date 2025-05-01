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
                id: props.id
            });
    
            setOrder(order);
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        }
        finally {
            closeLoadingDialog?.();
        }
    };

    const getCustomerOrderDetail = async (props: {id: number}) => {
        try {
            openLoadingDialog?.();
            let order = await OrderServiceApi.getCustomerOrderDetail({
                id: props.id
            });
    
            setCustomerOrder(order);
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    return {
        order,
        customerOrder,
        getOrderDetail,
        getCustomerOrderDetail,
    }
}
