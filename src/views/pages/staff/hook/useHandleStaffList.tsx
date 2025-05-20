import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";
import useUserLoader from "../../../../hook/useUserLoader";
import { useState } from "react";
import StaffServiceApi from "../../../../services/staffServiceApi";
import Staff from "../../../../models/Staff";

export default function useHandleStaffList() {
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [pinnedstaffs, setPinnedStaffs] = useState<Staff[]>([]);

    const getStaffList = async (data: { page?: number; perPage?: number }) => {
        try {
            let resp = await StaffServiceApi.getStaffList({
                page: data?.page,
                perPage: data?.perPage,
            });

            console.log("staff list ===", resp);
            setStaffs([...staffs, ...resp]);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaffs([]);
        } finally {
        }
    };

    const getPinnedStaffList = async (data: { id?: string }) => {
        try {
            if(!data.id) return;
            let resp = await StaffServiceApi.getPinnedStaffList({
                id: data.id
            });

            console.log("pinned staff list ===", resp);
            setPinnedStaffs([...resp]);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaffs([]);
        } finally {
        }
    };

    return {
        staffs,
        getStaffList,
        pinnedstaffs,
        getPinnedStaffList
    };
}
