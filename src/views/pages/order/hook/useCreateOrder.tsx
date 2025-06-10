import { useState } from "react";
import useAlertDialog from "../../../../hook/useAlert";
import useLoadingDialog from "../../../../hook/useLoading";
import AddressService from "../../../../services/addressService";
import OrderServiceApi from "../../../../services/orderService";
import CustomerAddress from "../../../../models/CustomerAddress";
import Order from "../../../../models/Order";
import useUserLoader from "../../../../hook/useUserLoader";

export default function useCreateOrder() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const {reloadMe} = useUserLoader();
    let [address, setAddress] = useState("");
    let [addressId, setAddressId] = useState(0);
    let [estimateFee, setEstimateFee] = useState(0);
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
            if(props.paymentMethodId === 2) reloadMe?.();
            props?.afterCreate?.(order);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const estimateOrderFee = async (props: {
        staffServicePriceIds?: number[];
        voucherCode?: string;
    }) => {
        try {
            let data = await OrderServiceApi.getOrderEstimate(props);
            console.log("estimate", data);
            setEstimateFee(data?.totalPay);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
        } finally {
        }
    }

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
        estimateOrderFee,
        estimateFee,
    };
}
