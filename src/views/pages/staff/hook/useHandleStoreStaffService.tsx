import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StoreOwnerApi from "../../../../services/storeService";
import Staff from "../../../../models/Staff";

export default function useHandleStoreStaffService(props: {
    staffId?: number;
}) {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const [staffServices, setStaffServices] = useState<any[]>([]);
    const [prices, setPrices] = useState<any[]>([]);

    const getStaffMemberStaffService = async (id?: number) => {
        try {
            openLoadingDialog?.();
            if(!id) return;
            let data = await StoreOwnerApi.getStaffServiceMember({ id: id });
            setStaffServices(data);

            let tmpPrices = [];
            let idx = 1;
            for (let item of data) {
                for (let service of item.services || []) {
                    if (!service?.price) continue;
                    console.log(" xxxx push", service?.price);
                    for(let price of service?.price || []) {
                        tmpPrices.push(
                            {
                                id: idx,
                                staffServiceId: price.staffServiceId,
                                price: price.price,
                                unit: price.unit,
                                serviceGroupId: price.serviceGroupId
                            }
                        );
                        idx++;
                    }
                }
            }
            console.log("setup ===", tmpPrices)
            setPrices(tmpPrices);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateStaffMemberStaffService = async (props: {
        data?: any;
        id?: number;
        onSuccess?: () => void;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.updateStaffServiceMember(props);
            await reloadStaffService();
            props.onSuccess?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const createStaffMemberStaffService = async (props: {
        staffId?: number;
        name?: string;
        code?: string;
        description?: string;
        serviceGroupId?: number;
        serviceId?: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.createStaffServiceMember(props);
            await reloadStaffService();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const deleteStaffMemberStaffService = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.deleteStaffServiceMember(props);
            await reloadStaffService();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };
    

    const updatePrices = (priceId: number, price: number) => {
        let tmp = [...prices];
        console.log("xxxx TMP", tmp);
        console.log("xxxx TMP index", priceId);
        let fPrices = tmp.find((item) => item.id === priceId);
        if (!fPrices) return;
        fPrices.price = price;
        console.log("xxxx TMP", tmp);
        setPrices(tmp);
    };

    const reloadStaffService = async () => {
        getStaffMemberStaffService(props?.staffId);
    };

    return {
        staffServices,
        prices,
        setPrices,
        getStaffMemberStaffService,
        createStaffMemberStaffService,
        updateStaffMemberStaffService,
        deleteStaffMemberStaffService,
        updatePrices,
    };
}
