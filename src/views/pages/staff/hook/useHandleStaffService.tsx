import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StaffServiceApi from "../../../../services/staffServiceApi";
import StaffService from "../../../../models/StaffService";
import StaffServicePrice from "../../../../models/StaffServicePrice";
import SelectServiceApi from "../../../../services/selectServiceApi";
import ServiceGroup from "../../../../models/ServiceGroup";

export default function useHandleStaffService(props: {}) {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const [staffService, setStaffService] = useState<ServiceGroup[]>([]);
    const [prices, setPrices] = useState<any[]>([]);

    const getStaffService = async () => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.getStaffServiceBatch({});
            setStaffService(data);

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
            console.log("error message:", message);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const createStaffService = async (props: {
        name?: string;
        description?: string;
        serviceGroupId?: number;
        serviceId?: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.createStaffService(props);
            await reload();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateStaffServiceBatch = async (props: { data: any }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.updateStaffServiceBatch(props);
            await reload();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const removeStaffService = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.removeStaffService(props);
            await reload();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
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

    const getServiceSelect = async (props: { search?: string }) => {
        try {
            let data = await SelectServiceApi.getService({
                search: props?.search,
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const reload = async () => {
        await getStaffService();
    };

    return {
        staffService,
        getStaffService,
        prices,
        updatePrices,
        reload,
        createStaffService,
        updateStaffServiceBatch,
        removeStaffService,
        getServiceSelect,
    };
}
