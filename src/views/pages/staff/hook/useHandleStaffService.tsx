import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StaffServiceApi from "../../../../services/staffServiceApi";
import StaffService from "../../../../models/StaffService";
import StaffServicePrice from "../../../../models/StaffServicePrice";
import SelectServiceApi from "../../../../services/selectServiceApi";


export default function useHandleStaffService(props: {}) {
    const {openLoadingDialog, closeLoadingDialog} = useLoadingDialog();
    const [staffService, setStaffService] = useState<StaffService[]>([]);
    const [prices, setPrices] = useState<StaffServicePrice[]>([]);

    const getStaffService = async () => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.getStaffServiceBatch({});
            setStaffService(data);
            setPrices(data.map((item: any) => item.prices)?.filter((val:any) => val));
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const createStaffService = async (props: {
        name?: string;
        description?: string;
        serviceGroupId?: number;
        serviceId?: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.createStaffService(props);
            setStaffService(data);
            setPrices(data.map((item: any) => item.prices)?.filter((val:any) => val));
            await reload();
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const updateStaffServiceBatch = async (props: {
        data: any
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.updateStaffServiceBatch(props);
            await reload();
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const removeStaffService = async (props: {
        id: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StaffServiceApi.removeStaffService(props);
            await reload();
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", message);
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    const updatePrices = (staffServiceId: number, price: number) => {
        let fPrices = prices.find(item => item.staffServiceId === staffServiceId);
        if(!fPrices) return;
        fPrices.price = price;
    }

    const getServiceSelect = async (props: {search?: string}) => {
        try {
            let data = await SelectServiceApi.getService({search: props?.search});
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }

    const reload = async () => {
        await getStaffService();
    }

    return {
        staffService,
        getStaffService,
        prices,
        updatePrices,
        reload,
        createStaffService,
        updateStaffServiceBatch,
        removeStaffService,
        getServiceSelect
    }
}