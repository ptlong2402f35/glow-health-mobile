import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StoreOwnerApi from "../../../../services/storeService";
import Staff from "../../../../models/Staff";

export default function useHandleStaffMemberReady() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const [staffs, setStaffs] = useState<Staff[]>([]);
    // const [options, setOptions] = useState<Staff[]>([]);
    const [staffIds, setStaffIds] = useState<number[]>([]);

    const getStaffReady = async () => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.getStaffMemberReady();
            setStaffs(data);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const toggleSelection = (id?: number) => {
        if (!id) return;
        if (staffIds.includes(id || 0)) {
            setStaffIds((prev) => prev.filter((item) => item !== id));
        } else {
            setStaffIds((prev) => [...prev, id]);
        }
    };

    const reload = async () => {
        getStaffReady();
        setStaffIds([]);
    };

    return {
        staffs,
        getStaffReady,
        staffIds,
        setStaffIds,
        reload,
        toggleSelection,
    };
}
