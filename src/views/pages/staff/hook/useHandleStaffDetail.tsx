import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";
import useUserLoader from "../../../../hook/useUserLoader";
import { useState } from "react";
import StaffServiceApi from "../../../../services/staffServiceApi";
import Staff from "../../../../models/Staff";

export default function useHandleStaffDetail() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [priceIds, setPriceIds] = useState<number[]>([]);
    const [totalMoney, setTotalMoney] = useState<number>(0);

    const getStaffDetail = async (data: { id: number }) => {
        try {
            let resp = await StaffServiceApi.getStaffDetail({
                id: data.id
            });

            console.log("staff list ===", resp);
            setStaff(resp);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaff(null);
        } finally {
        }
    };

    return {
        staff,
        getStaffDetail,
        priceIds,
        setPriceIds,
        totalMoney,
        setTotalMoney
    };
}
