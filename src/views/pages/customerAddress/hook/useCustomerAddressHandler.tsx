import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import AddressService from "../../../../services/addressService";
import useAlertDialog from "../../../../hook/useAlert";
import CustomerAddress from "../../../../models/CustomerAddress";

export default function useCustomerAddressHandler() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const [addresses, setAddresses] = useState<CustomerAddress[]>([]);

    const getCustomerAddresses = async () => {
        try {
            openLoadingDialog?.();
            console.log("get customer address init");
            let addresses = await AddressService.getMyAddress();
            setAddresses(addresses);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const createCustomerAddress = async (props: {
        customerName?: string;
        phone?: string;
        isSetDefault?: boolean;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        address?: string;
        lat?: number;
        long?: number;
        note?: string;
        afterCreate?: (props: {id?:number, address:string}) => void
    }) => {
        try {
            openLoadingDialog?.();
            let address = await AddressService.createAddress(
                {
                    ...props
                }
            );
            !props?.afterCreate ? 
            await reload() : props?.afterCreate?.({id: address?.resp?.id, address: address?.resp?.address});
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateCustomerAddress = async (props: {
        id?: number;
        customerName?: string;
        phone?: string;
        isSetDefault?: boolean;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        address?: string;
        lat?: number;
        long?: number;
        note?: string;
    }) => {
        try {
            openLoadingDialog?.();
            await AddressService.updateAddress(props);
            await reload();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const removeCustomerAddress = async (props: {
        id?: number;
    }) => {
        try {
            openLoadingDialog?.();
            await AddressService.removeAddress({id: props.id});
            await reload();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const reload = async () => {
        await getCustomerAddresses();
    };

    return {
        addresses,
        getCustomerAddresses,
        createCustomerAddress,
        updateCustomerAddress,
        removeCustomerAddress,
        reload,
    };
}
