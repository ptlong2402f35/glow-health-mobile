import { useState } from "react";
import useAlertDialog from "../../../../hook/useAlert";
import useLoadingDialog from "../../../../hook/useLoading";
import AddressService from "../../../../services/addressService";
import OrderServiceApi from "../../../../services/orderService";
import CustomerAddress from "../../../../models/CustomerAddress";
import Order from "../../../../models/Order";

export default function useReviewOrder() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    
    const reviewMyOrder = async (props: {
        orderId: number;
        rate: number;
        note?: string;
        afterFinish?: () => void;
    }) => {
        try {
            openLoadingDialog?.();
            let order = await OrderServiceApi.reviewMyOrder(props);
            props?.afterFinish?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    return {
        reviewMyOrder
    };
}
