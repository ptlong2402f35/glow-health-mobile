import { useState } from "react";
import useAlertDialog from "../../../../hook/useAlert";
import useLoadingDialog from "../../../../hook/useLoading";
import AddressService from "../../../../services/addressService";
import OrderServiceApi from "../../../../services/orderService";
import CustomerAddress from "../../../../models/CustomerAddress";
import Order from "../../../../models/Order";

export default function useCreateOrder() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    let [address, setAddress] = useState("");
    let [addressId, setAddressId] = useState(0);
    const createOrder = async (props: {
        staffId: number;
        addressId: number;
        voucherCode?: string;
        staffServicePriceIds?: number[];
        paymentMethodId: number;
        note?: string;
        timerTime?: Date;
        fromForwardOrderId?: number;
        afterCreate?: (order?: Order) => void;
    }) => {
        try {
            openLoadingDialog?.();
            let order = await OrderServiceApi.createOrder(props);
            props?.afterCreate?.(order);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const getDefaultAddress = async () => {
        try {
            openLoadingDialog?.();
            let resp = await AddressService.getMyDefaultAddress();
           setAddress(resp.address || "");
           setAddressId(resp.id || 0);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    return {
        address,
        addressId,
        setAddress,
        setAddressId,
        createOrder,
        getDefaultAddress,
    };
}
